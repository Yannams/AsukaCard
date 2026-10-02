import prisma from "./prisma";
import { Card, User } from "../generated/prisma/client";

export type { Card, User };
export type DominantColor = "orange" | "black" | "white";
export type CardTemplate = "modern" | "minimalist" | "executive" | "creative" | "premium" | "professional";

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
    },
  });
}

// Card Helpers
export async function getCardsByUserId(userId: string) {
  return await prisma.card.findMany({
    where: { userId },
  });
}

export async function getCardById(id: string) {
  return await prisma.card.findUnique({
    where: { id },
  });
}

export async function getCardBySlug(slug: string) {
  const normalized = slug.trim().toLowerCase();
  
  // First try direct slug
  let card = await prisma.card.findUnique({
    where: { slug: normalized }
  });
  
  if (!card) {
    // Then try ID (just in case they pass ID instead of slug)
    card = await prisma.card.findUnique({
      where: { id: normalized }
    });
  }
  
  // Fallback for hardcoded demo legacy slugs
  if (!card && (normalized === "ga9m3x7w" || normalized === "georges-ale")) {
     card = await prisma.card.findFirst({ where: { OR: [{ slug: "georges-ale" }, { slug: "ga9m3x7w" }] } });
  }
  if (!card && (normalized === "rk8m4x29" || normalized === "richard-odjrado")) {
     card = await prisma.card.findFirst({ where: { OR: [{ slug: "richard-odjrado" }, { slug: "rk8m4x29" }] } });
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
  const reserved = ["api", "login", "register", "dashboard", "create", "favicon.ico", "uploads", "_next", "c"];
  if (reserved.includes(normalized)) return false;

  const existingCard = await prisma.card.findFirst({
    where: {
      OR: [
        { slug: normalized },
        { id: normalized }
      ],
      NOT: excludeCardId ? { id: excludeCardId } : undefined
    }
  });

  return !existingCard;
}

export async function createCard(cardData: any) {
  // Prisma generates createdAt/updatedAt/viewsCount automatically
  // Just pass the raw data directly to Prisma
  return await prisma.card.create({
    data: cardData
  });
}

export async function updateCard(id: string, cardData: any) {
  try {
    return await prisma.card.update({
      where: { id },
      data: cardData,
    });
  } catch (error) {
    return null; // emulate the old behavior of returning null if not found
  }
}

export async function deleteCard(id: string, userId: string): Promise<boolean> {
  try {
    const count = await prisma.card.deleteMany({
      where: {
        id,
        userId
      }
    });
    return count.count > 0;
  } catch (error) {
    return false;
  }
}

// Analytics Helpers
export async function recordCardAnalytics(cardId: string, type: "view" | "contact_click", meta?: string) {
  // In the real DB, we would ideally have an Analytics table, 
  // but since we omitted it for MVP and just kept viewsCount / contactClicks,
  // we will just increment the counters on the Card model!
  
  if (type === "view") {
    await prisma.card.update({
      where: { id: cardId },
      data: { viewsCount: { increment: 1 } }
    }).catch(() => {});
  } else if (type === "contact_click") {
    await prisma.card.update({
      where: { id: cardId },
      data: { contactClicks: { increment: 1 } }
    }).catch(() => {});
  }
}
