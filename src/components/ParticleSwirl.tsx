"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  angle: number;
  distance: number;
  speed: number;
  radialSpeed: number;
  size: number;
  baseAlpha: number;
  pulsePhase: number;
  colorType: "white" | "silver" | "orange";
  armOffset: number;
}

export default function ParticleSwirl() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Center coordinates with gentle mouse lag
    let centerX = width / 2;
    let centerY = height * 0.52;
    let targetCenterX = centerX;
    let targetCenterY = centerY;

    // Handle high DPI displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const setCanvasSize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      targetCenterX = width / 2;
      targetCenterY = height * 0.52;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      // Gentle parallax displacement (up to 40px)
      targetCenterX = width / 2 + (mouseX - width / 2) * 0.08;
      targetCenterY = height * 0.52 + (mouseY - height * 0.52) * 0.08;
    };

    const parentElem = canvas.parentElement;
    parentElem?.addEventListener("mousemove", handleMouseMove);

    // Swirl configuration
    const PARTICLE_COUNT = 380;
    const NUM_ARMS = 3;
    const ARM_SPREAD = 0.45;
    const maxRadius = Math.max(width, height) * 0.75;
    const minRadius = 25;

    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const arm = i % NUM_ARMS;
      const armAngle = (arm * (2 * Math.PI)) / NUM_ARMS;
      // Distance distribution: more concentrated in mid-radius for visible swirl structure
      const distRatio = Math.pow(Math.random(), 0.65);
      const distance = minRadius + distRatio * (maxRadius - minRadius);

      // Logarithmic spiral angle offset
      const spiralOffset = Math.log(distance / minRadius + 1) * 2.8;
      const spread = (Math.random() - 0.5) * ARM_SPREAD * (1 + distance / 200);
      const angle = armAngle + spiralOffset + spread;

      // Inner particles rotate faster (Keplerian-like swirl)
      const speed = 0.0025 + (1 - distance / maxRadius) * 0.006;
      const radialSpeed = 0.15 + Math.random() * 0.25;

      const sizeRand = Math.random();
      const size = sizeRand > 0.92 ? 2.2 + Math.random() * 0.8 : sizeRand > 0.6 ? 1.4 + Math.random() * 0.6 : 0.8 + Math.random() * 0.5;

      // Color scheme: mostly white/silver dots with subtle amber/orange sparks
      let colorType: "white" | "silver" | "orange" = "white";
      if (Math.random() < 0.12) {
        colorType = "orange";
      } else if (Math.random() < 0.4) {
        colorType = "silver";
      }

      particles.push({
        x: 0,
        y: 0,
        radius: distance,
        angle,
        distance,
        speed,
        radialSpeed,
        size,
        baseAlpha: 0.2 + Math.random() * 0.65,
        pulsePhase: Math.random() * Math.PI * 2,
        colorType,
        armOffset: armAngle,
      });
    }

    let globalRotation = 0;

    const render = () => {
      // Smooth camera / center transition towards target
      centerX += (targetCenterX - centerX) * 0.05;
      centerY += (targetCenterY - centerY) * 0.05;
      globalRotation += 0.0012;

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient core glow in center of vortex
      const coreGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.min(width, height) * 0.45
      );
      coreGradient.addColorStop(0, "rgba(255, 107, 0, 0.06)");
      coreGradient.addColorStop(0.35, "rgba(255, 255, 255, 0.03)");
      coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Swirl inward slowly
        p.distance -= p.radialSpeed;
        if (p.distance < minRadius) {
          p.distance = maxRadius * (0.85 + Math.random() * 0.15);
        }

        // Angular rotation with differential speed
        p.angle += p.speed;
        p.pulsePhase += 0.025;

        // Elliptical perspective (slanted vortex disk)
        const perspectiveAspectY = 0.62;
        p.x = centerX + Math.cos(p.angle) * p.distance;
        p.y = centerY + Math.sin(p.angle) * (p.distance * perspectiveAspectY);

        // Alpha calculation with edge fading & subtle twinkle
        const edgeFade = Math.sin((p.distance / maxRadius) * Math.PI);
        const pulse = 0.8 + 0.2 * Math.sin(p.pulsePhase);
        const alpha = Math.min(1, Math.max(0, p.baseAlpha * edgeFade * pulse));

        // Color selection
        if (p.colorType === "orange") {
          ctx.fillStyle = `rgba(255, 107, 0, ${alpha * 0.95})`;
        } else if (p.colorType === "silver") {
          ctx.fillStyle = `rgba(180, 205, 235, ${alpha * 0.85})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for larger particles
        if (p.size > 2.0 && alpha > 0.4) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.colorType === "orange"
            ? `rgba(255, 107, 0, ${alpha * 0.2})`
            : `rgba(255, 255, 255, ${alpha * 0.15})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasSize);
      parentElem?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
