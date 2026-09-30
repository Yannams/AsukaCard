import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getCardsByUserId, createCard, isSlugAvailable } from "@/lib/db";

export async function GET() {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé. Veuillez vous connecter." }, { status: 401 });
  }

  const cards = getCardsByUserId(session.userId);
  return NextResponse.json({ cards });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: "Veuillez vous connecter pour créer une carte." }, { status: 401 });
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

    // Validation
    if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
      return NextResponse.json({ error: "Le prénom est obligatoire." }, { status: 400 });
    }

    if (!lastName || typeof lastName !== "string" || lastName.trim().length === 0) {
      return NextResponse.json({ error: "Le nom est obligatoire." }, { status: 400 });
    }

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Le nom d'utilisateur (slug) est obligatoire." }, { status: 400 });
    }

    const cleanSlug = slug.trim().toLowerCase();
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (cleanSlug.length < 3 || cleanSlug.length > 35 || !slugRegex.test(cleanSlug)) {
      return NextResponse.json({ error: "Format du nom d'utilisateur invalide." }, { status: 400 });
    }

    if (!isSlugAvailable(cleanSlug)) {
      return NextResponse.json({ error: "Ce nom d'utilisateur est déjà utilisé. Veuillez en choisir un autre." }, { status: 409 });
    }

    const newCard = createCard({
      userId: session.userId,
      slug: cleanSlug,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      title: (title || "").trim(),
      company: (company || "").trim(),
      logoUrl: logoUrl || "",
      avatarUrl: avatarUrl || "",
      phone: (phone || "").trim(),
      whatsapp: (whatsapp || "").trim(),
      email: (email || "").trim(),
      website: (website || "").trim(),
      address: (address || "").trim(),
      bio: (bio || "").trim(),
      socials: socials || {},
      dominantColor: dominantColor === "black" || dominantColor === "white" ? dominantColor : "orange",
      template: ["modern", "minimalist", "executive", "creative", "premium", "professional"].includes(template) ? template : "modern",
      fieldVisibility: fieldVisibility || {
        phone: true,
        whatsapp: true,
        email: true,
        website: true,
        address: true,
        bio: true,
        socials: true,
      },
    });

    return NextResponse.json({ success: true, card: newCard }, { status: 201 });
  } catch (err) {
    console.error("Erreur création carte:", err);
    return NextResponse.json({ error: "Une erreur est survenue lors de la création de la carte." }, { status: 500 });
  }
}
