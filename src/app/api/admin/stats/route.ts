import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getOrderStats } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const stats = await getOrderStats();
    return NextResponse.json({ stats });
  } catch (err) {
    console.error("Erreur admin stats:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
