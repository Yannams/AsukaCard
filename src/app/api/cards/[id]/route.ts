import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getCardById, updateCard, deleteCard, isSlugAvailable } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const card = await getCardById(id);
  if (!card) {
    return NextResponse.json({ error: "Carte non trouvée" }, { status: 404 });
  }

  if (card.userId !== session.userId) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  return NextResponse.json({ card });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const card = await getCardById(id);
    if (!card) {
      return NextResponse.json({ error: "Carte introuvable" }, { status: 404 });
    }

    if (card.userId !== session.userId) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const body = await req.json();
    const {
      slug,
      firstName,
      lastName,
      title,
      company,
      logoUrl,
      avatarUrl,
      phone,
      whatsapp,
      email,
      website,
      address,
      bio,
      socials,
      dominantColor,
      template,
      fieldVisibility,
    } = body;

    // Validate slug if changed
    if (slug) {
      const cleanSlug = slug.trim().toLowerCase();
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (cleanSlug.length < 3 || cleanSlug.length > 35 || !slugRegex.test(cleanSlug)) {
        return NextResponse.json({ error: "Format du nom d'utilisateur invalide." }, { status: 400 });
      }

      if (!await isSlugAvailable(cleanSlug, card.id)) {
        return NextResponse.json({ error: "Ce nom d'utilisateur est déjà utilisé par une autre carte." }, { status: 409 });
      }
    }

    const updated = await updateCard(id, {
      ...(slug && { slug: slug.trim().toLowerCase() }),
      ...(firstName !== undefined && { firstName: firstName.trim() }),
      ...(lastName !== undefined && { lastName: lastName.trim() }),
      ...(title !== undefined && { title: title.trim() }),
      ...(company !== undefined && { company: company.trim() }),
      ...(logoUrl !== undefined && { logoUrl }),
      ...(avatarUrl !== undefined && { avatarUrl }),
      ...(phone !== undefined && { phone: phone.trim() }),
      ...(whatsapp !== undefined && { whatsapp: whatsapp.trim() }),
      ...(email !== undefined && { email: email.trim() }),
      ...(website !== undefined && { website: website.trim() }),
      ...(address !== undefined && { address: address.trim() }),
      ...(bio !== undefined && { bio: bio.trim() }),
      ...(socials !== undefined && { socials }),
      ...(dominantColor !== undefined && { dominantColor }),
      ...(template !== undefined && { template }),
      ...(fieldVisibility !== undefined && { fieldVisibility }),
    });

    return NextResponse.json({ success: true, card: updated });
  } catch (err) {
    console.error("Erreur modification carte:", err);
    return NextResponse.json({ error: "Impossible de mettre à jour la carte." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const card = await getCardById(id);
    if (!card) {
      return NextResponse.json({ error: "Carte introuvable" }, { status: 404 });
    }

    if (card.userId !== session.userId) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const deleted = await deleteCard(id, session.userId);
    if (!deleted) {
      return NextResponse.json({ error: "Erreur lors de la suppression." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Carte supprimée avec succès." });
  } catch (err) {
    console.error("Erreur suppression:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
