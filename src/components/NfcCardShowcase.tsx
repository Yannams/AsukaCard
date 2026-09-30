"use client";

import React, { useState, useRef } from "react";

export default function NfcCardShowcase() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Carte redressée
  const baseRotX = 0;
  const baseRotY = 0;
  const baseRotZ = 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 8,
      y: (x / (rect.width / 2)) * 8,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-xl mx-auto flex flex-col items-center justify-center relative cursor-pointer select-none"
    >
      {/* Floating 3D Card Display */}
      <div className="relative pt-2 pb-4 sm:pt-4 sm:pb-6 flex items-center justify-center [perspective:1200px]">
        {/* Lévitation verticale continue */}
        <div className="animate-hero-card flex items-center justify-center">
          {/* Carte inclinée en 3D vers le haut à gauche avec réactivité au curseur */}
          <div
            style={{
              transform: `perspective(1000px) rotateX(${baseRotX + tilt.x}deg) rotateY(${baseRotY + tilt.y}deg) rotateZ(${baseRotZ}deg) ${
                isHovered ? "scale(1.04)" : "scale(1)"
              }`,
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
              transformStyle: "preserve-3d",
            }}
            className="relative flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/black-card-front.png"
              alt="Carte NFC Asuka Card - Recto Noir Mat"
              className="w-[260px] sm:w-[320px] md:w-[370px] lg:w-[410px] h-auto object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
