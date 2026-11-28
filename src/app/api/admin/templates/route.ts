import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminOrService } from "@/lib/auth";
import { getAllCardTemplates, createCardTemplate, getCardTemplateByKey } from "@/lib/db";

const VALID_PRICING_MODES = ["PAID", "FREE", "FLEXIBLE"];

export async function GET(req: NextRequest) {
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const templates = await getAllCardTemplates();
    return NextResponse.json({ templates });
  } catch (err: any) {
    console.error("Erreur GET admin templates:", err);
    return NextResponse.json({ error: "Impossible de charger les templates" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const rawKey = typeof body.key === "string" ? body.key.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!/^[a-z0-9_-]{2,40}$/.test(rawKey)) {
      return NextResponse.json(
        { error: "Identifiant technique invalide (2-40 caractères: a-z, 0-9, - ou _)." },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json({ error: "Le nom du template est obligatoire." }, { status: 400 });
    }

    const existing = await getCardTemplateByKey(rawKey);
    if (existing) {
      return NextResponse.json({ error: "Un template avec cet identifiant existe déjà." }, { status: 409 });
    }

    const pricingMode = VALID_PRICING_MODES.includes(body.pricingMode) ? body.pricingMode : "FLEXIBLE";
    const priceXOF = Math.max(0, Math.round(Number(body.priceXOF ?? 15000) || 0));

    const template = await createCardTemplate({
      key: rawKey,
      name,
      subtitle: typeof body.subtitle === "string" ? body.subtitle.trim() : null,
      description: typeof body.description === "string" ? body.description.trim() : null,
      pricingMode,
      priceXOF: pricingMode === "FREE" ? 0 : priceXOF,
      defaultFree: pricingMode === "FREE" ? true : Boolean(body.defaultFree),
      allowCustomPrice: body.allowCustomPrice !== false,
      isPublic: body.isPublic !== false,
      isActive: body.isActive !== false,
      sortOrder: typeof body.sortOrder === "number" ? body.sortOrder : 10,
    });

    return NextResponse.json({ template, success: true }, { status: 201 });
  } catch (err: any) {
    console.error("Erreur POST admin template:", err);
    return NextResponse.json({ error: err?.message || "Impossible de créer le template" }, { status: 500 });
  }
}
