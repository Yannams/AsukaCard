import prisma from "./prisma";
import { Card, User, Order } from "../generated/prisma/client";

export type { Card, User, Order };
export type DominantColor = "orange" | "black" | "white";
export type CardTemplate = "modern" | "minimalist" | "executive" | "creative" | "premium" | "professional" | "apple_invitation";

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
  });
  if (!card) {
    card = await prisma.card.findUnique({
      where: { id: normalized },
    });
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
  const reserved = ["api", "login", "register", "dashboard", "create", "favicon.ico", "uploads", "_next", "c", "admin"];
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
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true } },
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
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true } },
    },
  });
}

export async function getOrdersByUserId(userId: string) {
  return await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true } },
    },
  });
}

export async function getAllOrders() {
  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true } },
    },
  });
}

export async function getOrderById(id: string) {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true } },
    },
  });
}

export async function updateOrder(id: string, data: any) {
  return await prisma.order.update({
    where: { id },
    data,
    include: {
      user: { select: { id: true, name: true, email: true } },
      card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true } },
    },
  });
}

export async function deleteOrder(id: string): Promise<boolean> {
  await prisma.order.delete({
    where: { id },
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
