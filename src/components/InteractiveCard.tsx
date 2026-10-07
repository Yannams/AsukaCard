"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface InteractiveCardProps {
  front: string;
  back: string;
  alt: string;
  className?: string;
  /** Intensité maximale d'inclinaison au survol en degrés */
  maxTilt?: number;
  /** Affiche l'indication textuelle */
  hint?: boolean;
  /** Rotation 3D entièrement contrôlée par le défilement (scroll) */
  flipOnScroll?: boolean;
  /** Animation de révélation style keynote Apple iPhone Pro */
  launchAnimation?: boolean;
}

/**
 * Carte 3D interactive :
 * - Si flipOnScroll = true : la rotation Y (0° à 180°) est 100% pilotée par le scroll en direct.
 * - Inclinaison au curseur (souris) et reflet dynamique.
 * - Si flipOnScroll = false : retournement au clic.
 */
export default function InteractiveCard({
  front,
  back,
  alt,
  className = "w-[300px] sm:w-[420px] lg:w-[520px]",
  maxTilt = 14,
  hint = false,
  flipOnScroll = false,
  launchAnimation = false,
}: InteractiveCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const target = useRef({ x: 0, y: 0, active: false });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const [flipped, setFlipped] = useState(false);
  const [launchDone, setLaunchDone] = useState(!launchAnimation);

  useEffect(() => {
    if (!launchAnimation) return;
    const timer = setTimeout(() => {
      setLaunchDone(true);
    }, 1900);
    return () => clearTimeout(timer);
  }, [launchAnimation]);

  // Animation d'inclinaison au curseur (tilt)
  const kick = useCallback(() => {
    const loop = () => {
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * 0.12;
      c.y += (t.y - c.y) * 0.12;

      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${(-c.y * maxTilt).toFixed(2)}deg) rotateY(${(
          c.x * maxTilt
        ).toFixed(2)}deg) scale(${t.active ? 1.03 : 1})`;
      }

      if (glareRef.current) {
        glareRef.current.style.opacity = t.active ? "1" : "0";
        glareRef.current.style.background = `radial-gradient(circle at ${(c.x * 50 + 50).toFixed(1)}% ${(
          c.y * 50 +
          50
        ).toFixed(1)}%, rgba(255,255,255,0.35), transparent 55%)`;
      }

      const mouseRunning = t.active || Math.abs(c.x) >= 0.002 || Math.abs(c.y) >= 0.002;
      if (mouseRunning) {
        raf.current = requestAnimationFrame(loop);
      } else {
        raf.current = null;
      }
    };

    if (raf.current === null) {
      raf.current = requestAnimationFrame(loop);
    }
  }, [maxTilt]);

  // Contrôle direct et continu par le défilement (scroll scrubbing épinglé)
  useEffect(() => {
    if (!flipOnScroll) return;

    const handleScroll = () => {
      const pinContainer = wrapRef.current?.closest("[data-hero-pin]") as HTMLElement | null;
      let progress = 0;

      if (pinContainer) {
        const rect = pinContainer.getBoundingClientRect();
        const total = pinContainer.offsetHeight - window.innerHeight;
        if (total > 0) {
          progress = Math.min(1, Math.max(0, -rect.top / total));
        }
      } else {
        const scrollY =
          window.scrollY ??
          window.pageYOffset ??
          document.documentElement.scrollTop ??
          document.body.scrollTop ??
          0;
        const SCROLL_DISTANCE = 400;
        progress = Math.min(1, Math.max(0, scrollY / SCROLL_DISTANCE));
      }

      // La rotation vers 180° s'effectue sur les premiers 85% du scroll épinglé
      // puis reste stabilisée sur le verso (QR code / infos) avant que la page ne défile
      const flipProgress = Math.min(1, progress / 0.85);
      const angle = flipProgress * 180;

      if (flipRef.current) {
        flipRef.current.style.transform = `rotateY(${angle.toFixed(2)}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [flipOnScroll]);

  useEffect(() => {
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    target.current = {
      x: Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)),
      y: Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)),
      active: true,
    };
    kick();
  };

  const onLeave = () => {
    target.current = { x: 0, y: 0, active: false };
    kick();
  };

  const maskStyle = (src: string): React.CSSProperties => ({
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
  });

  return (
    <div className="flex flex-col items-center">
      <div
        ref={wrapRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={() => {
          if (!flipOnScroll) setFlipped((f) => !f);
        }}
        className={`relative cursor-pointer select-none touch-pan-y ${
          launchAnimation && !launchDone ? "animate-apple-card pointer-events-none" : ""
        } ${className}`}
        style={{ perspective: 1400 }}
        role="button"
        aria-label="Carte de visite interactive"
      >
        {/* Conteneur d'inclinaison (Tilt) */}
        <div
          ref={tiltRef}
          className="relative will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
          }}
        >
          {/* Conteneur de retournement (Flip) */}
          <div
            ref={flipRef}
            className={`relative will-change-transform ${
              flipOnScroll
                ? ""
                : "transition-transform duration-[850ms] ease-[cubic-bezier(0.3,0.8,0.2,1)]"
            }`}
            style={{
              transformStyle: "preserve-3d",
              WebkitTransformStyle: "preserve-3d",
              transform: flipOnScroll ? "rotateY(0deg)" : `rotateY(${flipped ? 180 : 0}deg)`,
            }}
          >
            {/* Recto */}
            <div
              className="relative"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={front}
                alt={alt}
                draggable={false}
                className="block h-auto w-full pointer-events-none"
              />
              <div
                ref={glareRef}
                aria-hidden
                style={maskStyle(front)}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 mix-blend-soft-light"
              />

              {/* Reflet spéculaire style Apple iPhone Pro lors du lancement */}
              {launchAnimation && (
                <div
                  aria-hidden
                  style={maskStyle(front)}
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  <div className="animate-apple-sheen absolute inset-y-0 w-48 -left-48 bg-gradient-to-r from-transparent via-white/55 to-transparent blur-[2px]" />
                </div>
              )}
            </div>

            {/* Verso */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={back}
                alt={`${alt} - verso`}
                draggable={false}
                className="block h-auto w-full pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
