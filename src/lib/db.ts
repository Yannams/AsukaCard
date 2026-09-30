import fs from "fs";
import path from "path";
import { hashPassword } from "./auth";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export type DominantColor = "orange" | "black" | "white";
export type CardTemplate = "modern" | "minimalist" | "executive" | "creative" | "premium" | "professional";

export interface SocialLinks {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  x?: string;
  youtube?: string;
  snapchat?: string;
}

export interface FieldVisibility {
  phone: boolean;
  whatsapp: boolean;
  email: boolean;
  website: boolean;
  address: boolean;
  bio: boolean;
  socials: boolean;
}

export interface Card {
  id: string;
  userId: string;
  slug: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  logoUrl: string;
  avatarUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  bio: string;
  socials: SocialLinks;
  dominantColor: DominantColor;
  template: CardTemplate;
  fieldVisibility: FieldVisibility;
  viewsCount: number;
  contactClicks: number;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsEvent {
  id: string;
  cardId: string;
  type: "view" | "contact_click" | "share" | "vcard";
  meta?: string;
  createdAt: string;
}

interface DatabaseSchema {
  users: User[];
  cards: Card[];
  analytics: AnalyticsEvent[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "asuka.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getInitialData(): DatabaseSchema {
  const defaultPasswordHash = hashPassword("asuka2026");
  const defaultUserId = "usr_demo_1";

  const demoUser: User = {
    id: defaultUserId,
    name: "Jean Dupont",
    email: "demo@asukacard.fr",
    passwordHash: defaultPasswordHash,
    createdAt: new Date().toISOString(),
  };

  const defaultVisibility: FieldVisibility = {
    phone: true,
    whatsapp: true,
    email: true,
    website: true,
    address: true,
    bio: true,
    socials: true,
  };

  const demoCard1: Card = {
    id: "crd_demo_1",
    userId: defaultUserId,
    slug: "jean-dupont",
    firstName: "Jean",
    lastName: "Dupont",
    title: "Directeur de Création & Stratégie",
    company: "Asuka Studio Paris",
    logoUrl: "",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    phone: "+33 6 12 34 56 78",
    whatsapp: "+33612345678",
    email: "jean.dupont@asuka-studio.fr",
    website: "https://asuka-card.com",
    address: "14 Rue de Rivoli, 75001 Paris, France",
    bio: "Spécialiste en identité de marque et direction artistique. J'accompagne les maisons d'exception et startups ambitieuses dans leur déploiement visuel.",
    socials: {
      linkedin: "https://linkedin.com/in/jeandupont",
      instagram: "https://instagram.com/jeandupont",
      x: "https://x.com/jeandupont",
    },
    dominantColor: "orange",
    template: "modern",
    fieldVisibility: { ...defaultVisibility },
    viewsCount: 184,
    contactClicks: 47,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const demoCard2: Card = {
    id: "crd_demo_2",
    userId: defaultUserId,
    slug: "sophie-martin",
    firstName: "Sophie",
    lastName: "Martin",
    title: "Architecte & Designer d'Espace",
    company: "Atelier Martin",
    logoUrl: "",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    phone: "+33 7 98 76 54 32",
    whatsapp: "+33798765432",
    email: "contact@atelier-martin.fr",
    website: "https://atelier-martin.fr",
    address: "28 Boulevard Saint-Germain, 75005 Paris",
    bio: "Conception de lieux de vie et d'espaces professionnels épurés, alliant matériaux nobles, lumière naturelle et sobriété contemporaine.",
    socials: {
      linkedin: "https://linkedin.com/in/sophiemartin",
      instagram: "https://instagram.com/sophiemartin_arch",
    },
    dominantColor: "black",
    template: "minimalist",
    fieldVisibility: { ...defaultVisibility },
    viewsCount: 112,
    contactClicks: 31,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const demoCard3: Card = {
    id: "crd_demo_3",
    userId: defaultUserId,
    slug: "alexandre-leroy",
    firstName: "Alexandre",
    lastName: "Leroy",
    title: "Partner & Consultant FinTech",
    company: "Kuro Capital Advisors",
    logoUrl: "",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    phone: "+33 1 40 20 30 40",
    whatsapp: "+33140203040",
    email: "a.leroy@kurocapital.com",
    website: "https://kurocapital.com",
    address: "42 Place de la Madeleine, 75008 Paris",
    bio: "Conseil en levée de fonds et fusions-acquisitions pour entreprises technologiques à forte croissance.",
    socials: {
      linkedin: "https://linkedin.com/in/alexandreleroy",
      x: "https://x.com/alexandreleroy",
    },
    dominantColor: "white",
    template: "executive",
    fieldVisibility: { ...defaultVisibility },
    viewsCount: 65,
    contactClicks: 19,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const demoCardRichard: Card = {
    id: "crd_rk8m4x29",
    userId: defaultUserId,
    slug: "richard-odjrado",
    firstName: "Richard",
    lastName: "Odjrado",
    title: "Fondateur & CEO",
    company: "AS World Tech & Asuka",
    logoUrl: "",
    avatarUrl: "/images/richard-odjrado.jpg",
    phone: "+229 67 08 83 03",
    whatsapp: "+22967088303",
    email: "rodjrado-ceo@asworld.tech",
    website: "https://asukaspirit.com",
    address: "Cotonou, Bénin - Paris, France",
    bio: "Entrepreneur & Innovateur Tech. Concepteur d'objets connectés et solutions technologiques souveraines. Fondateur d'AS World Tech et créateur de la marque Asuka.",
    socials: {
      facebook: "https://www.facebook.com/rodjrado",
      instagram: "https://www.instagram.com/richardodjrado",
      linkedin: "https://www.linkedin.com/in/richard-g-odjrado-660a08179/",
      youtube: "https://www.youtube.com/@asworldtech7517",
      snapchat: "https://www.snapchat.com/@rodjrado",
      tiktok: "https://www.tiktok.com/@richardodjrado",
    },
    dominantColor: "black",
    template: "premium",
    fieldVisibility: { ...defaultVisibility },
    viewsCount: 440,
    contactClicks: 120,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    users: [demoUser],
    cards: [demoCardRichard, demoCard1, demoCard2, demoCard3],
    analytics: [],
  };
}

function readDb(): DatabaseSchema {
  ensureDirectoryExists();
  if (!fs.existsSync(DB_FILE)) {
    const initialData = getInitialData();
    writeDb(initialData);
    return initialData;
  }
  try {
    const content = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    const initialData = getInitialData();
    writeDb(initialData);
    return initialData;
  }
}

function writeDb(data: DatabaseSchema): void {
  ensureDirectoryExists();
  const tempFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tempFile, DB_FILE);
}

// User Helpers
export function findUserByEmail(email: string): User | undefined {
  const db = readDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  const db = readDb();
  return db.users.find((u) => u.id === id);
}

export function createUser(name: string, email: string, passwordHash: string): User {
  const db = readDb();
  const newUser: User = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    email: email.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  db.users.push(newUser);
  writeDb(db);
  return newUser;
}

// Card Helpers
export function getCardsByUserId(userId: string): Card[] {
  const db = readDb();
  return db.cards.filter((c) => c.userId === userId);
}

export function getCardById(id: string): Card | undefined {
  const db = readDb();
  return db.cards.find((c) => c.id === id);
}

export function getCardBySlug(slug: string): Card | undefined {
  const db = readDb();
  const normalized = slug.trim().toLowerCase();
  return db.cards.find(
    (c) =>
      c.slug.toLowerCase() === normalized ||
      c.id.toLowerCase() === normalized ||
      (c.slug === "georges-ale" && normalized === "ga9m3x7w") ||
      (c.slug === "ga9m3x7w" && normalized === "georges-ale") ||
      (c.slug === "richard-odjrado" && normalized === "rk8m4x29") ||
      (c.slug === "rk8m4x29" && normalized === "richard-odjrado")
  );
}

export function generateSecureSlug(): string {
  // Generates an unguessable 8-character token (base32-safe, no ambiguous l, 1, 0, o)
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function isSlugAvailable(slug: string, excludeCardId?: string): boolean {
  const db = readDb();
  const normalized = slug.trim().toLowerCase();
  const reserved = ["api", "login", "register", "dashboard", "create", "favicon.ico", "uploads", "_next", "c"];
  if (reserved.includes(normalized)) return false;

  return !db.cards.some((c) => (c.slug.toLowerCase() === normalized || c.id.toLowerCase() === normalized) && c.id !== excludeCardId);
}

export function createCard(cardData: Omit<Card, "id" | "viewsCount" | "contactClicks" | "createdAt" | "updatedAt">): Card {
  const db = readDb();
  const newCard: Card = {
    ...cardData,
    id: `crd_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    viewsCount: 0,
    contactClicks: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.cards.push(newCard);
  writeDb(db);
  return newCard;
}

export function updateCard(id: string, cardData: Partial<Omit<Card, "id" | "userId" | "createdAt">>): Card | null {
  const db = readDb();
  const index = db.cards.findIndex((c) => c.id === id);
  if (index === -1) return null;

  db.cards[index] = {
    ...db.cards[index],
    ...cardData,
    updatedAt: new Date().toISOString(),
  };
  writeDb(db);
  return db.cards[index];
}

export function deleteCard(id: string, userId: string): boolean {
  const db = readDb();
  const initialLength = db.cards.length;
  db.cards = db.cards.filter((c) => !(c.id === id && c.userId === userId));
  if (db.cards.length !== initialLength) {
    writeDb(db);
    return true;
  }
  return false;
}

// Analytics Helpers
export function recordCardAnalytics(cardId: string, type: AnalyticsEvent["type"], meta?: string): void {
  const db = readDb();
  const card = db.cards.find((c) => c.id === cardId);
  if (!card) return;

  if (type === "view") {
    card.viewsCount += 1;
  } else if (type === "contact_click") {
    card.contactClicks += 1;
  }

  db.analytics.push({
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    cardId,
    type,
    meta,
    createdAt: new Date().toISOString(),
  });

  writeDb(db);
}
