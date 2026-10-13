import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getOrderById, updateOrder } from "@/lib/db";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  // Only owner or admin can view
  if (order.userId !== user.userId && user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  return NextResponse.json({ order });
}

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  if (order.userId !== user.userId && user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  try {
    const body = await req.json();

    // If user is paying for an unpaid order
    if (body.action === "pay") {
      const paymentMethod = body.paymentMethod || order.paymentMethod || "FEDAPAY";

      // If user requested instant/offline payment simulation
      if (body.instantPay) {
        const paymentRef = `TX-${Date.now().toString(36).toUpperCase()}`;
        const updated = await updateOrder(id, {
          paymentStatus: "PAID",
          paymentMethod,
          paymentRef,
          paidAt: new Date(),
          status: order.status === "PENDING" ? "CONFIRMED" : order.status,
        });

        return NextResponse.json({ order: updated, success: true });
      }

      // Generate FedaPay payment session
      const origin = req.headers.get("origin") || req.headers.get("referer") || "http://localhost:3000";
      const baseUrl = origin.split("?")[0].replace(/\/$/, "");
      const callbackUrl = `${baseUrl}/api/fedapay/callback?orderId=${order.id}`;

      const nameParts = (order.customerName || "Client Asuka").trim().split(" ");
      const firstname = nameParts[0] || "Client";
      const lastname = nameParts.slice(1).join(" ") || "Asuka";

      const { createFedaPayTransaction } = await import("@/lib/fedapay");
      const fedapayRes = await createFedaPayTransaction({
        amount: order.totalAmount,
        description: `Règlement Asuka Card ${order.orderNumber} - ${order.cardType} (${order.cardColor || "Standard"})`,
        callbackUrl,
        customer: {
          firstname,
          lastname,
          email: order.customerEmail,
          phone: order.customerPhone,
          country: order.country?.toLowerCase() === "bénin" ? "bj" : "bj",
        },
        customMetadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
        },
      });

      if (fedapayRes.success && fedapayRes.checkoutUrl) {
        await updateOrder(id, {
          fedapayId: fedapayRes.transactionId ? String(fedapayRes.transactionId) : undefined,
          fedapayUrl: fedapayRes.checkoutUrl,
          fedapayStatus: "pending",
        });

        return NextResponse.json({
          order,
          checkoutUrl: fedapayRes.checkoutUrl,
          isSimulatedPayment: fedapayRes.isSimulated,
          success: true,
        });
      }

      return NextResponse.json({
        error: fedapayRes.error || "Impossible d'initialiser FedaPay",
      }, { status: 500 });
    }

    return NextResponse.json({ error: "Action non reconnue" }, { status: 400 });
  } catch (err) {
    console.error("Erreur mise à jour commande:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
