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

    // Cancel an unpaid order explicitly
    if (body.action === "cancel") {
      if (order.paymentStatus === "PAID") {
        return NextResponse.json(
          { error: "Impossible d'annuler une commande déjà payée." },
          { status: 400 }
        );
      }
      const updated = await updateOrder(id, {
        status: "CANCELLED",
        fedapayStatus: "canceled",
      });
      return NextResponse.json({ order: updated, success: true });
    }

    // If user is paying for an unpaid order
    if (body.action === "pay") {
      if (order.paymentStatus === "PAID") {
        return NextResponse.json(
          { error: "Cette commande est déjà payée." },
          { status: 400 }
        );
      }
      if (order.status === "CANCELLED") {
        return NextResponse.json(
          { error: "Cette commande a été annulée." },
          { status: 400 }
        );
      }

      const paymentMethod = body.paymentMethod || order.paymentMethod || "FEDAPAY";
      const contactUpdates: Record<string, any> = { paymentMethod };
      if (typeof body.customerName === "string" && body.customerName.trim()) {
        contactUpdates.customerName = body.customerName.trim();
      }
      if (typeof body.customerEmail === "string" && body.customerEmail.trim()) {
        contactUpdates.customerEmail = body.customerEmail.trim();
      }
      if (typeof body.customerPhone === "string" && body.customerPhone.trim()) {
        contactUpdates.customerPhone = body.customerPhone.trim();
      }
      if (typeof body.customName === "string" && body.customName.trim()) {
        contactUpdates.customName = body.customName.trim();
      }
      if (body.notes !== undefined) {
        contactUpdates.notes = body.notes || null;
      }

      // If user requested instant/offline payment simulation
      if (body.instantPay) {
        const paymentRef = `TX-${Date.now().toString(36).toUpperCase()}`;
        const updated = await updateOrder(id, {
          ...contactUpdates,
          paymentStatus: "PAID",
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

      const effectiveName = contactUpdates.customerName || order.customerName || "Client Asuka";
      const effectiveEmail = contactUpdates.customerEmail || order.customerEmail;
      const effectivePhone = contactUpdates.customerPhone || order.customerPhone;

      const nameParts = effectiveName.trim().split(" ");
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
          email: effectiveEmail,
          phone: effectivePhone,
          country: order.country?.toLowerCase() === "bénin" ? "bj" : "bj",
        },
        customMetadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
        },
      });

      if (fedapayRes.success && fedapayRes.checkoutUrl) {
        const updatedOrder = await updateOrder(id, {
          ...contactUpdates,
          fedapayId: fedapayRes.transactionId ? String(fedapayRes.transactionId) : undefined,
          fedapayUrl: fedapayRes.checkoutUrl,
          fedapayStatus: "pending",
        });

        return NextResponse.json({
          order: updatedOrder,
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
