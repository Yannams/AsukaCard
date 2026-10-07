"use client";

import React, { useState } from "react";
import { Radio, QrCode, UserCheck, ArrowRight } from "lucide-react";

export default function HowItWorksSteps() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Effleurez le haut du smartphone (NFC)",
      desc: "Approchez simplement votre carte physique du haut du téléphone. La puce NFC intégrée émet un signal sécurisé capté en moins de 0.2 seconde, sans réveiller d'application tierce.",
      badge: "Détection native < 0.2s",
      icon: Radio,
    },
    {
      num: "02",
      title: "Scannez le QR Code haute précision",
      desc: "Pivotez la carte pour présenter le verso. Gravé au laser avec une précision micronique, le QR Code dynamique est 100% lisible par tous les appareils photo iOS et Android, même sans NFC.",
      badge: "Secours universel 100%",
      icon: QrCode,
    },
    {
      num: "03",
      title: "Enregistrez le contact en un clic (vCard)",
      desc: "La fiche profil s'ouvre directement dans le navigateur avec vos numéros, WhatsApp, email, réseaux sociaux et catalogue. Un simple clic sur « Ajouter aux contacts » intègre votre identité au répertoire.",
      badge: "Standard vCard 3.0",
      icon: UserCheck,
    },
  ];

  return (
    <section id="usages" className="py-24 sm:py-32 bg-black text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Stepper */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-400 block">
                Fonctionnement fluide
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                Trois gestes.
                <br />
                <span className="text-neutral-400">Zéro application.</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-lg">
                Aucune application à télécharger pour vous, aucune application à installer pour votre interlocuteur.
                L&apos;échange se fait de manière native et instantanée.
              </p>
            </div>

            {/* Stepper items */}
            <div className="space-y-4 pt-2">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;
                const Icon = s.icon;
                return (
                  <div
                    key={s.num}
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer rounded-2xl p-6 transition-all border ${
                      isActive
                        ? "bg-neutral-900/90 border-neutral-700 shadow-xl"
                        : "bg-neutral-950/40 border-neutral-800/80 hover:bg-neutral-900/40 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-neutral-800 text-neutral-400"
                        }`}
                      >
                        {s.num}
                      </div>

                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                            {s.title}
                          </h3>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                              isActive
                                ? "bg-neutral-800 text-neutral-200"
                                : "text-neutral-400"
                            }`}
                          >
                            {s.badge}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Realistic Visual for the Active Step */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 min-h-[440px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Context indicator */}
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-400 pb-4 border-b border-neutral-800/80">
                <span>Démonstration visuelle</span>
                <span>Étape {steps[activeStep].num}/03</span>
              </div>

              {/* Dynamic Step Display */}
              <div className="py-8 flex flex-col items-center justify-center my-auto">
                {activeStep === 0 && (
                  <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in duration-300">
                    <div className="relative w-48 sm:w-56 h-auto drop-shadow-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/hand-phone-scan-top.png"
                        alt="Effleurement NFC Asuka Card"
                        className="w-full h-auto object-contain rounded-2xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                        Signal NFC instantané
                      </div>
                      <div className="text-xs text-neutral-400 max-w-xs">
                        Notification pop-up native immédiate sur l&apos;écran d&apos;accueil du destinataire.
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in duration-300">
                    <div className="relative w-52 sm:w-64 drop-shadow-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/black-card-back.png"
                        alt="Verso Asuka Card avec QR Code laser"
                        className="w-full h-auto object-contain rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                        Gravure laser micronique
                      </div>
                      <div className="text-xs text-neutral-400 max-w-xs">
                        QR Code inaltérable, lisible même sous faible luminosité par n&apos;importe quelle caméra.
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="flex flex-col items-center text-center space-y-5 animate-in fade-in duration-300 w-full">
                    {/* Simulated native iOS/Android vCard prompt */}
                    <div className="w-full max-w-xs bg-neutral-900 border border-neutral-700/80 rounded-2xl p-5 shadow-2xl text-left space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
                          RO
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Richard Odjrado</div>
                          <div className="text-[10px] text-neutral-400">Fondateur & CEO · ASUKA</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-800 space-y-1.5 text-[11px] text-neutral-300 font-mono">
                        <div>📞 +33 6 12 34 56 78</div>
                        <div>✉️ contact@asukacard.com</div>
                        <div>🌐 https://asukacard.com</div>
                      </div>

                      <div className="pt-2">
                        <div className="w-full py-2 bg-white text-black font-semibold text-xs text-center rounded-lg shadow-sm">
                          ✓ Ajouter aux contacts (vCard)
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-neutral-400 max-w-xs">
                      Enregistrement instantané avec photo, numéros, réseaux et liens directs.
                    </div>
                  </div>
                )}
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center justify-center gap-2 pt-4 border-t border-neutral-800/80">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      activeStep === idx ? "w-8 bg-white" : "w-2 bg-neutral-700 hover:bg-neutral-500"
                    }`}
                    aria-label={`Aller à l'étape ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
