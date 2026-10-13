// Physical NFC Card Catalog (Client-safe)

export interface CardProduct {
  id: string;
  name: string;
  badge?: string;
  material: string;
  finish: string;
  priceXOF: number;
  priceEUR: number;
  description: string;
  features: string[];
}

export const CARD_PRODUCTS: CardProduct[] = [
  {
    id: "PVC_CLASSIC",
    name: "Carte NFC Asuka Card",
    badge: "Édition Officielle",
    material: "PVC recyclable haute densité",
    finish: "Noir mat soft-touch",
    priceXOF: 15000,
    priceEUR: 23,
    description: "La carte NFC professionnelle légère, étanche et ultra résistante pour un usage intensif au quotidien.",
    features: [
      "Puce NTAG216 haute sensibilité (100k lectures)",
      "QR code dynamique imprimé au verso",
      "Compatible 100% smartphones iPhone & Android",
      "Résistant aux rayures et à l'eau (IP67)",
    ],
  },
  {
    id: "METAL_MATTE_BLACK",
    name: "Carte Métal Noir Mat Prestige",
    badge: "Bestseller",
    material: "Acier inoxydable 304 brossé (65g)",
    finish: "Noir mat profond & gravure laser argentée",
    priceXOF: 35000,
    priceEUR: 53,
    description: "Une sensation de prestige et de robustesse inégalée en main. Gravure laser haute précision.",
    features: [
      "Puce NFC furtive ultra-longue portée",
      "Gravure laser nominative au recto/verso",
      "Poids luxueux en main (65g sensation premium)",
      "Livrée dans son étui de présentation Asuka",
    ],
  },
  {
    id: "METAL_GOLD",
    name: "Carte Métal Dorée Gold Mirror",
    badge: "Exclusivité",
    material: "Acier brossé plaqué doré miroir",
    finish: "Or miroir premium haute brillance",
    priceXOF: 40000,
    priceEUR: 60,
    description: "L'élégance absolue pour les dirigeants, consultants de haut niveau et figures d'influence.",
    features: [
      "Finition miroir dorée éclatante",
      "Gravure laser de votre nom et logo",
      "Puce NFC NTAG216 haute réactivité",
      "Packaging prestige collector",
    ],
  },
  {
    id: "WOOD_BAMBOO",
    name: "Carte Bois Éco-Responsable",
    badge: "Écologique",
    material: "Bambou naturel certifié FSC",
    finish: "Bois brut poli aux huiles végétales",
    priceXOF: 25000,
    priceEUR: 38,
    description: "L'alliance parfaite de la technologie sans contact et d'un engagement environnemental fort.",
    features: [
      "100% biodégradable & sans plastique",
      "Puce NFC intégrée de manière invisible",
      "Veines de bois uniques pour chaque carte",
      "Gravure pyrogravée artisanale",
    ],
  },
];

export interface CardColorOption {
  id: string;
  name: string;
  shortName: string;
  swatch: string;
  ring: string;
  badge?: string;
  frontImage?: string;
  backImage?: string;
  description: string;
}

export const CARD_COLORS: CardColorOption[] = [
  {
    id: "NOIR_MAT",
    name: "Noir Mat Obsidienne",
    shortName: "Noir Mat",
    swatch: "#0c0c0d",
    ring: "#3a3a3d",
    badge: "Bestseller",
    frontImage: "/images/black-card-front.png",
    backImage: "/images/black-card-back.png",
    description: "Noir profond au toucher soft-touch, sobre et intemporel",
  },
  {
    id: "BLANC_PERLE",
    name: "Blanc Perle Céramique",
    shortName: "Blanc Perle",
    swatch: "#f4f3f0",
    ring: "#d6d4ce",
    badge: "Élégance",
    frontImage: "/images/white-card-front.png",
    backImage: "/images/white-card-back.png",
    description: "Blanc nacré haute pureté, finitions lisses et précises",
  },
];

