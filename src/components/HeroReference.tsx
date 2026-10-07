"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, Sparkles, Shield, QrCode } from "lucide-react";

export default function HeroReference() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 12,
      y: (x / (rect.width / 2)) * 12,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-black text-white pt-8 pb-14 border-b border-neutral-900">
      {/* Cinematic Misty Volcanic Landscape Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-landscape.jpg"
          alt="Atmosphère minérale Asuka Card"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-screen"
        />
        {/* Gradient overlays to create depth and seamless pure black borders */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/90" />
      </div>

      {/* Top micro bar / Trust badge */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-[11px] font-medium text-neutral-300">
          <span className="flex items-center text-amber-400">★★★★★</span>
          <span className="text-neutral-400">·</span>
          <span>Noté 4.9/5 par plus de 2,500 professionnels</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs text-neutral-400 font-mono tracking-wider uppercase">
          <span>Technologie NFC NXP</span>
          <span className="text-neutral-700">|</span>
          <span>100% Sans Application</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Typography & CTAs */}
        <div className="lg:col-span-6 space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-400 block">
              L&apos;expérience sans friction
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.04]">
              Partagez tout.
              <br />
              <span className="text-neutral-400">Sans application.</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed pt-2">
              Approchez votre carte physique d&apos;un smartphone pour transmettre instantanément
              votre profil professionnel, vos coordonnées complètes et votre catalogue.
              Zéro papier, zéro saisie manuelle.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg active:scale-95"
            >
              <span>Commander votre carte</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/richard-odjrado"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 text-xs font-medium tracking-wider uppercase transition-all"
            >
              <span>Voir un profil live</span>
            </Link>
          </div>

          {/* Badges / Micro specs */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-900 max-w-md">
            <div>
              <div className="text-xs font-bold text-white font-mono">0.2s</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                Vitesse de détection
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">100%</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                iOS & Android
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">À vie</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                Sans abonnement
              </div>
            </div>
          </div>
        </div>

        {/* Center / Right: 3D Floating Physical Card */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer select-none py-4 [perspective:1400px]"
          >
            {/* Smooth floating levitation */}
            <div className="animate-hero-card flex items-center justify-center">
              <div
                style={{
                  transform: `rotateX(${10 + tilt.x}deg) rotateY(${-16 + tilt.y}deg) rotateZ(3deg) ${
                    isHovered ? "scale(1.04)" : "scale(1)"
                  }`,
                  transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
                  transformStyle: "preserve-3d",
                }}
                className="relative flex items-center justify-center drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/black-card-front.png"
                  alt="Carte Asuka Card Édition Noir Obsidienne"
                  className="w-[280px] sm:w-[340px] md:w-[400px] h-auto object-contain select-none pointer-events-none rounded-xl"
                  draggable={false}
                />
              </div>
            </div>

            {/* Subtle physical contact shadow under card */}
            <div className="w-48 sm:w-64 h-5 bg-black/80 blur-xl rounded-full mx-auto -mt-2 animate-hero-shadow pointer-events-none" />
          </div>

          {/* Floating Minimalist QR Card - Exact replica of XPlace bottom-right badge */}
          <div className="mt-8 lg:mt-0 lg:absolute lg:bottom-0 lg:right-0 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-2xl flex items-center gap-3.5 max-w-xs backdrop-blur-md">
            <div className="w-16 h-16 bg-white rounded-lg p-1 shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/qr/qr-richard-odjrado.png"
                alt="QR Code de test Asuka Card"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                Démo immédiate
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-tight">
                Scannez pour tester
              </div>
              <p className="text-[10px] text-neutral-400 leading-tight">
                Pointez l&apos;appareil photo pour ouvrir la fiche contact native.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Logos / Partners & Capabilities */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full border-t border-neutral-900/80 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-neutral-500 text-xs font-mono">
          <span className="uppercase tracking-widest text-[10px] text-neutral-400">
            Protocole & Compatibilité universelle
          </span>
          <div className="flex items-center gap-6 sm:gap-8 opacity-75">
            <span className="hover:text-neutral-300 transition-colors">APPLE iOS 13+</span>
            <span className="hover:text-neutral-300 transition-colors">ANDROID NFC</span>
            <span className="hover:text-neutral-300 transition-colors">VCARD 3.0</span>
            <span className="hover:text-neutral-300 transition-colors">ISO 14443A</span>
          </div>
        </div>
      </div>
    </section>
  );
}
