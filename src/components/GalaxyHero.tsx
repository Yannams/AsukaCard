"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import InteractiveCard from "./InteractiveCard";
import ParticleWave from "./ParticleWave";

/** Hero façon Apple Pay : fond clair, titre massif centré, produit en vedette. */
export default function GalaxyHero() {
  return (
    <div data-hero-pin className="relative h-[220vh] bg-black -mt-14">
      <section
        style={{ height: "100vh" }}
        className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-black pt-20 pb-10 text-white sm:pt-24 sm:pb-12"
      >
        {/* Vague de particules animées en arrière-plan avec révélation fluide */}
      <div className="animate-hero-wave absolute inset-0 pointer-events-none">
        <ParticleWave />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
        <h1 className="text-5xl font-semibold leading-[1.12] tracking-[-0.035em] text-white sm:text-7xl lg:text-[88px]">
          <span className="block animate-hero-title">
            Votre identité.
          </span>
          <span className="block mt-1 pb-3 sm:pb-4 animate-hero-gradient bg-gradient-to-r from-[#FF6B00] via-[#FF9A4D] to-[#FFB347] bg-clip-text text-transparent">
            En un geste.
          </span>
        </h1>

        <div className="animate-hero-actions mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:mt-8">
          <Link
            href="#commander"
            className="rounded-full bg-[#FF6B00] px-6 py-3 text-base font-medium text-white shadow-lg shadow-[#FF6B00]/25 transition hover:bg-[#E55F00] active:scale-95"
          >
            Commander
          </Link>
          <Link
            href="/richard-odjrado"
            className="group inline-flex items-center text-base font-medium text-[#FF8533] hover:text-[#FFA366] transition"
          >
            Voir un profil en direct
            <ChevronRight className="h-4 w-4 ml-0.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-8 w-full max-w-5xl px-4 sm:mt-12">
        <div className="relative flex justify-center pb-4 pt-2 sm:pb-8">
          <InteractiveCard
            front="/images/black-card-front.png"
            back="/images/black-card-back.png"
            alt="Carte NFC Asuka Card noire"
            flipOnScroll={true}
            launchAnimation={true}
            className="w-[290px] sm:w-[460px] lg:w-[560px]"
          />
        </div>
      </div>
    </section>
  </div>
);
}
