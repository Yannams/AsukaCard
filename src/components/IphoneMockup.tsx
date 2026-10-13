"use client";

import React from "react";
import { Wifi, Lock, RotateCw } from "lucide-react";

interface IphoneMockupProps {
  children: React.ReactNode;
  className?: string;
  slug?: string;
  showSafariBar?: boolean;
  dark?: boolean;
}

export default function IphoneMockup({
  children,
  className = "",
  slug,
  showSafariBar = true,
  dark = false,
}: IphoneMockupProps) {
  const displayUrl = slug ? `asukacard.com/${slug}` : "asukacard.com/demo";

  return (
    <div className={`relative mx-auto select-none ${className}`}>
      {/* 
        Châssis iPhone 16 Pro :
        Ratio exact de l'image (2070 x 4212 = 0.49145).
        Dimensions explicites pour garantir un affichage infaillible sans effondrement de hauteur.
      */}
      <div className="relative w-[310px] h-[631px] sm:w-[345px] sm:h-[702px] md:w-[360px] md:h-[733px] drop-shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
        
        {/* ================= ÉCRAN INTERNE (CALIBRÉ DANS LA DÉCOUPE TRANSPARENTE) ================= */}
        {/*
          Coordonnées réelles mesurées dans le cadre : left: 5.46% | right: 5.36% | top: 2.33% | bottom: 2.26%
        */}
        <div
          className={`absolute top-[2.33%] bottom-[2.26%] left-[5.46%] right-[5.36%] rounded-[36px] sm:rounded-[42px] overflow-hidden ${
            dark ? "bg-[#111111]" : "bg-white"
          } z-10 shadow-inner`}
        >
          {/* ================= CONTENU DE LA PAGE : FAIT DIRECTEMENT LE FOND (TOP 0 JUSQU'EN BAS) ================= */}
          {/*
            Le contenu (la bannière et le profil) commence tout en haut (top: 0).
            Il n'y a AUCUN fond artificiel sous le notch ni sous le réseau : le contenu de la carte
            constitue le fond lui-même et s'étend jusqu'au bas de l'écran.
          */}
          <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-none z-10 pb-12">
            {children}
          </div>

          {/* ================= BARRE DE STATUT iOS FLOTTANTE (AUCUN FOND PROPRE) ================= */}
          {/*
            Totalement transparente : 9:41, réseau, wifi et batterie flottent directement
            sur la bannière / le visuel de la carte qui passe en dessous.
          */}
          <div
            className={`absolute top-0 inset-x-0 h-10 sm:h-11 pointer-events-none z-20 flex items-center justify-between px-6 pt-1 select-none bg-transparent ${
              dark ? "text-white" : "text-neutral-900"
            }`}
          >
            {/* Heure iOS */}
            <span className="text-[12px] sm:text-[13px] font-semibold tracking-tight font-sans pl-1">
              9:41
            </span>

            {/* Espace central libre pour le Dynamic Island matériel de l'image cadre */}
            <div className="w-24 sm:w-28 h-6 pointer-events-none" />

            {/* Réseau & Batterie iOS flottants sans aucun fond */}
            <div className="flex items-center gap-1.5 pr-1">
              {/* Barres de réseau cellulaire 4 barres */}
              <div className="flex items-end gap-[1.5px] h-3">
                <div className={`w-[2.5px] h-1 ${dark ? "bg-white" : "bg-neutral-900"} rounded-[0.5px]`} />
                <div className={`w-[2.5px] h-1.5 ${dark ? "bg-white" : "bg-neutral-900"} rounded-[0.5px]`} />
                <div className={`w-[2.5px] h-2 ${dark ? "bg-white" : "bg-neutral-900"} rounded-[0.5px]`} />
                <div className={`w-[2.5px] h-2.5 ${dark ? "bg-white" : "bg-neutral-900"} rounded-[0.5px]`} />
              </div>

              {/* Wi-Fi */}
              <Wifi className={`w-3.5 h-3.5 ${dark ? "text-white" : "text-neutral-900"} stroke-[2.2]`} />

              {/* Batterie iOS */}
              <div
                className={`w-5 h-2.5 border ${
                  dark ? "border-white/90" : "border-neutral-900"
                } rounded-[3px] p-[1px] flex items-center relative`}
              >
                <div className="h-full w-full bg-emerald-500 rounded-[1.5px]" />
                <div
                  className={`absolute -right-[2.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-1 ${
                    dark ? "bg-white/90" : "bg-neutral-900"
                  } rounded-r-[0.5px]`}
                />
              </div>
            </div>
          </div>

          {/* ================= BARRE SAFARI iOS FLOTTANTE EN BAS ================= */}
          {showSafariBar && (
            <div
              className={`absolute bottom-0 inset-x-0 z-20 px-3 pb-2 pt-1.5 backdrop-blur-md border-t flex flex-col items-center gap-1 ${
                dark
                  ? "bg-[#141416]/95 border-white/10 text-white"
                  : "bg-[#f9f9fb]/95 border-black/5 text-neutral-800"
              }`}
            >
              <div
                className={`w-full h-7 sm:h-8 px-2.5 sm:px-3 rounded-full border flex items-center justify-between text-[10px] sm:text-[11px] ${
                  dark
                    ? "bg-neutral-900 border-white/10 text-neutral-200"
                    : "bg-white border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-neutral-700"
                }`}
              >
                <span className="font-serif font-bold text-[9px] sm:text-[10px] opacity-60 tracking-tighter">
                  aA
                </span>
                <div className="flex items-center gap-1 font-medium truncate max-w-[160px] sm:max-w-[190px]">
                  <Lock className="w-2.5 h-2.5 opacity-50 shrink-0" />
                  <span className="truncate">{displayUrl}</span>
                </div>
                <RotateCw className="w-2.5 h-2.5 opacity-50" />
              </div>

              {/* Barre d'accueil Home Indicator iOS */}
              <div
                className={`w-28 sm:w-32 h-1 rounded-full mt-1 mb-0.5 ${
                  dark ? "bg-white/50" : "bg-neutral-900/60"
                }`}
              />
            </div>
          )}

          {!showSafariBar && (
            <div className="absolute bottom-1.5 inset-x-0 pointer-events-none z-20 flex items-center justify-center">
              <div
                className={`w-28 sm:w-32 h-1 rounded-full ${
                  dark ? "bg-white/40" : "bg-neutral-900/40"
                }`}
              />
            </div>
          )}
        </div>

        {/* ================= CADRE PHOTO-RÉALISTE IPHONE 16 PRO ================= */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source srcSet="/images/iphone-mockup.webp" type="image/webp" />
          <img
            src="/images/iphone-mockup.png"
            alt="Cadre iPhone 16 Pro"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none z-30 select-none"
            draggable={false}
          />
        </picture>

        {/* Reflet de verre supérieur diagonal */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent z-40 rounded-[50px]" />
      </div>
    </div>
  );
}
