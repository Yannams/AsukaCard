import { NextRequest, NextResponse } from "next/server";
import { isSlugAvailable } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawSlug = searchParams.get("slug");
  const cardId = searchParams.get("cardId") || undefined;

  if (!rawSlug) {
    return NextResponse.json({ available: false, error: "Le nom d'utilisateur est requis." }, { status: 400 });
  }

  const slug = rawSlug.trim().toLowerCase();

  // Validate format (alphanumeric and hyphens only, 3-30 chars)
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (slug.length < 3 || slug.length > 35 || !slugRegex.test(slug)) {
    return NextResponse.json({
      available: false,
      error: "Format invalide. Utilisez uniquement des lettres minuscules, des chiffres et des tirets (3 à 35 caractères).",
    });
  }

  const available = await isSlugAvailable(slug, cardId);

  return NextResponse.json({
    available,
    slug,
    message: available ? "Ce nom d'utilisateur est disponible !" : "Ce nom d'utilisateur est déjà réservé ou utilisé.",
  });
}
