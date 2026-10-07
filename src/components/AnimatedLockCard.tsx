"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Check } from "lucide-react";

export function AnimatedLockCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 (ouvert à gauche) -> 1 (fermé à droite)
  const [isLocked, setIsLocked] = useState(false);
  const [ping, setPing] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  // Synchronisation continue et progressive avec le scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isInteractive) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Début : le haut de la carte entre dans l'écran (85% de la hauteur de fenêtre)
          const startY = windowHeight * 0.85;
          // Fin : le haut de la carte atteint le tiers supérieur (35% de la hauteur)
          const endY = windowHeight * 0.35;

          const currentY = rect.top;
          let p = (startY - currentY) / (startY - endY);
          p = Math.max(0, Math.min(1, p));

          setProgress(p);

          // Dès que le cadenas atteint 98% de fermeture, il se verrouille
          if (p >= 0.98) {
            setIsLocked((prev) => {
              if (!prev) {
                setPing(true);
                setTimeout(() => setPing(false), 700);
              }
              return true;
            });
          } else {
            setIsLocked(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInteractive]);

  // Clic interactif pour tester l'animation à tout moment
  const handleClick = useCallback(() => {
    setIsInteractive(true);
    setProgress(0);
    setIsLocked(false);

    setTimeout(() => {
      setProgress(1);
      setIsLocked(true);
      setPing(true);
      setTimeout(() => setPing(false), 700);

      setTimeout(() => {
        setIsInteractive(false);
      }, 700);
    }, 350);
  }, []);

  // Calcul dynamique de l'angle et du décalage selon le scroll
  const currentAngle = -115 * (1 - progress);
  const currentY = -6 * (1 - progress);

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="group relative w-full rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#f5f5f7] p-8 sm:p-14 lg:p-20 overflow-hidden select-none cursor-pointer flex flex-col items-center text-center"
      title="Faites défiler la page pour voir le loquet se fermer en direct"
    >
      {/* Halo lumineux d'ambiance Apple */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.9)_0%,rgba(245,245,247,0)_65%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full">
        {/* CADENAS ÉPURÉ EN HAUT ET AU MILIEU */}
        <div className="relative mb-6 sm:mb-8 flex flex-col items-center justify-center">
          {/* Onde discrète lors de la fermeture complète */}
          {ping && (
            <span className="absolute -inset-4 rounded-full bg-[#FF6B00]/20 animate-ping pointer-events-none" />
          )}

          {/* SVG DU CADENAS STANDALONE DIRECTEMENT SUR LE FOND GRIS */}
          <div className="relative w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105 active:scale-95">
            <svg
              viewBox="0 0 100 120"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* LOQUET DU CADENAS : SE FERME AU FUR ET À MESURE DU SCROLL */}
              <g
                style={{
                  transformOrigin: "32px 52px",
                  transform: `rotate(${currentAngle.toFixed(2)}deg) translateY(${currentY.toFixed(2)}px)`,
                  transition: isInteractive
                    ? "transform 550ms cubic-bezier(0.34, 1.4, 0.64, 1)"
                    : "transform 100ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              >
                <path
                  d="M 32 54 V 38 C 32 28.06 40.06 20 50 20 C 59.94 20 68 28.06 68 38 V 54"
                  stroke="#FF6B00"
                  strokeWidth="8.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* RECTANGLE SIMPLE ORANGE POUR LE LOCK */}
              <rect
                x="16"
                y="50"
                width="68"
                height="54"
                rx="8"
                fill="#FF6B00"
                style={{
                  transformOrigin: "50px 77px",
                  transform: isLocked ? "scale(1)" : "scale(0.985)",
                  transition: "transform 200ms ease-out",
                }}
              />

              {/* AS DE PIQUE (♠) EN BLANC DANS LE RECTANGLE */}
              <path
                d="M 50 62 C 49 65 37 74.5 37 81 C 37 86 41 89 45.5 89 C 48.2 89 49.5 87 49.5 84.5 L 46.5 92 H 53.5 L 50.5 84.5 C 50.5 87 51.8 89 54.5 89 C 59 89 63 86 63 81 C 63 74.5 51 65 50 62 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </div>

        {/* TITRE ET TEXTE DIRECTEMENT SOUS LE CADENAS */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08] max-w-3xl">
          Privé. Sécurisé.
          <br />
          <span className="text-[#86868b]">Vous gardez le contrôle.</span>
        </h2>

        <p className="mt-5 text-base sm:text-lg text-[#6e6e73] leading-relaxed max-w-2xl">
          Contrairement aux cartes imprimées ou aux applications invasives, Asuka Card ne conserve que les informations que vous choisissez d&apos;afficher.
        </p>

        {/* LISTE DES POINTS CLÉS AVEC COCHES */}
        <ul className="mt-8 sm:mt-10 space-y-3.5 max-w-xl text-left inline-block">
          {[
            "Aucun pistage ni vente de vos données professionnelles.",
            "Mise à jour ou révocation instantanée de vos informations en un clic.",
            "Fiche contact conforme au standard mondial vCard (.vcf).",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] text-white mt-0.5">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-sm sm:text-base text-[#1d1d1f] font-normal">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
