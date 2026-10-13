import { NextResponse } from "next/server";
import { getOrderById, updateOrderPayment } from "@/lib/db";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const event = await req.json();

    // Event format from FedaPay webhook:
    // { name: "transaction.approved" | "transaction.canceled", entity: { id: 1234, status: "approved", custom_metadata: { orderId: "..." } } }
    const eventName = event.name || event.event;
    const entity = event.entity || event.data || event;

    if (!entity || !entity.id) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const transactionId = String(entity.id);
    const status = entity.status;
    const orderId = entity.custom_metadata?.orderId;

    let targetOrder = null;
    if (orderId) {
      targetOrder = await getOrderById(orderId);
    }

    // Fallback: search by fedapayId
    if (!targetOrder) {
      targetOrder = await prisma.order.findFirst({
        where: { fedapayId: transactionId },
      });
    }

    if (!targetOrder) {
      console.warn(`[FEDAPAY WEBHOOK] Commande introuvable pour transaction ${transactionId}`);
      return NextResponse.json({ received: true, warning: "Order not found" });
    }

    if (eventName === "transaction.approved" || status === "approved") {
      await updateOrderPayment(targetOrder.id, {
        paymentStatus: "PAID",
        paymentRef: `FEDAPAY-${transactionId}`,
        paidAt: new Date(),
        status: targetOrder.status === "PENDING" ? "CONFIRMED" : targetOrder.status,
        fedapayId: transactionId,
        fedapayStatus: "approved",
      });
      console.log(`[FEDAPAY WEBHOOK] Commande ${targetOrder.orderNumber} confirmée avec succès`);
    } else if (eventName === "transaction.canceled" || status === "canceled") {
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
