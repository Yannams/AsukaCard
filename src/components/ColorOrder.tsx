"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import InteractiveCard from "./InteractiveCard";

const colors = [
  {
    id: "noir",
    name: "Noir mat",
    colorKey: "NOIR_MAT",
    swatch: "#0c0c0d",
    ring: "#3a3a3d",
    front: "/images/black-card-front.png",
    back: "/images/black-card-back.png",
    text: "Sobre et intemporelle. Un noir profond au toucher soft-touch.",
  },
  {
    id: "blanc",
    name: "Blanc perle",
    colorKey: "BLANC_PERLE",
    swatch: "#f2efe9",
    ring: "#c7c7cc",
    front: "/images/white-card-front.png",
    back: "/images/white-card-back.png",
    text: "Lumineuse et élégante. Un blanc nacré, fin et précis.",
  },
];

export default function ColorOrder() {
  const [i, setI] = useState(0);
  const c = colors[i];

  return (
    <div className="text-center">
      <h2 className="text-4xl font-semibold leading-[1.07] tracking-[-0.03em] text-[#1d1d1f] sm:text-6xl">
        Choisissez votre couleur.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-[#6e6e73] sm:text-xl">{c.text}</p>

      <div className="mt-12 flex justify-center">
        <InteractiveCard
          key={c.id}
          front={c.front}
          back={c.back}
          alt={`Carte Asuka ${c.name}`}
          className="w-[280px] sm:w-[420px] lg:w-[500px]"
        />
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        {colors.map((col, idx) => (
          <button
            key={col.id}
            onClick={() => setI(idx)}
            aria-label={col.name}
            aria-pressed={idx === i}
            className="group flex flex-col items-center gap-2 cursor-pointer"
          >
            <span
              className="h-9 w-9 rounded-full transition-all duration-300 group-hover:scale-110"
              style={{
                background: col.swatch,
                boxShadow:
                  idx === i
                    ? "0 0 0 2px #fff, 0 0 0 4px #FF6B00"
                    : `0 0 0 1px ${col.ring}`,
              }}
            />
            <span className={`text-xs ${idx === i ? "text-[#1d1d1f] font-bold" : "text-[#86868b]"}`}>
              {col.name}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <Link
          href={`/create?couleur=${c.id === "noir" ? "noir" : "blanc"}`}
          className="flex items-center gap-2 rounded-full bg-[#FF6B00] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#E55F00] active:scale-95 shadow-md shadow-[#FF6B00]/20 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Commander la carte {c.name.toLowerCase()}</span>
        </Link>

        <Link
          href="/jean-dupont"
          className="group inline-flex items-center text-base font-medium text-[#FF6B00] hover:underline"
        >
          Voir un exemple
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <p className="mt-4 text-xs text-[#86868b]">
        Paiement sécurisé FedaPay · Retrait direct au Showroom Asuka Spirit
      </p>
    </div>
  );
}
