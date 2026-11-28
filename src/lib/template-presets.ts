import type { Card, CardTemplate, DominantColor } from "@/lib/db";

export interface TemplateOption {
  id: CardTemplate;
  name: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  isDark: boolean;
}

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: "government",
    name: "🇧🇯 Membre du Gouvernement",
    subtitle: "Protocole Officiel & Ministères",
    badge: "OFFICIEL ÉTAT",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    description:
      "Template protocolaire clair inspiré des cartes officielles ministérielles : armoiries, liseré tricolore national, bleu républicain et contacts directs.",
    isDark: false,
  },
  {
    id: "executive",
    name: "🏛️ Ministériel / Exécutif",
    subtitle: "Modèle Officiel de l'État & Grands Dirigeants",
    badge: "EXCLUSIF BACKOFFICE",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    description:
      "Design régalien sombre haute distinction conçu pour les Ministres, Présidents d'institutions et Directeurs Généraux. Intègre les badges d'État et le logo institutionnel en bannière.",
    isDark: true,
  },
  {
    id: "premium",
    name: "👑 Premium Prestige",
    subtitle: "Finition Soft-Touch & Noir Profond",
    badge: "Populaire",
    badgeColor: "bg-neutral-800 text-neutral-300 border-neutral-700",
    description:
      "Élégance sobre et minimaliste pour dirigeants d'entreprises, fondateurs et investisseurs.",
    isDark: true,
  },
  {
    id: "modern",
    name: "⚡ Moderne Dynamique",
    subtitle: "Signature Orange & Noir Asuka",
    badge: "Tech & Innovation",
    badgeColor: "bg-[#FF6B00]/15 text-[#FF6B00] border-[#FF6B00]/30",
    description:
      "Contraste affirmé orange signature, boutons d'action rapides et profil dynamique.",
    isDark: false,
  },
  {
    id: "apple_invitation",
    name: "🍏 Apple Invitation",
    subtitle: "Style Invitation Cupertinienne",
    description:
      "Format carte d'invitation Apple épuré, typographie soignée et fond clair subtil.",
    isDark: true,
  },
  {
    id: "minimalist",
    name: "⚪ Minimaliste",
    subtitle: "Monochrome & Lignes Épurées",
    description:
      "Sobriété maximale, idéal pour les profils axés sur l'efficacité directe.",
    isDark: false,
  },
  {
    id: "creative",
    name: "🎨 Créatif Contemporain",
    subtitle: "Design Artistique & Couleurs",
    description:
      "Nuances contemporaines avec dégradé subtil pour personnalités publiques et créateurs.",
    isDark: true,
  },
];

export const DOMINANT_COLOR_OPTIONS: {
  id: DominantColor;
  label: string;
  shortLabel: string;
  color: string;
}[] = [
  {
    id: "black",
    label: "Noir Obsidienne",
    shortLabel: "Noir",
    color: "bg-[#111111] border-neutral-700",
  },
  {
    id: "orange",
    label: "Orange Signature",
    shortLabel: "Orange",
    color: "bg-[#FF6B00] border-orange-500",
  },
  {
    id: "white",
    label: "Blanc Céramique",
    shortLabel: "Blanc",
    color: "bg-neutral-100 text-black border-neutral-300",
  },
];

const DARK_TEMPLATES = new Set<string>([
  "premium",
  "executive",
  "apple_invitation",
  "creative",
]);

export function isDarkTemplate(template?: string | null): boolean {
  if (!template) return true;
  return DARK_TEMPLATES.has(template);
}

const DEMO_GOVERNMENT_CARD: Partial<Card> = {
  id: "preview_gov",
  slug: "exemple-gouv",
  firstName: "Koffi",
  lastName: "MENSAH",
  title: "Ministre",
  company: "Ministère de l'Économie Numérique",
  logoUrl: "/images/demo-minister-emblem.jpg",
  avatarUrl: "/images/demo-minister-portrait.jpg",
  phone: "+229 01 00 00 00 00",
  whatsapp: "+2290100000000",
  email: "contact@institution.gouv.bj",
  website: "https://www.gouv.bj",
  address: "Cotonou, Bénin",
  bio: "Profil officiel de démonstration pour les membres d'institutions et ministères.",
  dominantColor: "white",
  template: "government",
  socials: {
    linkedin: "https://www.linkedin.com",
  },
};

const DEMO_APPLE_INVITATION_CARD: Partial<Card> = {
  id: "preview_apple",
  slug: "launch-asuka",
  firstName: "Richard",
  lastName: "Odjrado",
  title: "Soirée de Lancement Asuka Card",
  company: "sam. 15 mai 2027 à 19:00",
  logoUrl: "",
  avatarUrl: "/images/richard-odjrado.jpg",
  phone: "+229 01 97 00 00 00",
  whatsapp: "+2290197000000",
  email: "contact@asworld.tech",
  website: "https://asukaspirit.com",
  address: "Sofitel Cotonou Marina, Bénin",
  bio: "Rejoignez-nous pour une soirée exclusive autour du lancement de la nouvelle collection Asuka Card.",
  dominantColor: "black",
  template: "apple_invitation",
  socials: {},
};

const DEMO_EXECUTIVE_CARD: Partial<Card> = {
  id: "preview_exec",
  slug: "rk8m4x29",
  firstName: "Richard",
  lastName: "Odjrado",
  title: "Fondateur & CEO",
  company: "AS WORLD TECH",
  logoUrl: "",
  avatarUrl: "/images/richard-odjrado.jpg",
  phone: "+229 01 97 00 00 00",
  whatsapp: "+2290197000000",
  email: "contact@asworld.tech",
  website: "https://asukaspirit.com",
  address: "Cotonou, Bénin · Paris, France",
  bio: "Entrepreneur & Innovateur Tech. Fondateur & CEO d'AS WORLD TECH, société créatrice de solutions technologiques souveraines.",
  dominantColor: "black",
  template: "premium",
  socials: {
    linkedin: "https://www.linkedin.com/in/richard-g-odjrado-660a08179/",
    instagram: "https://www.instagram.com/richardodjrado",
  },
};

function getTemplateDemoPreset(template: string): Partial<Card> {
  if (template === "government") return DEMO_GOVERNMENT_CARD;
  if (template === "apple_invitation") return DEMO_APPLE_INVITATION_CARD;
  return DEMO_EXECUTIVE_CARD;
}

function nonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? value : undefined;
}

/**
 * Construit un objet Card complet pour la prévisualisation sur mockup iPhone,
 * en conservant les champs existants ou en complétant avec un profil démo réaliste.
 */
export function buildMockPreviewCard(
  card: Partial<Card> | null | undefined,
  templateOverride?: CardTemplate
): Partial<Card> {
  const effectiveTemplate = (templateOverride || card?.template || "premium") as CardTemplate;
  const hasHolderName = Boolean(
    nonEmptyString(card?.firstName) || nonEmptyString(card?.lastName)
  );

  if (hasHolderName && card) {
    return {
      ...card,
      id: card.id || "preview_card",
      slug: nonEmptyString(card.slug) || "apercu",
      dominantColor: card.dominantColor || "black",
      template: effectiveTemplate,
      viewsCount: typeof card.viewsCount === "number" ? card.viewsCount : 207,
      contactClicks: typeof card.contactClicks === "number" ? card.contactClicks : 60,
    };
  }

  const preset = getTemplateDemoPreset(effectiveTemplate);
  const cardSocials =
    card?.socials && typeof card.socials === "object"
      ? (card.socials as Record<string, string>)
      : {};
  const presetSocials =
    preset.socials && typeof preset.socials === "object"
      ? (preset.socials as Record<string, string>)
      : {};

  return {
    ...preset,
    id: card?.id || preset.id || "preview_card",
    slug: nonEmptyString(card?.slug) || preset.slug || "apercu",
    firstName: nonEmptyString(card?.firstName) || preset.firstName,
    lastName: nonEmptyString(card?.lastName) || preset.lastName,
    title: nonEmptyString(card?.title) || preset.title,
    company: nonEmptyString(card?.company) || preset.company,
    logoUrl: nonEmptyString(card?.logoUrl) || preset.logoUrl,
    avatarUrl: nonEmptyString(card?.avatarUrl) || preset.avatarUrl,
    phone: nonEmptyString(card?.phone) || preset.phone,
    whatsapp: nonEmptyString(card?.whatsapp) || preset.whatsapp,
    email: nonEmptyString(card?.email) || preset.email,
    website: nonEmptyString(card?.website) || preset.website,
    address: nonEmptyString(card?.address) || preset.address,
    bio: nonEmptyString(card?.bio) || preset.bio,
    dominantColor: card?.dominantColor || preset.dominantColor || "black",
    template: effectiveTemplate,
    socials: {
      ...presetSocials,
      ...Object.fromEntries(
        Object.entries(cardSocials).filter(([, val]) => typeof val === "string" && val.trim().length > 0)
      ),
    },
    viewsCount: typeof card?.viewsCount === "number" ? card.viewsCount : 207,
    contactClicks: typeof card?.contactClicks === "number" ? card.contactClicks : 60,
  };
}
