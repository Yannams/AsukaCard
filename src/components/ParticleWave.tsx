"use client";

import React, { useEffect, useRef } from "react";

// Fast HSL to RGB conversion for vibrant chromatic transitions
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = (h % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0, g = 0, b = 0;
  if (hp >= 0 && hp < 1) { r = c; g = x; b = 0; }
  else if (hp >= 1 && hp < 2) { r = x; g = c; b = 0; }
  else if (hp >= 2 && hp < 3) { r = 0; g = c; b = x; }
  else if (hp >= 3 && hp < 4) { r = 0; g = x; b = c; }
  else if (hp >= 4 && hp < 5) { r = x; g = 0; b = c; }
  else if (hp >= 5 && hp < 6) { r = c; g = 0; b = x; }
  const m = l - c / 2;
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

export default function ParticleWave() {
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

    // 3D Perspective Wave Grid configuration
    const COLS = 72; // Horizontal width points
    const ROWS = 30; // Depth points (receding into distance)
    const WORLD_WIDTH = 1350;
    const WORLD_DEPTH = 850;

    // Slow, calming, luxurious animation speed
    let time = 0;

    const render = () => {
      // Much slower, graceful fluid flow (was 0.018, now 0.005)
      time += 0.005;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      // Positioned just behind and under the card
      const centerY = height * 0.62;

      // 3D Camera settings (looking down into the receding wave plane)
      const pitch = 0.38; // ~22 degrees tilt
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      const fov = 380;
      const camY = -130;
      const camZ = -120;

      // Render 3D wave plane points from back (far) to front (near)
      for (let r = ROWS - 1; r >= 0; r--) {
        const rowRatio = r / (ROWS - 1); // 0.0 (near) to 1.0 (far)
        const worldZ = rowRatio * WORLD_DEPTH;

        for (let c = 0; c < COLS; c++) {
          const colRatio = c / (COLS - 1); // 0.0 (left) to 1.0 (right)
          const normX = colRatio - 0.5; // -0.5 to +0.5
          const worldX = normX * WORLD_WIDTH;

          // 3D Harmonic wave undulations traveling across X and Z
          const wave1 = Math.sin(normX * 5.2 - time * 0.9 + rowRatio * 3.5) * 48;
          const wave2 = Math.cos(normX * 8.0 + time * 0.6 - rowRatio * 4.0) * 26;
          const wave3 = Math.sin((normX * 3.0 + rowRatio * 2.5) - time * 0.5) * 18;

          const worldY = wave1 + wave2 + wave3;

          // 3D Camera Transformation
          const relY = worldY - camY;
          const relZ = worldZ - camZ;

          const rotY = relY * cosPitch - relZ * sinPitch;
          const rotZ = relY * sinPitch + relZ * cosPitch;

          if (rotZ <= 10) continue;

          // Perspective division
          const scale = fov / (fov + rotZ);
          const screenX = centerX + worldX * scale;
          const screenY = centerY + rotY * scale;

          // Depth fog & edge fading
          const edgeFadeX = Math.sin(colRatio * Math.PI);
          const depthFog = Math.pow(1 - rowRatio * 0.65, 1.2);
          const alpha = Math.max(0.04, Math.min(0.85, edgeFadeX * depthFog * (0.3 + (worldY + 60) / 140)));

          // Localized color wave tracking undulation crests
          // 1. Crest tracking: particles on upper wave crests catch light
          const crestPhase = (wave1 / 48 + 1) * 0.5; // 0 to 1 following primary wave
          const sharpCrest = Math.pow(Math.max(0, crestPhase - 0.25) / 0.75, 3.0);

          // 2. Traveling localized wave packets (ensures color NEVER covers the whole wave)
          const travelPhase1 = Math.sin(normX * 3.8 - time * 0.75 + rowRatio * 2.8);
          const travelBand1 = Math.pow(Math.max(0, travelPhase1), 3.0);

          const travelPhase2 = Math.sin(normX * 4.5 + time * 0.6 - rowRatio * 2.2);
          const travelBand2 = Math.pow(Math.max(0, travelPhase2), 3.2);

          const combinedTravel = Math.max(travelBand1, travelBand2 * 0.75);

          // 3. Elevation boost: highest absolute elevations catch stronger luminescence
          const heightBoost = Math.max(0, Math.min(1, (worldY + 20) / 70));

          // Combined color intensity (peaks gracefully at ~0.85-1.0 only on moving wave crest pockets)
          const colorIntensity = Math.min(1, sharpCrest * combinedTravel * 2.5 * heightBoost);

          // Dynamic MULTICOLOR chromatic spectrum:
          // Smoothly cycles across spectral hues (cyan, violet, electric blue, magenta, warm amber, emerald)
          // along the wave's spatial propagation
          const hue = ((normX * 280 + rowRatio * 160 + time * 40) % 360 + 360) % 360;
          // Saturation 92%, Lightness 58% for glowing, vibrant chromatic colors
          const [targetR, targetG, targetB] = hslToRgb(hue, 0.92, 0.58);

          // Blend from pure white (255, 255, 255) to chromatic spectral color based on localized intensity
          // Leaves >80% of particles pure white/neutral at all times
          const cWeight = Math.min(0.92, colorIntensity * 1.25);
          const rVal = Math.round(255 * (1 - cWeight) + targetR * cWeight);
          const gVal = Math.round(255 * (1 - cWeight) + targetG * cWeight);
          const bVal = Math.round(255 * (1 - cWeight) + targetB * cWeight);

          // Perspective particle sizing: larger in foreground, tiny in background, subtle crest boost
          const dotSize = Math.max(0.6, (2.1 * scale) * (1 + colorIntensity * 0.35));
          const finalAlpha = Math.min(0.95, alpha * (1 + colorIntensity * 0.45));

          ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${finalAlpha})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
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
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-hidden="true"
      />
      {/* Soft gradient masks to blend cleanly with black Hero edges */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none" />
    </div>
  );
}
