import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedAdminOrService } from "@/lib/auth";
import { updateCardTemplate, deleteCardTemplate } from "@/lib/db";

const VALID_PRICING_MODES = ["PAID", "FREE", "FLEXIBLE"];
const CORE_TEMPLATE_KEYS = ["premium", "government", "tpl_premium", "tpl_government"];

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

    const updates: Record<string, any> = {};
    if (typeof body.name === "string" && body.name.trim()) updates.name = body.name.trim();
    if (body.subtitle !== undefined) {
      updates.subtitle = typeof body.subtitle === "string" ? body.subtitle.trim() : null;
    }
    if (body.description !== undefined) {
      updates.description = typeof body.description === "string" ? body.description.trim() : null;
    }
    if (body.pricingMode !== undefined && VALID_PRICING_MODES.includes(body.pricingMode)) {
      updates.pricingMode = body.pricingMode;
      if (body.pricingMode === "FREE") {
        updates.defaultFree = true;
      } else if (body.pricingMode === "PAID") {
        updates.defaultFree = false;
      }
    }
    if (body.priceXOF !== undefined) {
      updates.priceXOF = Math.max(0, Math.round(Number(body.priceXOF) || 0));
    }
    if (body.defaultFree !== undefined && updates.pricingMode !== "FREE" && updates.pricingMode !== "PAID") {
      updates.defaultFree = Boolean(body.defaultFree);
    }
    if (body.allowCustomPrice !== undefined) {
      updates.allowCustomPrice = Boolean(body.allowCustomPrice);
    }
    if (body.isPublic !== undefined) updates.isPublic = Boolean(body.isPublic);
    if (body.isActive !== undefined) updates.isActive = Boolean(body.isActive);
    if (typeof body.sortOrder === "number") updates.sortOrder = body.sortOrder;

    const template = await updateCardTemplate(id, updates);
    return NextResponse.json({ template, success: true });
  } catch (err: any) {
    console.error("Erreur PATCH admin template:", err);
    return NextResponse.json(
      { error: err?.message || "Impossible de mettre à jour le template" },
      { status: err?.message === "Template introuvable" ? 404 : 500 }
    );
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
    if (CORE_TEMPLATE_KEYS.includes(id)) {
      return NextResponse.json(
        { error: "Les templates principaux (Standard et Gouvernement) ne peuvent pas être supprimés." },
        { status: 400 }
      );
    }
    await deleteCardTemplate(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Erreur DELETE admin template:", err);
    return NextResponse.json(
      { error: err?.message || "Impossible de supprimer le template" },
      { status: 500 }
    );
  }
}
