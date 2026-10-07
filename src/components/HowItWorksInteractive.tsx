"use client";

import React, { useEffect, useState } from "react";
import { Nfc, QrCode, Smartphone } from "lucide-react";

const steps = [
  {
    icon: Nfc,
    title: "Approchez",
    text: "Posez la carte contre n'importe quel smartphone. La détection est quasi instantanée.",
  },
  {
    icon: Smartphone,
    title: "Recevez",
    text: "Votre profil s'ouvre directement, sans application ni compte à créer.",
  },
  {
    icon: QrCode,
    title: "Enregistrez",
    text: "Un geste suffit pour ajouter la fiche contact complète au répertoire.",
  },
];

const DURATION = 4500;

/** Section sombre façon Apple Pay : étapes à gauche, iPhone animé à droite. */
export default function HowItWorksInteractive() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % steps.length), DURATION);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <div
      className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Étapes */}
      <ol className="space-y-2">
        {steps.map(({ icon: Icon, title, text }, i) => {
          const on = i === active;
          return (
            <li key={title}>
              <button
                onClick={() => setActive(i)}
                className={`group relative w-full overflow-hidden rounded-[1.75rem] p-6 text-left transition-all duration-500 sm:p-8 ${
                  on ? "bg-[#1d1d1f]" : "bg-transparent hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-start gap-5">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                      on ? "bg-[#FF6B00] text-white" : "bg-white/10 text-[#86868b]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`text-2xl font-semibold tracking-tight transition-colors duration-500 sm:text-3xl ${
                        on ? "text-[#f5f5f7]" : "text-[#6e6e73]"
                      }`}
                    >
                      {title}
                    </h3>
                    <div
                      className={`grid transition-all duration-500 ${
                        on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden text-base leading-relaxed text-[#a1a1a6]">
                        {text}
                      </p>
                    </div>
                  </div>
                </div>
                {on && (
                  <span
                    key={`${active}-${paused}`}
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#FF6B00] ${paused ? "w-full" : "step-progress"}`}
                    style={{ animationDuration: `${DURATION}ms` }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Scène */}
      <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
        <div aria-hidden className="glow-ember absolute inset-0 opacity-40" />

        {/* Ondes NFC */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            active === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          {[0, 1, 2].map((r) => (
            <span
              key={r}
              className="nfc-ring absolute h-40 w-40 rounded-full border border-[#FF6B00]/60"
              style={{ animationDelay: `${r * 0.8}s` }}
            />
          ))}
        </div>

        {/* Téléphone */}
        <div className="relative z-10 h-[360px] w-[190px] rounded-[2.4rem] border border-white/20 bg-[#1d1d1f] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
          <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-black">
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-500 ${
                active === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                aria-hidden
                className="pay-glow absolute -top-10 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-[#FF6B00]/50 blur-2xl"
              />
              <Nfc className="h-10 w-10 text-white" />
              <span className="text-xs font-medium text-[#f5f5f7]">
                Approchez de l&apos;appareil
              </span>
            </div>
            <div
              className={`absolute inset-0 flex flex-col items-center px-5 pt-12 transition-all duration-500 ${
                active === 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF9A4D]" />
              <div className="mt-4 h-3 w-24 rounded-full bg-white/80" />
              <div className="mt-2 h-2 w-16 rounded-full bg-white/30" />
              <div className="mt-8 w-full space-y-2">
                {[0, 1, 2].map((l) => (
                  <div key={l} className="h-9 rounded-xl bg-white/[0.08]" />
                ))}
              </div>
            </div>
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
                active === 2 ? "opacity-100" : "opacity-0"
              }`}
            >
              {active === 2 && (
                <svg viewBox="0 0 64 64" className="h-20 w-20" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="32" cy="32" r="28" strokeWidth="3" className="pay-check-circle stroke-[#FF6B00]" />
                  <path d="M20 33 l9 9 l16 -19" strokeWidth="4" className="pay-check-mark stroke-white" />
                </svg>
              )}
              <span className="text-sm font-medium text-[#f5f5f7]">Terminé</span>
              <span className="text-[10px] text-[#a1a1a6]">Contact enregistré</span>
            </div>
          </div>
        </div>

        {/* Carte qui tape le téléphone */}
        <div
          aria-hidden
          className={`absolute z-20 w-44 transition-all duration-[1200ms] ease-[cubic-bezier(0.3,0.8,0.2,1)] ${
            active === 0 ? "left-[12%] top-[52%] opacity-100" : "left-[30%] top-[78%] opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/black-card-front.png"
            alt=""
            draggable={false}
            className={`w-full ${active === 0 ? "pay-card-tap" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}
