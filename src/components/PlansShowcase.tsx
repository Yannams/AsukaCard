"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function PlansShowcase() {
  const plans = [
    {
      name: "Édition Essentiel",
      finish: "Noir Obsidienne Soft-Touch",
      price: "49 €",
      period: "Paiement unique · À vie",
      badge: "Indépendants",
      highlight: false,
      features: [
        "1 Carte physique NFC Noir Soft-Touch",
        "Puce NXP haute puissance intégrée",
        "Profil digital complet & URL unique personnalisée",
        "QR Code dynamique au verso",
        "Mises à jour des coordonnées illimitées à vie",
        "Export vCard 3.0 automatique en 1 clic",
        "Garantie matérielle 10 ans",
      ],
      cta: "Commander cette édition",
      link: "/dashboard",
    },
    {
      name: "Édition Signature",
      finish: "Blanc Céramique ou Métal",
      price: "79 €",
      period: "Paiement unique · À vie",
      badge: "Le plus plébiscité",
      highlight: true,
      features: [
        "1 Carte physique Blanc Céramique ou Métal lourd",
        "Gravure laser haute précision de votre nom & logo",
        "Profil digital haut de gamme personnalisé",
        "Statistiques détaillées de consultations",
        "Partage de catalogue PDF, WhatsApp & prise de RDV",
        "QR Code laser haute définition inaltérable",
        "Support prioritaire & expédition suivie 48h",
      ],
      cta: "Choisir l'Édition Signature",
      link: "/dashboard",
    },
    {
      name: "Flotte Entreprise",
      finish: "Personnalisation sur-mesure",
      price: "Sur devis",
      period: "À partir de 5 collaborateurs",
      badge: "Entreprises & Cabinets",
      highlight: false,
      features: [
        "Lot de cartes physiques adaptées à votre charte",
        "Console d'administration centralisée pour la direction",
        "Attribution et révocation instantanée des profils",
        "Contrôle de marque et modèles imposés",
        "Facturation centralisée et devis dédié",
        "Interlocuteur dédié et accompagnement au déploiement",
        "Garantie remplacement express",
      ],
      cta: "Demander un devis flotte",
      link: "/dashboard",
    },
  ];

  return (
    <section id="tarifs" className="py-24 sm:py-36 bg-black text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-neutral-400 block">
            Gammes & Tarifs
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Choisissez votre niveau d&apos;excellence.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Une seule acquisition matérielle. Vos coordonnées restent modifiables à volonté sans aucun abonnement récurrent imposé.
          </p>
        </div>

        {/* 3 Tier Cards Grid - Exact clean structure from XPlace Plans 00:27 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all border ${
                p.highlight
                  ? "bg-neutral-900 border-neutral-600 shadow-2xl relative"
                  : "bg-neutral-950/80 border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider shadow-md">
                  {p.badge}
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      {p.finish}
                    </span>
                    {!p.highlight && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {p.name}
                  </h3>
                </div>

                {/* Price block */}
                <div className="pt-2 pb-4 border-b border-neutral-800 space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                    {p.price}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {p.period}
                  </div>
                </div>

                {/* Features list */}
                <ul className="space-y-3.5 pt-2">
                  {p.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                      <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-8 border-t border-neutral-800/80">
                <Link
                  href={p.link}
                  className={`w-full py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    p.highlight
                      ? "bg-white hover:bg-neutral-200 text-black shadow-lg"
                      : "bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800"
                  }`}
                >
                  <span>{p.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
