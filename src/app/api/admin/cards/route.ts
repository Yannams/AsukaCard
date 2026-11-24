import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminOrService } from "@/lib/auth";
import { getAllCards, createCard, isSlugAvailable, generateSecureSlug } from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const cards = await getAllCards();
    return NextResponse.json({ cards });
  } catch (err: any) {
    console.error("Erreur admin GET cards:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      userId,
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

    if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
      return NextResponse.json({ error: "Le prénom est obligatoire." }, { status: 400 });
    }

    if (!lastName || typeof lastName !== "string" || lastName.trim().length === 0) {
      return NextResponse.json({ error: "Le nom est obligatoire." }, { status: 400 });
    }

    let cleanSlug = typeof slug === "string" ? slug.trim().toLowerCase() : "";
    if (!cleanSlug) {
      let attempts = 0;
      do {
        cleanSlug = generateSecureSlug();
        attempts++;
      } while (!(await isSlugAvailable(cleanSlug)) && attempts < 5);
    } else {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (cleanSlug.length < 3 || cleanSlug.length > 50 || !slugRegex.test(cleanSlug)) {
        return NextResponse.json(
          { error: "Format du token / slug invalide (lettres minuscules, chiffres et tirets uniquement)." },
          { status: 400 }
        );
      }

      if (!(await isSlugAvailable(cleanSlug))) {
        return NextResponse.json({ error: "Cet identifiant / slug est déjà utilisé." }, { status: 409 });
      }
    }

    // Default template for admin creation: executive, apple_invitation, modern, minimalist, creative, premium
    const validTemplates = ["executive", "apple_invitation", "modern", "minimalist", "creative", "premium", "professional"];
    const chosenTemplate = validTemplates.includes(template) ? template : "executive";

    const targetUserId = userId || user.userId;

    const newCard = await createCard({
      userId: targetUserId,
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
      dominantColor: ["black", "orange", "white"].includes(dominantColor) ? dominantColor : "black",
      template: chosenTemplate,
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
  } catch (err: any) {
    console.error("Erreur admin création carte:", err);
    return NextResponse.json({ error: "Impossible de créer la carte." }, { status: 500 });
  }
}
