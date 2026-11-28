import { NextResponse } from "next/server";
import { getOrderById, updateOrderPayment } from "@/lib/db";
import { getFedaPayTransaction } from "@/lib/fedapay";
import { notifyBackofficeRealtime } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const event = await req.json();

    const eventName = event.name || event.event;
    const entity = event.entity || event.data || event;

    if (!entity || !entity.id) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const transactionId = String(entity.id);
    const orderId = entity.custom_metadata?.orderId;

    // Verify transaction status directly against FedaPay API to prevent forged webhooks
    const verifiedTx = await getFedaPayTransaction(transactionId);
    const verifiedStatus = verifiedTx?.status || entity.status;

    let targetOrder = null;
    if (orderId) {
      targetOrder = await getOrderById(orderId);
    }

    if (!targetOrder) {
      targetOrder = await prisma.order.findFirst({
        where: { fedapayId: transactionId },
      });
    }

    if (!targetOrder) {
      console.warn(`[FEDAPAY WEBHOOK] Commande introuvable pour transaction ${transactionId}`);
      return NextResponse.json({ received: true, warning: "Order not found" });
    }

    if ((eventName === "transaction.approved" || entity.status === "approved") && verifiedStatus === "approved") {
      await updateOrderPayment(targetOrder.id, {
        paymentStatus: "PAID",
        paymentRef: `FEDAPAY-${transactionId}`,
        paidAt: new Date(),
        status: targetOrder.status === "PENDING" ? "CONFIRMED" : targetOrder.status,
        fedapayId: transactionId,
        fedapayStatus: "approved",
      });

      if (targetOrder.cardId) {
        await prisma.order.updateMany({
          where: {
            cardId: targetOrder.cardId,
            id: { not: targetOrder.id },
            paymentStatus: { not: "PAID" },
            status: "PENDING",
          },
          data: { status: "CANCELLED", fedapayStatus: "superseded" },
        });
      }
      notifyBackofficeRealtime({
        type: "CARD_ORDER_PAID",
        title: `Paiement reçu — ${targetOrder.orderNumber}`,
        message: `${targetOrder.customerName} a payé ${Number(targetOrder.totalAmount).toLocaleString("fr-FR")} FCFA`,
        orderId: `AC-${targetOrder.id}`,
        orderNumber: targetOrder.orderNumber,
        amount: targetOrder.totalAmount,
        customerName: targetOrder.customerName,
      });
      console.log(`[FEDAPAY WEBHOOK] Commande ${targetOrder.orderNumber} confirmée avec succès`);
    } else if (eventName === "transaction.canceled" || verifiedStatus === "canceled") {
      await updateOrderPayment(targetOrder.id, {
        paymentStatus: "UNPAID",
        fedapayStatus: "canceled",
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[FEDAPAY WEBHOOK ERROR]:", err);
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 });
  }
}
