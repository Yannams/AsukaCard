import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getOrderById, updateOrder, deleteOrder } from "@/lib/db";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
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
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const updated = await updateOrder(id, body);
    return NextResponse.json({ order: updated, success: true });
  } catch (err) {
    return NextResponse.json({ error: "Erreur modification" }, { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    await deleteOrder(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
