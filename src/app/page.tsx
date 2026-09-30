import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NfcCardShowcase from "@/components/NfcCardShowcase";
import CardPreview from "@/components/CardPreview";
import ParticleWave from "@/components/ParticleWave";
import ScrollUsages from "@/components/ScrollUsages";
import { getCardBySlug } from "@/lib/db";
import {
  Radio,
  QrCode,
  Smartphone,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Sliders,
  Share2,
} from "lucide-react";

export default function HomePage() {
  const georgesCard = getCardBySlug("georges-ale");
  const jeanCard = getCardBySlug("jean-dupont");
  const sophieCard = getCardBySlug("sophie-martin");
  const alexCard = getCardBySlug("alexandre-leroy");

  const demoCard = georgesCard || jeanCard;
  const demoCards = [georgesCard, sophieCard, alexCard].filter(Boolean) as NonNullable<typeof demoCard>[];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      <Navbar theme="dark" />

      {/* HERO SECTION - PURE LUXURY DEEP BLACK BACKGROUND */}
      <section className="relative h-[calc(100dvh-4rem)] min-h-[600px] flex flex-col justify-center items-center py-6 sm:py-8 overflow-hidden border-b border-neutral-800 bg-black text-white">
        {/* Animated 3D white particle wave flowing strictly in the background behind the card */}
        <ParticleWave />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center">
          <div className="text-center max-w-3xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              La carte de visite réinventée.
            </h1>
          </div>

          {/* Interactive Floating NFC Card Showcase */}
          <div className="mt-20 sm:mt-28 md:mt-36 relative z-20">
            <NfcCardShowcase />
          </div>
        </div>
      </section>

      {/* SECTION 2 : TROIS FAÇONS (SCROLL-DRIVEN EXPERIENCE) */}
      <ScrollUsages demoCard={demoCard || undefined} />

      {/* SECTION 3 : LES CARTES FLOTTANTES & MATÉRIAUX */}
      <section className="py-20 sm:py-28 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual banner of floating cards render */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-xl bg-white group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/floating-cards.jpg"
                  alt="Cartes de visite NFC Asuka flottantes avec points et finitions haut de gamme"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-900 shadow-xs">
                  Série Métal & Finition Mate
                </div>
              </div>
            </div>

            {/* Description & Finishes details */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Design & Matériaux
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] leading-tight">
                Une présence physique incomparable.
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Chaque carte physique Asuka Card est façonnée avec des matériaux rigoureusement sélectionnés. La surface texturée intègre une matrice de micro-points tactiles et une puce NFC haute fréquence pour un contact mémorable.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#111111]">
                      Noir Obsidienne & Micro-points
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Finition mate soft-touch avec motif tactile à picots. Ne retient pas les traces de doigts et résiste aux rayures du quotidien.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-neutral-200 text-[#111111] flex items-center justify-center shrink-0 text-xs font-bold">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#111111]">
                      Blanc Céramique Épuré
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Sobriété absolue, typographie fine et symbole contactless gravé avec une précision au micron.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 text-xs font-bold">
                    03
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#111111]">
                      Titane Brossé Haute Résistance
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Pour ceux qui recherchent le prestige du métal lourd et la finesse d&apos;une carte bancaire d&apos;exception.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 : GALERIE DE PROFILS DIGITAUX */}
      <section id="modeles" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Identités Visuelles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
              Découvrez les profils digitaux
            </h2>
            <p className="text-sm text-neutral-600">
              Personnalisez votre page selon votre univers : minimaliste, contrasté, exécutif ou créatif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {demoCards.map((c) => (
              <div key={c.id} className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-semibold text-neutral-900">
                    {c.firstName} {c.lastName} ({c.company})
                  </span>
                  <Link
                    href={`/${c.slug}`}
                    className="text-xs text-neutral-700 hover:text-black font-semibold underline underline-offset-4"
                  >
                    Voir la page live
                  </Link>
                </div>
                <CardPreview card={c} interactive={false} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION - N26 MONOCHROME METAL STYLE */}
      <section className="py-24 bg-[#111111] text-white relative overflow-hidden">
        {/* Dark dot pattern background */}
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300">
            <Radio className="w-3.5 h-3.5 text-white" />
            <span>Disponible dès aujourd&apos;hui en France & Europe</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Passez au networking nouvelle génération.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Créez votre page publique en moins de deux minutes, choisissez votre finition et commencez à partager vos coordonnées avec style.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-neutral-100 text-[#111111] font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
            >
              Créer ma carte gratuitement
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm border border-neutral-800 transition-all"
            >
              Accéder au tableau de bord
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
