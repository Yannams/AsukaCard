"use client";

import React, { useState } from "react";
import { Check, X, ShieldAlert, Sparkles } from "lucide-react";

export default function DifferenceComparison() {
  const [selectedView, setSelectedView] = useState<"both" | "paper" | "asuka">("both");

  const comparisonRows = [
    {
      metric: "LE DESTIN DU CONTACT",
      paper: "Finie à la poubelle ou au fond d'un tiroir en moins de 7 jours (88%).",
      paperBadge: "Perdu définitivement",
      asuka: "Intégrée en 1 clic dans le répertoire du smartphone avec photo et réseaux.",
      asukaBadge: "Conservé à 100%",
    },
    {
      metric: "MISE À JOUR DES COORDONNÉES",
      paper: "Obsolète au moindre changement d'adresse, de numéro ou de poste. Réimpression obligatoire.",
      paperBadge: "Figé & périssable",
      asuka: "Modifiable en temps réel depuis votre espace. Vos contacts disposent toujours d'informations à jour.",
      asukaBadge: "Synchronisé en direct",
    },
    {
      metric: "EFFORT DE SAISIE",
      paper: "Votre interlocuteur doit recopier manuellement chaque chiffre et chaque lettre.",
      paperBadge: "Friction maximale",
      asuka: "Un effleurement NFC ouvre directement votre fiche. Aucun caractère à taper.",
      asukaBadge: "Zéro friction (0.2s)",
    },
    {
      metric: "RICHESSE DU CONTENU",
      paper: "Limité à la surface étroite d'un carton de 85 x 55 mm.",
      paperBadge: "Carton statique",
      asuka: "Fiche complète : WhatsApp, LinkedIn, catalogue PDF, prise de rendez-vous, site web.",
      asukaBadge: "Profil interactif complet",
    },
    {
      metric: "IMPACT ÉCOLOGIQUE & COÛT",
      paper: "Centaines d'exemplaires jetés, gâchis de papier continu et frais récurrents.",
      paperBadge: "Déchet permanent",
      asuka: "Une seule carte physique haute résistance à vie. Aucun renouvellement requis.",
      asukaBadge: "Durable & rentable à vie",
    },
  ];

  return (
    <section id="difference" className="py-24 sm:py-32 bg-black text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-400 block">
            Le playbook · La rupture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Le papier appartient au passé.
            <br />
            <span className="text-neutral-400">Le contact instantané fait la différence.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl pt-2">
            Distribuer du papier oblige votre contact à une saisie fastidieuse.
            Asuka Card supprime toute friction : un geste, et votre présence est gravée dans son carnet d&apos;adresses.
          </p>
        </div>

        {/* Tabular Comparison Box (Exact minimal luxury structure from XPlace video) */}
        <div className="border border-neutral-800 rounded-3xl overflow-hidden bg-neutral-950/60 divide-y divide-neutral-800/80 shadow-2xl">
          {/* Table Headers */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-neutral-900/50 text-xs font-mono uppercase tracking-wider py-4 px-6 text-neutral-400">
            <div className="md:col-span-4 hidden md:block">Caractéristique</div>
            <div className="md:col-span-4 flex items-center gap-2 text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-neutral-600 inline-block" />
              <span>Carte Papier Classique</span>
            </div>
            <div className="md:col-span-4 flex items-center gap-2 text-white font-semibold">
              <span className="w-2 h-2 rounded-full bg-white inline-block" />
              <span>Asuka Card NFC</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded bg-white text-black font-bold">
                Le Standard
              </span>
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 py-6 px-6 gap-4 md:gap-6 hover:bg-neutral-900/30 transition-colors"
            >
              {/* Metric Label */}
              <div className="md:col-span-4 flex flex-col justify-center">
                <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
                  {row.metric}
                </span>
              </div>

              {/* Paper column */}
              <div className="md:col-span-4 space-y-1.5 border-l md:border-l-0 pl-3 md:pl-0 border-neutral-800">
                <div className="text-[10px] font-mono uppercase text-neutral-400 md:hidden">
                  Carte papier classique
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {row.paper}
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                  <X className="w-3 h-3 text-neutral-400" />
                  <span>{row.paperBadge}</span>
                </div>
              </div>

              {/* Asuka Card column */}
              <div className="md:col-span-4 space-y-1.5 border-l md:border-l-0 pl-3 md:pl-0 border-neutral-800 bg-neutral-900/20 md:bg-transparent -mx-2 md:mx-0 p-2 md:p-0 rounded-lg">
                <div className="text-[10px] font-mono uppercase text-neutral-300 md:hidden">
                  Asuka Card NFC
                </div>
                <div className="text-xs sm:text-sm text-neutral-100 font-medium leading-relaxed">
                  {row.asuka}
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{row.asukaBadge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
