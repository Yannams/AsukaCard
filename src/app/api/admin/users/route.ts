import { NextResponse } from "next/server";
import { isAuthorizedAdminOrService } from "@/lib/auth";
import { getAllUsers } from "@/lib/db";

export async function GET(req: Request) {
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const users = await getAllUsers();
    return NextResponse.json({ users });
  } catch (err: any) {
    console.error("Erreur admin GET users:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
