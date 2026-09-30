import { NextRequest, NextResponse } from "next/server";
import { getCardBySlug, recordCardAnalytics } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, type, meta } = body;

    if (!slug || !type) {
      return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
    }

    const card = getCardBySlug(slug);
    if (!card) {
      return NextResponse.json({ error: "Carte non trouvée" }, { status: 404 });
    }

    recordCardAnalytics(card.id, type, meta);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
