"use client";

import React, { useEffect, useRef } from "react";

interface ParticleWaveProps {
  theme?: "light" | "dark";
}

/**
 * Interpolation exacte du dégradé Asuka "En un geste" :
 * from-[#FF6B00] (255, 107, 0) -> via-[#FF9A4D] (255, 154, 77) -> to-[#FFB347] (255, 179, 71)
 */
function getAsukaGradientColor(ratio: number): [number, number, number] {
  const t = Math.max(0, Math.min(1, ratio));
  if (t < 0.5) {
    const k = t * 2; // 0 à 1
    return [
      255,
      Math.round(107 + (154 - 107) * k),
      Math.round(0 + 77 * k),
    ];
  } else {
    const k = (t - 0.5) * 2; // 0 à 1
    return [
      255,
      Math.round(154 + (179 - 154) * k),
      Math.round(77 + (71 - 77) * k),
    ];
  }
}

export default function ParticleWave({ theme = "dark" }: ParticleWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Grille de vagues nette et structurée (points opaques nets qui se déplacent sur l'onde)
    const COLS = 96;  // Points par rangée horizontale
    const ROWS = 38;  // Rangées de vagues en profondeur
    const WORLD_WIDTH = 1420;
    const WORLD_DEPTH = 880;

    // Couleurs exactes par colonne le long du dégradé orange
    const colColors: [number, number, number][] = [];
    for (let c = 0; c < COLS; c++) {
      colColors.push(getAsukaGradientColor(c / (COLS - 1)));
    }

    let time = 0;

    const render = () => {
      // Rythme de vague ondulante fluide et hypnotique d'origine
      time += 0.006;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      // Positionné derrière la carte
      const centerY = height * 0.63;

      // Caméra 3D
      const pitch = 0.38; // ~22°
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      const fov = 390;
      const camY = -130;
      const camZ = -120;

      // Rendu de l'arrière vers l'avant pour une superposition 3D nette
      for (let r = ROWS - 1; r >= 0; r--) {
        const rowRatio = r / (ROWS - 1); // 0.0 (avant) -> 1.0 (fond)
        const worldZ = rowRatio * WORLD_DEPTH;

        for (let c = 0; c < COLS; c++) {
          const colRatio = c / (COLS - 1); // 0.0 (gauche) -> 1.0 (droite)
          const normX = colRatio - 0.5;
          const worldX = normX * WORLD_WIDTH;

          // Mouvement de vague harmonique authentique (comme au départ)
          const wave1 = Math.sin(normX * 5.2 - time * 0.95 + rowRatio * 3.5) * 52;
          const wave2 = Math.cos(normX * 8.0 + time * 0.65 - rowRatio * 4.0) * 28;
          const wave3 = Math.sin((normX * 3.0 + rowRatio * 2.5) - time * 0.5) * 18;

          const worldY = wave1 + wave2 + wave3;

          // Projection caméra 3D
          const relY = worldY - camY;
          const relZ = worldZ - camZ;

          const rotY = relY * cosPitch - relZ * sinPitch;
          const rotZ = relY * sinPitch + relZ * cosPitch;

          if (rotZ <= 10) continue;

          const scale = fov / (fov + rotZ);
          const screenX = centerX + worldX * scale;
          const screenY = centerY + rotY * scale;

          // Atténuation uniquement sur l'extrême bord gauche et droit
          const edgeFade = Math.sin(colRatio * Math.PI);
          // Éléments bien opaques (0.85 à 1.0 sur 90% de la zone)
          const alpha = Math.min(1.0, edgeFade * 1.6);

          // Taille nette et solide (aucun flou, pas de luisance)
          const dotRadius = Math.max(0.7, 1.85 * scale);

          const [cr, cg, cb] = colColors[c];

          // Dessin du point solide et opaque
          ctx.beginPath();
          ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />
      {/* Fondu très doux sur les bordures supérieure et inférieure */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none" />
    </div>
  );
}
