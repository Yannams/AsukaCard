import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminOrService } from "@/lib/auth";
import { getCardById, updateCard, adminDeleteCard, isSlugAvailable } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  const { id } = await params;
  const card = await getCardById(id);
  if (!card) {
    return NextResponse.json({ error: "Carte non trouvée" }, { status: 404 });
  }
  return NextResponse.json({ card });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const existingCard = await getCardById(id);
    if (!existingCard) {
      return NextResponse.json({ error: "Carte introuvable" }, { status: 404 });
    }

    const updateData: any = {};

    if (body.slug !== undefined) {
      const cleanSlug = body.slug.trim().toLowerCase();
      if (cleanSlug !== existingCard.slug) {
        if (!(await isSlugAvailable(cleanSlug, id))) {
          return NextResponse.json({ error: "Cet identifiant / slug est déjà pris." }, { status: 409 });
        }
        updateData.slug = cleanSlug;
      }
    }

    if (body.firstName !== undefined) updateData.firstName = body.firstName.trim();
    if (body.lastName !== undefined) updateData.lastName = body.lastName.trim();
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.company !== undefined) updateData.company = body.company.trim();
    if (body.logoUrl !== undefined) updateData.logoUrl = body.logoUrl.trim();
    if (body.avatarUrl !== undefined) updateData.avatarUrl = body.avatarUrl.trim();
    if (body.phone !== undefined) updateData.phone = body.phone.trim();
    if (body.whatsapp !== undefined) updateData.whatsapp = body.whatsapp.trim();
    if (body.email !== undefined) updateData.email = body.email.trim();
    if (body.website !== undefined) updateData.website = body.website.trim();
    if (body.address !== undefined) updateData.address = body.address.trim();
    if (body.bio !== undefined) updateData.bio = body.bio.trim();
    if (body.socials !== undefined) updateData.socials = body.socials;
    if (body.dominantColor !== undefined) updateData.dominantColor = body.dominantColor;
    if (body.template !== undefined) updateData.template = body.template;
    if (body.fieldVisibility !== undefined) updateData.fieldVisibility = body.fieldVisibility;
    if (body.userId !== undefined) updateData.userId = body.userId;

    const updated = await updateCard(id, updateData);
    return NextResponse.json({ success: true, card: updated });
  } catch (err: any) {
    console.error("Erreur admin update card:", err);
    return NextResponse.json({ error: "Impossible de modifier la carte" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const { id } = await params;
    await adminDeleteCard(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Erreur admin delete card:", err);
    return NextResponse.json({ error: "Impossible de supprimer la carte" }, { status: 500 });
  }
}
