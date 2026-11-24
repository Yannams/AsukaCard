import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Sparkles } from "lucide-react";
import PublicCardClient from "@/components/PublicCardClient";
import { Card } from "@/lib/db";

export const metadata: Metadata = {
  title: "Richard ODJRADO - Fondateur & CEO | Exemple Asuka Card",
  description:
    "Découvrez un exemple réel de profil digital sans contact Asuka Card : Richard ODJRADO, Fondateur & CEO chez AS WORLD TECH.",
  openGraph: {
    title: "Richard ODJRADO - Exemple Asuka Card",
    description: "Profil digital interactif sans contact Asuka Card",
    images: [{ url: "/images/richard-odjrado.jpg" }],
  },
};

const DEMO_RICHARD_CARD: Card = {
  id: "crd_demo_richard",
  userId: "usr_admin",
  slug: "richard-odjrado",
  firstName: "Richard",
  lastName: "ODJRADO",
  title: "Fondateur & CEO",
  company: "AS WORLD TECH",
  bio: "Entrepreneur & Innovateur Tech. Fondateur & CEO d'AS WORLD TECH, société créatrice de solutions technologiques souveraines et propriétaire des marques ASUKA SPIRIT, Docteur Asuka et Asuka Card.",
  avatarUrl: "/images/richard-odjrado.jpg",
  logoUrl: "",
  // Numéro professionnel générique masqué (aucun numéro personnel privé)
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
};

export default function ExemplePage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white">
      {/* Top Banner Commercial Démonstration */}
      <div className="sticky top-0 z-30 w-full bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour</span>
        </Link>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-neutral-300">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>Profil démo officiel</span>
        </div>

        <Link
          href="/commander"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-semibold shadow-md shadow-[#FF6B00]/20 transition-all active:scale-95 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Commander</span>
        </Link>
      </div>

      <main className="max-w-md mx-auto w-full">
        <PublicCardClient card={DEMO_RICHARD_CARD} />
      </main>
    </div>
  );
}
