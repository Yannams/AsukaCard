"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, Sparkles } from "lucide-react";

export default function MaterialShowcase() {
  const [edition, setEdition] = useState<"black" | "white">("black");

  return (
    <section id="materiaux" className="relative py-24 sm:py-36 bg-neutral-900 text-white overflow-hidden border-b border-neutral-800">
      {/* Soft Ethereal Silver/White Mist Landscape Background from XPlace 00:17 */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mist-light-landscape.jpg"
          alt="Brume argentée Asuka Card"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-neutral-400 block">
            Ingénierie & Matériaux
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Une carte. Deux éditions.
            <br />
            <span className="text-neutral-400">Choisissez votre signature.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Façonnée avec la même exigence qu&apos;une carte bancaire privée.
            Une présence physique noble qui marque durablement vos interlocuteurs.
          </p>

          {/* Central Pill Switcher - Direct from XPlace reference */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center p-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 shadow-xl backdrop-blur-md">
              <button
                onClick={() => setEdition("black")}
                className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  edition === "black"
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Noir Obsidienne
              </button>
              <button
                onClick={() => setEdition("white")}
                className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  edition === "white"
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Blanc Céramique
              </button>
            </div>
          </div>
        </div>

        {/* Central Card Display with Left & Right Technical Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6">
          {/* Left Specifications */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1 text-left lg:text-right">
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Finition de surface
              </div>
              <div className="text-sm font-bold text-white">
                {edition === "black" ? "Noir Mat Soft-Touch" : "Céramique Pure Micro-polie"}
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {edition === "black"
                  ? "Toucher velouté soyeux insensible aux traces de doigts et aux micro-rayures."
                  : "Blancheur éclatante, réflexion douce de la lumière et pureté absolue."}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Cœur Technologique
              </div>
              <div className="text-sm font-bold text-white">Puce NXP NTAG216 Haute Puissance</div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Antenne haute fréquence amplifiée garantissant une transmission instantanée à travers toutes les coques.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Précision de marquage
              </div>
              <div className="text-sm font-bold text-white">Gravure Laser Micronique</div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Le logo et les coordonnées sont incrustés dans la matière, ineffaçables avec le temps.
              </p>
            </div>
          </div>

          {/* Central Card Mockup with Smooth Transition */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 py-4">
            <div className="relative [perspective:1400px] flex items-center justify-center">
              <div
                style={{
                  transform: "rotateX(12deg) rotateY(-14deg) rotateZ(3deg)",
                  transformStyle: "preserve-3d",
                }}
                className="relative transition-transform duration-700 hover:scale-105 drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    edition === "black"
                      ? "/images/black-card-front.png"
                      : "/images/white-card-front.png"
                  }
                  alt={`Carte Asuka Card Édition ${edition === "black" ? "Noir Obsidienne" : "Blanc Céramique"}`}
                  className="w-[290px] sm:w-[360px] md:w-[420px] h-auto object-contain rounded-xl select-none transition-all duration-500"
                  draggable={false}
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Format carte de crédit standard
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">
                85.60 × 53.98 mm · Épaisseur 0.84 mm · Poids équilibré
              </div>
            </div>
          </div>

          {/* Right Specifications */}
          <div className="lg:col-span-3 space-y-8 order-3 text-left">
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Alimentation
              </div>
              <div className="text-sm font-bold text-white">Zéro Batterie, Zéro Recharge</div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Alimentée passivement par induction lors du contact. Toujours fonctionnelle, prête à l&apos;emploi.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Durabilité physique
              </div>
              <div className="text-sm font-bold text-white">Résistance Totale Eau & Chocs IP68</div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Immersion accidentelle, pluie, torsions : votre carte est conçue pour traverser les années.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Compatibilité universelle
              </div>
              <div className="text-sm font-bold text-white">Standard ISO/IEC 14443 Type A</div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Reconnue nativement par tous les systèmes d&apos;exploitation sans aucun pilote requis.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Technical Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-base font-bold text-white font-mono">100%</div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1">
              Compatibilité smartphones
            </div>
          </div>
          <div>
            <div className="text-base font-bold text-white font-mono">0-4 cm</div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1">
              Distance de lecture optimale
            </div>
          </div>
          <div>
            <div className="text-base font-bold text-white font-mono">10 Ans</div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1">
              Garantie sur la puce NFC
            </div>
          </div>
          <div>
            <div className="text-base font-bold text-white font-mono">AES-128</div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1">
              Chiffrement des échanges
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
