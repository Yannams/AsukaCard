import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getAllOrders, updateOrder } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const orders = await getAllOrders();
    return NextResponse.json({ orders });
  } catch (err: any) {
    console.error("Erreur admin orders:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { orderId, status, paymentStatus, trackingNumber, carrier, notes } = body;

    if (!orderId) {
      return NextResponse.json({ error: "orderId requis" }, { status: 400 });
    }

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (paymentStatus !== undefined) {
      updateData.paymentStatus = paymentStatus;
      if (paymentStatus === "PAID") {
        updateData.paidAt = new Date();
      }
    }
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
    if (carrier !== undefined) updateData.carrier = carrier;
    if (notes !== undefined) updateData.notes = notes;

    const updated = await updateOrder(orderId, updateData);
    return NextResponse.json({ order: updated, success: true });
  } catch (err: any) {
    console.error("Erreur update admin order:", err);
    return NextResponse.json({ error: "Impossible de modifier la commande" }, { status: 500 });
  }
}
