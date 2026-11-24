"use client";

import React, { useEffect, useState } from "react";

interface LandingPreloaderProps {
  onReady: () => void;
}

/**
 * Préchargeur sobre & luxueux style Apple Keynote :
 * - Précharge l'image clé de la carte NFC en mémoire
 * - S'efface en fondu ultra-fluide dès que prêt (ou max 700ms)
 * - Déclenche la synchronisation parfaite de toutes les animations du Hero
 */
export default function LandingPreloader({ onReady }: LandingPreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    setMounted(true);

    let isDone = false;
    const finish = () => {
      if (isDone) return;
      isDone = true;
      setLoaded(true);
      onReady();
      setTimeout(() => {
        setRemoved(true);
      }, 550);
    };

    // 1. Précharger l'image de la carte NFC en cache mémoire
    if (typeof window !== "undefined") {
      const img = new Image();
      img.src = "/images/black-card-front.png";
      if (img.complete) {
        // Déjà en cache : délai ultra-court de transition douce
        setTimeout(finish, 220);
      } else {
        img.onload = () => setTimeout(finish, 180);
        img.onerror = () => setTimeout(finish, 180);
      }

      // 2. Filet de sécurité maximal (max 700ms pour ne jamais ralentir l'utilisateur)
      const safetyTimeout = setTimeout(finish, 700);
      return () => clearTimeout(safetyTimeout);
    }
  }, [onReady]);

  if (!mounted || removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-500 ease-out pointer-events-none ${
        loaded ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Lueur d'ambiance orange style Apple */}
        <div className="absolute -inset-8 rounded-full bg-[#FF6B00]/20 blur-2xl animate-pulse" />

        {/* Logo / Symbole Asuka Card */}
        <div className="relative flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#FF6B00] to-[#FF9A4D] p-0.5 shadow-xl shadow-[#FF6B00]/30 animate-pulse">
            <div className="h-full w-full rounded-[14px] bg-black flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-tighter">A</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[#FF6B00] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              ASUKA CARD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
