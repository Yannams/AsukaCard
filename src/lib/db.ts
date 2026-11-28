import prisma from "./prisma";
import { Card, User, Order } from "../generated/prisma/client";

export type { Card, User, Order };
export type DominantColor = "orange" | "black" | "white";
export type CardTemplate = "government" | "modern" | "minimalist" | "executive" | "creative" | "premium" | "professional" | "apple_invitation" | (string & {});
export type CardTemplatePricingMode = "PAID" | "FREE" | "FLEXIBLE";

export interface CardTemplateData {
  id: string;
  key: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  pricingMode: string;
  priceXOF: number;
  defaultFree: boolean;
  allowCustomPrice: boolean;
  isPublic: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const DEFAULT_CARD_TEMPLATES: Omit<CardTemplateData, "id" | "createdAt" | "updatedAt">[] = [
  {
    key: "premium",
    name: "Standard",
    subtitle: "Profil digital Asuka Card",
    description:
      "Modèle sombre de base utilisé par défaut pour les particuliers et professionnels.",
    pricingMode: "FLEXIBLE",
    priceXOF: 15000,
    defaultFree: false,
    allowCustomPrice: true,
    isPublic: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    key: "government",
    name: "Gouvernement",
    subtitle: "Protocole Officiel & Ministères",
    description:
      "Template institutionnel clair avec armoiries et liseré tricolore national.",
    pricingMode: "FLEXIBLE",
    priceXOF: 15000,
    defaultFree: true,
    allowCustomPrice: true,
    isPublic: false,
    isActive: true,
    sortOrder: 2,
  },
];

function fallbackTemplates(): CardTemplateData[] {
  return DEFAULT_CARD_TEMPLATES.map((t) => ({
    ...t,
    id: `tpl_${t.key}`,
  }));
}

export async function getAllCardTemplates(): Promise<CardTemplateData[]> {
  try {
    const count = await prisma.cardTemplate.count();
    if (count === 0) {
      await prisma.cardTemplate.createMany({
        data: DEFAULT_CARD_TEMPLATES,
        skipDuplicates: true,
      });
    }
    return await prisma.cardTemplate.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  } catch (err: any) {
    console.warn("[TEMPLATES] Fallback to default templates:", err?.message || err);
    return fallbackTemplates();
  }
}

export async function getCardTemplateByKey(key: string): Promise<CardTemplateData | null> {
  const normalizedKey = (key || "").trim();
  if (!normalizedKey) return null;
  try {
    const existing = await prisma.cardTemplate.findUnique({
      where: { key: normalizedKey },
    });
    if (existing) return existing;
    const all = await getAllCardTemplates();
    return all.find((t) => t.key === normalizedKey) || null;
  } catch {
    return fallbackTemplates().find((t) => t.key === normalizedKey) || null;
  }
}

export async function createCardTemplate(data: {
  key: string;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  pricingMode?: string;
  priceXOF?: number;
  defaultFree?: boolean;
  allowCustomPrice?: boolean;
  isPublic?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}): Promise<CardTemplateData> {
  return await prisma.cardTemplate.create({
    data: {
      key: data.key,
      name: data.name,
      subtitle: data.subtitle ?? null,
      description: data.description ?? null,
      pricingMode: data.pricingMode || "FLEXIBLE",
      priceXOF: typeof data.priceXOF === "number" ? Math.max(0, Math.round(data.priceXOF)) : 15000,
      defaultFree: Boolean(data.defaultFree),
      allowCustomPrice: data.allowCustomPrice !== false,
      isPublic: data.isPublic !== false,
      isActive: data.isActive !== false,
      sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 10,
    },
  });
}

export async function updateCardTemplate(
  idOrKey: string,
  data: Partial<Omit<CardTemplateData, "id" | "key" | "createdAt" | "updatedAt">>
): Promise<CardTemplateData> {
  // Ensure defaults are seeded if table was empty before updating by id/key
  await getAllCardTemplates();

  const existing = await prisma.cardTemplate.findFirst({
    where: {
      OR: [
        { id: idOrKey },
        { key: idOrKey },
        ...(idOrKey.startsWith("tpl_") ? [{ key: idOrKey.slice(4) }] : []),
      ],
    },
  });

  if (!existing) {
    throw new Error("Template introuvable");
  }

  return await prisma.cardTemplate.update({
    where: { id: existing.id },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.subtitle !== undefined ? { subtitle: data.subtitle } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.pricingMode !== undefined ? { pricingMode: data.pricingMode } : {}),
      ...(data.priceXOF !== undefined ? { priceXOF: Math.max(0, Math.round(data.priceXOF)) } : {}),
      ...(data.defaultFree !== undefined ? { defaultFree: Boolean(data.defaultFree) } : {}),
      ...(data.allowCustomPrice !== undefined ? { allowCustomPrice: Boolean(data.allowCustomPrice) } : {}),
      ...(data.isPublic !== undefined ? { isPublic: Boolean(data.isPublic) } : {}),
      ...(data.isActive !== undefined ? { isActive: Boolean(data.isActive) } : {}),
      ...(data.sortOrder !== undefined ? { sortOrder: Number(data.sortOrder) } : {}),
    },
  });
}

export async function deleteCardTemplate(idOrKey: string): Promise<boolean> {
  const existing = await prisma.cardTemplate.findFirst({
    where: {
      OR: [{ id: idOrKey }, { key: idOrKey }],
    },
  });
  if (!existing) {
    throw new Error("Template introuvable");
  }
  await prisma.cardTemplate.delete({ where: { id: existing.id } });
  return true;
}

/**
 * Resolve a valid existing User ID in PostgreSQL (handles service-key synthetic "usr_admin" IDs).
 */
export async function resolveOrCreateUserId(opts: {
  userId?: string | null;
  email?: string | null;
  name?: string | null;
}): Promise<string> {
  if (opts.userId && opts.userId !== "usr_admin") {
    const existingById = await prisma.user.findUnique({ where: { id: opts.userId } });
    if (existingById) return existingById.id;
  }

  if (opts.email && opts.email.trim()) {
    const cleanEmail = opts.email.toLowerCase().trim();
    const existingByEmail = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existingByEmail) return existingByEmail.id;

    const cryptoMod = await import("crypto");
    const { hashPassword } = await import("./auth");
    const created = await prisma.user.create({
      data: {
        email: cleanEmail,
        name: (opts.name || cleanEmail.split("@")[0]).trim(),
        passwordHash: hashPassword(cryptoMod.randomBytes(16).toString("hex")),
        role: "USER",
      },
    });
    return created.id;
  }

  const adminUser = await prisma.user.findFirst({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "asc" },
  });
  if (adminUser) return adminUser.id;

  const fallbackEmail = "admin@asukaspirit.com";
  const existingFallback = await prisma.user.findUnique({ where: { email: fallbackEmail } });
  if (existingFallback) return existingFallback.id;

  const cryptoMod = await import("crypto");
  const { hashPassword } = await import("./auth");
  const createdAdmin = await prisma.user.create({
    data: {
      email: fallbackEmail,
      name: "Administrateur Asuka Spirit",
      passwordHash: hashPassword(cryptoMod.randomBytes(16).toString("hex")),
      role: "ADMIN",
    },
  });
  return createdAdmin.id;
}

// Physical NFC Card Catalog
export { CARD_PRODUCTS, type CardProduct } from "./products";

// User Helpers
export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function createUser(name: string, email: string, passwordHash: string) {
  return await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: "USER",
    },
  });
}

// Card Helpers
export async function getCardsByUserId(userId: string) {
  return await prisma.card.findMany({
    where: { userId },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCardById(id: string) {
  return await prisma.card.findUnique({
    where: { id },
  });
}

export async function getCardBySlug(slug: string) {
  const normalized = slug.trim().toLowerCase();

  let card = await prisma.card.findUnique({
    where: { slug: normalized },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!card) {
    card = await prisma.card.findUnique({
      where: { id: normalized },
      include: {
        orders: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  }

  // Fallback sécurisé vitrine Richard Odjrado si absent de la base
  if (!card && (normalized === "richard-odjrado" || normalized === "crd_rk8m4x29" || normalized === "v7p1k3d8")) {
    return {
      id: "crd_rk8m4x29",
      userId: "usr_admin",
      slug: "richard-odjrado",
      firstName: "Richard",
      lastName: "ODJRADO",
      title: "Fondateur & CEO",
      company: "AS WORLD TECH",
      bio: "Entrepreneur & Innovateur Tech. Fondateur & CEO d'AS WORLD TECH, société créatrice de solutions technologiques souveraines et propriétaire des marques ASUKA SPIRIT, Docteur Asuka et Asuka Card.",
      avatarUrl: "/images/richard-odjrado.jpg",
      logoUrl: "",
      phone: "+229 01 00 00 00",
      whatsapp: "",
      email: "contact@asworld.tech",
      website: "https://asukaspirit.com",
      address: "Cotonou, Bénin · Paris, France",
      dominantColor: "black",
      template: "premium",
      fieldVisibility: {
        phone: true,
        whatsapp: false,
        email: true,
        website: true,
        address: true,
        bio: true,
        socials: true,
      },
      socials: {
        linkedin: "https://www.linkedin.com/in/richard-g-odjrado-660a08179/",
        instagram: "https://www.instagram.com/richardodjrado",
        youtube: "https://www.youtube.com/@asworldtech7517",
        tiktok: "https://www.tiktok.com/@richardodjrado",
        facebook: "https://www.facebook.com/rodjrado",
      },
      viewsCount: 1240,
      contactClicks: 380,
      createdAt: new Date("2026-09-01"),
      updatedAt: new Date("2026-10-13"),
    } as unknown as Card;
  }

  return card;
}

export function generateSecureSlug(): string {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function isSlugAvailable(slug: string, excludeCardId?: string): Promise<boolean> {
  const normalized = slug.trim().toLowerCase();
  const reserved = ["api", "login", "register", "dashboard", "create", "favicon.ico", "uploads", "_next", "c", "admin", "preview"];
  if (reserved.includes(normalized)) return false;

  const existingCard = await prisma.card.findFirst({
    where: {
      OR: [
        { slug: normalized },
        { id: normalized },
      ],
      NOT: excludeCardId ? { id: excludeCardId } : undefined,
    },
  });
  return !existingCard;
}

export async function createCard(cardData: any) {
  return await prisma.card.create({
    data: cardData,
  });
}

export async function updateCard(id: string, cardData: any) {
  return await prisma.card.update({
    where: { id },
    data: cardData,
  });
}

export async function deleteCard(id: string, userId: string): Promise<boolean> {
  const count = await prisma.card.deleteMany({
    where: {
      id,
      userId,
    },
  });
  return count.count > 0;
}

export async function getAllCards() {
  return await prisma.card.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllUsers() {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function adminDeleteCard(id: string) {
  return await prisma.card.delete({
    where: { id },
  });
}

// Analytics Helpers
export async function recordCardAnalytics(cardId: string, type: "view" | "contact_click") {
  try {
    if (type === "view") {
      await prisma.card.update({
        where: { id: cardId },
        data: { viewsCount: { increment: 1 } },
      });
    } else if (type === "contact_click") {
      await prisma.card.update({
        where: { id: cardId },
        data: { contactClicks: { increment: 1 } },
      });
    }
  } catch (err) {
    // Non-blocking for analytics
  }
}

// Order Helpers
export async function createOrder(data: {
  userId: string;
  cardId?: string | null;
  cardType: string;
  cardColor?: string | null;
  customName?: string | null;
  quantity?: number;
  unitPrice: number;
  totalAmount: number;
  currency?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  country?: string;
  postalCode?: string | null;
  notes?: string | null;
  paymentMethod?: string | null;
  paymentStatus?: string;
  paymentRef?: string | null;
  paidAt?: Date | null;
  fedapayId?: string | null;
  fedapayStatus?: string | null;
  fedapayUrl?: string | null;
}) {
  const count = await prisma.order.count();
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `ASK-${dateStr}-${(count + 1).toString().padStart(3, "0")}-${randomSuffix}`;

  return await prisma.order.create({
    data: {
      orderNumber,
      userId: data.userId,
      cardId: data.cardId || null,
      cardType: data.cardType,
      cardColor: data.cardColor || "Noir Mat",
      customName: data.customName || null,
      quantity: data.quantity || 1,
      unitPrice: data.unitPrice,
      totalAmount: data.totalAmount,
      currency: data.currency || "XOF",
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      shippingAddress: data.shippingAddress,
      city: data.city,
      country: data.country || "Bénin",
      postalCode: data.postalCode || null,
      notes: data.notes || null,
      paymentMethod: data.paymentMethod || "FEDAPAY",
      paymentStatus: data.paymentStatus || "UNPAID",
      paymentRef: data.paymentRef || null,
      paidAt: data.paidAt || (data.paymentStatus === "PAID" ? new Date() : null),
      status: data.paymentStatus === "PAID" ? "CONFIRMED" : "PENDING",
      fedapayId: data.fedapayId ? String(data.fedapayId) : null,
      fedapayStatus: data.fedapayStatus || null,
      fedapayUrl: data.fedapayUrl || null,
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true, template: true } },
    },
  });
}

export async function updateOrderPayment(
  orderId: string,
  data: {
    paymentStatus: string;
    paymentRef?: string | null;
    paidAt?: Date | null;
    status?: string;
    fedapayId?: string | null;
    fedapayStatus?: string | null;
    fedapayUrl?: string | null;
  }
) {
  return await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: data.paymentStatus,
      paymentRef: data.paymentRef,
      paidAt: data.paidAt,
      status: data.status,
      fedapayId: data.fedapayId !== undefined ? (data.fedapayId ? String(data.fedapayId) : null) : undefined,
      fedapayStatus: data.fedapayStatus,
      fedapayUrl: data.fedapayUrl,
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true, template: true } },
    },
  });
}

export async function getOrdersByUserId(userId: string) {
  return await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true, template: true } },
    },
  });
}

export async function getAllOrders() {
  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true, template: true } },
    },
  });
}

export async function getOrderById(id: string) {
  const isOrderNumber = id.startsWith('ASK-') || id.startsWith('ORD-');
  return await prisma.order.findUnique({
    where: isOrderNumber ? { orderNumber: id } : { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true, template: true } },
    },
  });
}

export async function updateOrder(id: string, data: any) {
  const isOrderNumber = id.startsWith('ASK-') || id.startsWith('ORD-');
  return await prisma.order.update({
    where: isOrderNumber ? { orderNumber: id } : { id },
    data,
    include: {
      user: { select: { id: true, name: true, email: true } },
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true, template: true } },
    },
  });
}

export async function deleteOrder(id: string): Promise<boolean> {
  const isOrderNumber = id.startsWith('ASK-') || id.startsWith('ORD-');
  await prisma.order.delete({
    where: isOrderNumber ? { orderNumber: id } : { id },
  });
  return true;
}

export async function getOrderStats() {
  const orders = await prisma.order.findMany();
  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.paymentStatus === "PAID");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingCount = orders.filter((o) => o.status === "PENDING").length;
  const inProductionCount = orders.filter((o) => o.status === "IN_PRODUCTION").length;
  const shippedCount = orders.filter((o) => o.status === "SHIPPED").length;
  const deliveredCount = orders.filter((o) => o.status === "DELIVERED").length;
  return { totalOrders, totalRevenue, pendingCount, inProductionCount, shippedCount, deliveredCount };
}
