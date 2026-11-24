import { NextResponse } from "next/server";
import { isAuthorizedAdminOrService } from "@/lib/auth";
import { getOrderById, updateOrder, deleteOrder } from "@/lib/db";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
  }

  return NextResponse.json({ order });
}

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const updateData: any = {};
    if (body.status !== undefined) updateData.status = body.status;
    if (body.paymentStatus !== undefined) {
      updateData.paymentStatus = body.paymentStatus;
      if (body.paymentStatus === "PAID") {
        updateData.paidAt = new Date();
      }
    }
    if (body.trackingNumber !== undefined) updateData.trackingNumber = body.trackingNumber;
    if (body.carrier !== undefined) updateData.carrier = body.carrier;
    if (body.steps !== undefined) updateData.steps = body.steps;
    if (body.notes !== undefined) updateData.notes = body.notes;
    if (body.customerName !== undefined) updateData.customerName = body.customerName;
    if (body.customerPhone !== undefined) updateData.customerPhone = body.customerPhone;
    if (body.customerEmail !== undefined) updateData.customerEmail = body.customerEmail;
    if (body.city !== undefined) updateData.city = body.city;
    if (body.shippingAddress !== undefined) updateData.shippingAddress = body.shippingAddress;
    else if (body.address !== undefined) updateData.shippingAddress = body.address;

    const updated = await updateOrder(id, updateData);
    return NextResponse.json({ order: updated, success: true });
  } catch (err: any) {
    console.error("Erreur modification order:", err);
    return NextResponse.json({ error: err?.message || "Erreur modification" }, { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    await deleteOrder(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
