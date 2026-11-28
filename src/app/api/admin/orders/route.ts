import { NextResponse } from "next/server";
import { isAuthorizedAdminOrService, notifyBackofficeRealtime } from "@/lib/auth";
import {
  getAllOrders,
  updateOrder,
  createOrder,
  createCard,
  getCardById,
  updateCard,
  generateSecureSlug,
  isSlugAvailable,
  resolveOrCreateUserId,
  getCardTemplateByKey,
} from "@/lib/db";
import { CARD_PRODUCTS, CARD_COLORS } from "@/lib/products";

const VALID_TEMPLATES = [
  "government",
  "executive",
  "apple_invitation",
  "modern",
  "minimalist",
  "creative",
  "premium",
  "professional",
];

export async function GET(req: Request) {
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const orders = await getAllOrders();
    return NextResponse.json({ orders });
  } catch (err: any) {
    console.error("Erreur admin orders:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const user = await isAuthorizedAdminOrService(req);
  if (!user) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { orderId, status, paymentStatus, trackingNumber, carrier, notes } = body;

    if (!orderId) {
      return NextResponse.json({ error: "orderId requis" }, { status: 400 });
    }

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (paymentStatus !== undefined) {
      updateData.paymentStatus = paymentStatus;
      if (paymentStatus === "PAID") {
        updateData.paidAt = new Date();
      }
    }
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
    if (carrier !== undefined) updateData.carrier = carrier;
    if (notes !== undefined) updateData.notes = notes;

    const updated = await updateOrder(orderId, updateData);
    return NextResponse.json({ order: updated, success: true });
  } catch (err: any) {
    console.error("Erreur update admin order:", err);
    return NextResponse.json({ error: "Impossible de modifier la commande" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const adminUser = await isAuthorizedAdminOrService(req);
  if (!adminUser) {
    return NextResponse.json({ error: "Accès réservé aux administrateurs" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      cardId,
      createCard: shouldCreateCard,
      cardType = "PVC_CLASSIC",
      cardColor = "Noir Mat Obsidienne",
      customName,
      quantity = 1,
      unitPrice: unitPriceOverride,
      isFree,
      pricingChoice,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      country,
      notes,
      paymentMethod = "CASH_ON_DELIVERY",
      paymentStatus = "UNPAID",
      firstName,
      lastName,
      title,
      company,
      slug,
      phone,
      whatsapp,
      email,
      website,
      address,
      bio,
      logoUrl,
      avatarUrl,
      socials,
      dominantColor,
      template = "premium",
    } = body;

    const product = CARD_PRODUCTS.find((p) => p.id === cardType);
    if (!product) {
      return NextResponse.json({ error: "Modèle de carte invalide" }, { status: 400 });
    }

    const requestedTemplate = typeof template === "string" ? template.trim() : "premium";
    const templateConfig = await getCardTemplateByKey(requestedTemplate);
    const chosenTemplate = templateConfig
      ? templateConfig.key
      : VALID_TEMPLATES.includes(requestedTemplate)
        ? requestedTemplate
        : "premium";

    const qty = Math.max(1, Math.floor(Number(quantity) || 1));
    const parsedOverride =
      unitPriceOverride !== undefined && unitPriceOverride !== null && unitPriceOverride !== ""
        ? Number(unitPriceOverride)
        : undefined;
    const hasValidOverride = typeof parsedOverride === "number" && !Number.isNaN(parsedOverride) && parsedOverride >= 0;

    const explicitPaid =
      pricingChoice === "STANDARD" ||
      pricingChoice === "CUSTOM" ||
      isFree === false ||
      (hasValidOverride && parsedOverride > 0);

    const isComplimentary =
      Boolean(isFree) ||
      pricingChoice === "FREE" ||
      templateConfig?.pricingMode === "FREE" ||
      (hasValidOverride && parsedOverride === 0) ||
      (!explicitPaid && Boolean(templateConfig?.defaultFree));

    let unitPrice: number;
    if (isComplimentary) {
      unitPrice = 0;
    } else if (hasValidOverride && parsedOverride > 0) {
      unitPrice = Math.round(parsedOverride);
    } else {
      unitPrice =
        templateConfig && templateConfig.priceXOF > 0
          ? templateConfig.priceXOF
          : product.priceXOF;
    }
    const totalAmount = unitPrice * qty;

    const foundColor = CARD_COLORS.find(
      (c) => c.id === cardColor || c.shortName === cardColor || c.name === cardColor
    );
    const resolvedColor = foundColor ? foundColor.name : cardColor || "Noir Mat Obsidienne";

    // Derive names consistently between customer and card holder
    const trimmedCustomer = typeof customerName === "string" ? customerName.trim() : "";
    const trimmedFirst = typeof firstName === "string" ? firstName.trim() : "";
    const trimmedLast = typeof lastName === "string" ? lastName.trim() : "";

    let resolvedFirst = trimmedFirst;
    let resolvedLast = trimmedLast;
    if (!resolvedFirst && trimmedCustomer) {
      const parts = trimmedCustomer.split(/\s+/);
      resolvedFirst = parts[0] || "Client";
      resolvedLast = parts.slice(1).join(" ") || "Asuka";
    }
    const resolvedCustomerName =
      trimmedCustomer || `${resolvedFirst} ${resolvedLast}`.trim();

    if (!resolvedCustomerName) {
      return NextResponse.json(
        { error: "Le nom du client / titulaire est obligatoire." },
        { status: 400 }
      );
    }

    const resolvedEmail =
      (typeof customerEmail === "string" && customerEmail.trim()) ||
      (typeof email === "string" && email.trim()) ||
      "client@asukacard.com";
    const resolvedPhone =
      (typeof customerPhone === "string" && customerPhone.trim()) ||
      (typeof phone === "string" && phone.trim()) ||
      "+22900000000";

    const targetUserId = await resolveOrCreateUserId({
      email: resolvedEmail,
      name: resolvedCustomerName,
    });

    let linkedCardId: string | null = cardId || null;
    let createdCard: any = null;

    if (linkedCardId) {
      const existingCard = await getCardById(linkedCardId);
      if (!existingCard) {
        return NextResponse.json({ error: "Profil NFC sélectionné introuvable." }, { status: 404 });
      }
      if (requestedTemplate && existingCard.template !== chosenTemplate) {
        createdCard = await updateCard(linkedCardId, { template: chosenTemplate });
      } else {
        createdCard = existingCard;
      }
    } else if (shouldCreateCard !== false) {
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
            { error: "Format du slug NFC invalide (lettres minuscules, chiffres et tirets uniquement)." },
            { status: 400 }
          );
        }
        if (!(await isSlugAvailable(cleanSlug))) {
          return NextResponse.json({ error: "Ce slug NFC est déjà utilisé." }, { status: 409 });
        }
      }

      createdCard = await createCard({
        userId: targetUserId,
        slug: cleanSlug,
        firstName: resolvedFirst || resolvedCustomerName,
        lastName: resolvedLast || "",
        title: (title || "").trim(),
        company: (company || "").trim(),
        logoUrl: logoUrl || "",
        avatarUrl: avatarUrl || "",
        phone: (phone || resolvedPhone || "").trim(),
        whatsapp: (whatsapp || "").trim(),
        email: (email || resolvedEmail || "").trim(),
        website: (website || "").trim(),
        address: (address || shippingAddress || "").trim(),
        bio: (bio || "").trim(),
        socials: socials || {},
        dominantColor: ["black", "orange", "white"].includes(dominantColor)
          ? dominantColor
          : "black",
        template: chosenTemplate,
        fieldVisibility: {
          phone: true,
          whatsapp: true,
          email: true,
          website: true,
          address: true,
          bio: true,
          socials: true,
        },
      });
      linkedCardId = createdCard.id;
    }

    const effectivePaymentMethod = isComplimentary
      ? "COMPLIMENTARY"
      : paymentMethod || "CASH_ON_DELIVERY";
    const isPaid = isComplimentary || paymentStatus === "PAID";
    const paymentRef = isComplimentary
      ? `OFFERT-${Date.now().toString(36).toUpperCase()}`
      : isPaid
        ? `ADM-${Date.now().toString(36).toUpperCase()}`
        : null;

    const order = await createOrder({
      userId: targetUserId,
      cardId: linkedCardId,
      cardType,
      cardColor: resolvedColor,
      customName: (customName || resolvedCustomerName).trim(),
      quantity: qty,
      unitPrice,
      totalAmount,
      currency: "XOF",
      customerName: resolvedCustomerName,
      customerEmail: resolvedEmail,
      customerPhone: resolvedPhone,
      shippingAddress:
        (shippingAddress || "").trim() || "Retrait direct au Showroom Asuka Spirit (Cotonou)",
      city: (city || "").trim() || "Cotonou",
      country: (country || "").trim() || "Bénin",
      notes: notes ? String(notes).trim() : null,
      paymentMethod: effectivePaymentMethod,
      paymentStatus: isPaid ? "PAID" : "UNPAID",
      paymentRef,
      paidAt: isPaid ? new Date() : null,
    });

    await notifyBackofficeRealtime({
      type: isPaid ? "CARD_ORDER_PAID" : "CARD_ORDER_CREATED",
      title: `Nouvelle commande Asuka Card (${order.orderNumber})`,
      message: `${resolvedCustomerName} — ${product.name} (${resolvedColor}) • ${
        isComplimentary ? "Offert (0 FCFA)" : `${totalAmount.toLocaleString("fr-FR")} FCFA`
      }`,
      orderId: `AC-${order.id}`,
      orderNumber: order.orderNumber,
      amount: totalAmount,
      customerName: resolvedCustomerName,
    });

    return NextResponse.json({ order, card: createdCard, success: true }, { status: 201 });
  } catch (err: any) {
    console.error("Erreur création admin order:", err);
    return NextResponse.json(
      { error: err?.message || "Impossible de créer la commande carte" },
      { status: 500 }
    );
  }
}
