"use client";

import React from "react";
import { ShieldCheck, Cpu, Smartphone, Lock, Award, HeartHandshake } from "lucide-react";

export default function StandardsTrust() {
  const standards = [
    {
      name: "NFC Forum Type 2",
      desc: "Compatibilité matérielle garantie avec 100% des lecteurs sans contact mondiaux.",
      icon: Cpu,
    },
    {
      name: "ISO / IEC 14443A",
      desc: "Standard international des cartes à puce sans contact haute fréquence (13.56 MHz).",
      icon: ShieldCheck,
    },
    {
      name: "Norme vCard 3.0",
      desc: "Format de contact universel reconnu sans conversion par Apple Contacts et Google Contacts.",
      icon: Smartphone,
    },
    {
      name: "Respect Intégral RGPD",
      desc: "Vos données restent votre propriété exclusive. Zéro traçage abusif, zéro revente tierce.",
      icon: Lock,
    },
    {
      name: "Gravure Laser Micronique",
      desc: "Inaltérable à la sueur, aux solvants usuels et aux frottements répétés en poche.",
      icon: Award,
    },
    {
      name: "Accompagnement Dédié",
      desc: "Assistance technique basée en France pour la configuration de votre profil et de votre équipe.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="py-24 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-neutral-400 block">
              Garanties & Pérennité
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Conçue selon les standards industriels les plus stricts.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed pt-2">
              Nous n&apos;avons fait aucun compromis sur la qualité des composants.
              La puce, l&apos;antenne et les finitions sont calibrées pour un usage professionnel intensif.
            </p>
          </div>

          {/* Right Standards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {standards.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-800 text-white flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      {s.name}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed pl-1">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
