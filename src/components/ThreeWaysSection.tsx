"use client";

import React, { useState } from "react";
import { ArrowRight, Radio, QrCode, UserCheck, Sparkles, Smartphone } from "lucide-react";

export default function ThreeWaysSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Effleurez le haut du smartphone (NFC)",
      desc: "Approchez simplement la carte du récepteur sans contact. Le Dynamic Island de l'iPhone 16 Pro annonce instantanément la détection du profil sans aucune application.",
      badge: "Détection native < 0.2s",
    },
    {
      num: "02",
      title: "Scannez le QR Code haute précision",
      desc: "Pivotez la carte pour présenter le verso. Gravé au laser avec une précision micronique, le QR code dynamique doré est lisible par 100% des appareils photo iOS & Android.",
      badge: "Gravure laser inaltérable",
    },
    {
      num: "03",
      title: "Enregistrez le contact en un clic (vCard)",
      desc: "La fiche profil s'affiche dans le navigateur. Votre interlocuteur clique sur « Ajouter aux contacts » et vos coordonnées complètes intègrent directement son carnet.",
      badge: "Format universel vCard 3.0",
    },
  ];

  return (
    <section id="usages" className="py-24 sm:py-36 bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Subtitle - Exact replica of the reference screenshot */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <span className="text-xs font-mono uppercase tracking-[0.24em] text-[#FF6B00] font-bold block">
              Comment ça marche
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Trois façons.
              <br />
              <span className="text-neutral-400">Zéro friction.</span>
            </h2>

            <div className="pt-2 space-y-2 text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed">
              <p>Aucune application à télécharger pour vous ni pour votre interlocuteur.</p>
              <p>Échange instantané, pérenne et compatible avec 100% des smartphones.</p>
            </div>

            {/* Asuka Brand Highlights */}
            <div className="pt-6 border-t border-neutral-800/80 space-y-3 max-w-sm">
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                <span>Puce NFC NXP NTAG216 haute puissance</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                <span>Gravure laser micronique inaltérable</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                <span>Export vCard 3.0 automatique en 1 clic</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion Cards */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;

              if (isActive) {
                // Active Expanded Card (Luxury Dark)
                return (
                  <div
                    key={step.num}
                    className="rounded-[28px] sm:rounded-[32px] p-7 sm:p-10 bg-[#121214] text-white border border-neutral-800/90 shadow-2xl transition-all duration-500 overflow-hidden space-y-6"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30 text-[11px] font-mono font-bold uppercase tracking-wider">
                          <span>Étape {step.num}</span>
                          <span>·</span>
                          <span>{step.badge}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl pt-1">
                          {step.desc}
                        </p>
                      </div>

                      <span className="text-xs font-mono font-bold text-neutral-500 hidden sm:block shrink-0 pt-1">
                        {step.num} / 03
                      </span>
                    </div>

                    {/* Frame containing the real system assets (NO scroll animation, static crisp framing) */}
                    <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-neutral-800/80 shadow-inner relative aspect-[4/3] flex items-center justify-center">
                      {/* STEP 1: Hand holding iPhone 16 Pro with Dynamic Island notification announcement */}
                      {activeStep === 0 && (
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black select-none">
                          {/* Real system image: hand holding iPhone 16 Pro */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/images/hand-phone-clean.png"
                            alt="Main tenant l'iPhone 16 Pro avec détection sans contact Asuka Card"
                            className="w-[115%] max-w-none h-auto object-contain translate-x-12 translate-y-12 drop-shadow-2xl select-none pointer-events-none"
                            draggable={false}
                          />

                          {/* Dynamic Island Announce Banner on top of iPhone 16 Pro */}
                          <div className="absolute top-6 left-6 sm:left-10 bg-black/90 backdrop-blur-xl border border-neutral-700/80 rounded-2xl p-3 sm:p-4 shadow-2xl flex items-center gap-3.5 max-w-xs animate-in fade-in zoom-in-95 duration-300">
                            {/* Dynamic Island Pill Icon */}
                            <div className="w-10 h-10 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center shrink-0 shadow-md">
                              <Radio className="w-5 h-5 text-white animate-pulse" />
                            </div>

                            <div className="space-y-0.5 pr-2">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
                                  Dynamic Island
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              </div>
                              <div className="text-xs sm:text-sm font-bold text-white tracking-tight">
                                Asuka Card Détectée
                              </div>
                              <p className="text-[11px] text-neutral-300 leading-tight">
                                Richard Odjrado · Toucher pour ouvrir
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STEP 2: Real Asuka Card with Gold Laser QR Code from the system */}
                      {activeStep === 1 && (
                        <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black select-none">
                          <div className="relative flex flex-col items-center justify-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] max-w-xs sm:max-w-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/images/black-card-back.png"
                              alt="Carte Asuka Card verso avec QR Code laser Richard Odjrado"
                              className="w-full h-auto object-contain rounded-xl select-none pointer-events-none"
                              draggable={false}
                            />

                            {/* Camera scanner reticle overlay */}
                            <div className="absolute inset-0 border-2 border-dashed border-[#FF6B00]/40 rounded-xl pointer-events-none flex items-center justify-center">
                              <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#FF6B00]/50 text-white text-xs font-mono flex items-center gap-2 shadow-lg">
                                <QrCode className="w-4 h-4 text-[#FF6B00]" />
                                <span>Lecture laser micronique instantanée</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* STEP 3: Real vCard Digital Contact Sheet */}
                      {activeStep === 2 && (
                        <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black select-none">
                          <div className="w-full max-w-sm bg-neutral-900/90 border border-neutral-700/80 rounded-2xl p-6 shadow-2xl text-left space-y-4 backdrop-blur-md">
                            <div className="flex items-center gap-3.5">
                              <div className="w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold text-base shadow-md">
                                RO
                              </div>
                              <div className="space-y-0.5">
                                <div className="text-sm font-bold text-white tracking-tight">
                                  Richard Odjrado
                                </div>
                                <div className="text-xs text-neutral-400">
                                  CEO chez AS WORLD TECH
                                </div>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-neutral-800 space-y-2 text-xs text-neutral-300 font-mono">
                              <div className="flex items-center justify-between">
                                <span className="text-neutral-500">Téléphone</span>
                                <span>+33 6 12 34 56 78</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-neutral-500">Email</span>
                                <span>contact@asukacard.com</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-neutral-500">Format</span>
                                <span className="text-[#FF6B00]">vCard 3.0 Natif</span>
                              </div>
                            </div>

                            <div className="pt-2">
                              <button className="w-full py-3 bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold text-xs uppercase tracking-wider text-center rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2">
                                <UserCheck className="w-4 h-4" />
                                <span>Ajouter aux contacts</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // Inactive Card (Sleek dark bar, click to switch)
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className="rounded-[20px] sm:rounded-[24px] px-6 sm:px-8 py-5 sm:py-6 bg-[#121215] hover:bg-[#18181D] border border-neutral-800/80 hover:border-neutral-700 cursor-pointer transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-xs font-mono font-bold text-neutral-500 group-hover:text-[#FF6B00] transition-colors">
                      {step.num}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-neutral-100 transition-colors">
                      {step.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      Afficher
                    </span>
                    <div className="w-8 h-8 rounded-full bg-neutral-800 group-hover:bg-[#FF6B00] group-hover:text-white text-neutral-400 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
