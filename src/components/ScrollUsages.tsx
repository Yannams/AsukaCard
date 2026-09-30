"use client";

import React, { useEffect, useRef, useState } from "react";
import { QrCode, Smartphone } from "lucide-react";
import CardPreview from "./CardPreview";
import { Card } from "@/lib/db";

interface ScrollUsagesProps {
  demoCard?: Card;
}

export default function ScrollUsages({ demoCard }: ScrollUsagesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });

  // Track viewport dimensions accurately
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll interpolation via requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const raw = -rect.top / totalScrollable;
      targetProgress = Math.max(0, Math.min(1, raw));
    };

    const updateLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.16;
      if (Math.abs(targetProgress - currentProgress) < 0.0004) {
        currentProgress = targetProgress;
      }
      setProgress(currentProgress);
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    currentProgress = targetProgress;
    setProgress(targetProgress);
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Step progression based on scroll progress
  let activeStep = 0;
  if (progress < 0.16) {
    activeStep = 0; // Intro
  } else if (progress < 0.52) {
    activeStep = 1; // 01. Taper au smartphone (NFC)
  } else if (progress < 0.78) {
    activeStep = 2; // 02. Scanner le QR Code
  } else {
    activeStep = 3; // 03. Profil digital
  }

  // Phase 0: Intro Title opacity
  const introOpacity = Math.max(0, Math.min(1, 1 - progress / 0.16));

  // Phase 1 (NFC Tap): Normalized progress from 0.16 to 0.38
  const rawStep1 = Math.max(0, Math.min(1, (progress - 0.16) / 0.22));
  // Smooth cubic ease-out for natural reach into contact
  const step1Norm = 1 - Math.pow(1 - rawStep1, 3);

  // Responsive device positioning calculations:
  const isMobile = viewport.width < 640;
  const isTablet = viewport.width >= 640 && viewport.width < 1024;
  const isLaptop = viewport.width >= 1024 && viewport.width <= 1440;

  // Phone size: prominent, realistic, and emerging naturally from bottom-right corner
  const phoneWidth = isMobile
    ? Math.min(360, viewport.width * 0.92)
    : isTablet
    ? Math.min(600, viewport.width * 0.78)
    : isLaptop
    ? Math.min(740, viewport.width * 0.58)
    : Math.min(880, viewport.width * 0.46);

  const phoneHeight = phoneWidth * (768 / 1376);

  // Bleed sleeve past the bottom-right corner so no cut edges are ever visible
  const phoneBleedX = isMobile ? 25 : isTablet ? 40 : 50;
  const phoneBleedY = isMobile ? 15 : isTablet ? 20 : 25;

  const phoneX = viewport.width - phoneWidth + phoneBleedX;
  const phoneY = viewport.height - phoneHeight + phoneBleedY;

  // NFC contact point on iPhone (top receiver/antenna area)
  const contactPointX = phoneX + phoneWidth * 0.25;
  const contactPointY = phoneY + phoneHeight * 0.31;

  // Card hand size: realistic proportion relative to the iPhone
  // In main-garde-carte-seamless.png (2515x2939), the card is ~15.9% of image width
  const cardWidth = phoneWidth * 1.30;
  const cardHeight = cardWidth * (2939 / 2515);

  // Card contact position:
  const cardContactX = contactPointX - cardWidth * 0.915;
  const cardContactY = contactPointY - cardHeight * 0.955;

  // Motion dynamics along arm diagonal:
  const pullBack = Math.min(95, viewport.width * 0.08);
  const cardDeltaX = -pullBack * (1 - step1Norm);
  const cardDeltaY = -pullBack * 1.15 * (1 - step1Norm);
  const cardRotate = -4 * (1 - step1Norm);

  const phoneDeltaX = 20 * (1 - step1Norm);
  const phoneDeltaY = 12 * (1 - step1Norm);
  const phoneRotate = 1.5 * (1 - step1Norm);

  const currentCardX = cardContactX + cardDeltaX;
  const currentCardY = cardContactY + cardDeltaY;
  const currentPhoneX = phoneX + phoneDeltaX;
  const currentPhoneY = phoneY + phoneDeltaY;

  // Phase 2 (QR Code Scan): Normalized progress from 0.52 to 0.74
  const rawStep2 = Math.max(0, Math.min(1, (progress - 0.52) / 0.20));
  const step2Norm = 1 - Math.pow(1 - rawStep2, 3);

  // Scan Hand sizing (emerging from top edge)
  const scanHandWidth = isMobile
    ? Math.min(270, viewport.width * 0.72)
    : isTablet
    ? Math.min(330, viewport.width * 0.45)
    : isLaptop
    ? Math.min(360, viewport.width * 0.30)
    : 380;

  // The hand smoothly slides down from top into scanning position
  const scanHandOffset = -100 * (1 - step2Norm);
  const cardShiftY = 20 * (1 - step2Norm);

  return (
    <div
      ref={containerRef}
      className="relative h-[340vh] bg-white text-[#111111]"
      id="usages"
    >
      {/* Sticky Fullscreen 100vh Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center px-4 pt-20 sm:pt-24 pb-6 sm:pb-8 overflow-hidden select-none">
        {/* Soft luxury background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/60 via-white to-neutral-50/40 pointer-events-none" />

        {/* ================= 1. INTRO SCREEN ================= */}
        <div
          style={{
            opacity: introOpacity,
            pointerEvents: introOpacity > 0.1 ? "auto" : "none",
            transform: `translateY(-${(1 - introOpacity) * 30}px) scale(${0.96 + introOpacity * 0.04})`,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-40 transition-all ease-out"
        >
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] leading-tight max-w-4xl">
            Trois façons de transmettre vos coordonnées
          </h2>
        </div>

        {/* ================= 2. FULLSCREEN INTERACTION LAYER ================= */}
        <div className="absolute inset-0 z-20 w-full h-full overflow-hidden pointer-events-none">
          {/* ================= STEP 1: NFC CARD TAP SCENE ================= */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeStep === 1 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* PHONE HAND (Emerging naturally from bottom-right corner) */}
            <div
              style={{
                width: `${phoneWidth}px`,
                transform: `translate(${currentPhoneX}px, ${currentPhoneY}px) rotate(${phoneRotate}deg)`,
                transformOrigin: "bottom right",
              }}
              className="absolute left-0 top-0 z-10 will-change-transform pointer-events-none select-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hand-phone.png"
                alt="Smartphone de réception sans contact NFC"
                className="w-full h-auto object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>

            {/* CARD HAND (Approaching from top-left with seamless extended arm) */}
            <div
              style={{
                width: `${cardWidth}px`,
                transform: `translate(${currentCardX}px, ${currentCardY}px) rotate(${cardRotate}deg)`,
                transformOrigin: "91.5% 95.5%",
              }}
              className="absolute left-0 top-0 z-20 will-change-transform pointer-events-none select-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/main-garde-carte-seamless.png"
                alt="Main tenant la carte bancaire NFC Asuka"
                className="w-full h-auto object-contain select-none pointer-events-none"
                draggable={false}
              />
            </div>


          </div>

          {/* ================= STEP 2: SCANNER (HAND FROM TOP SCANNING CARD) ================= */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeStep === 2
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* HAND HOLDING SMARTPHONE COMING FROM THE TOP */}
            <div
              style={{
                width: `${scanHandWidth}px`,
                transform: `translate(-50%, ${scanHandOffset}px)`,
              }}
              className="absolute left-1/2 top-0 z-20 will-change-transform pointer-events-none select-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hand-scan-top.png"
                alt="Main tenant le smartphone pour scanner le QR code"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
                draggable={false}
              />
            </div>

            {/* The physical card positioned on the surface directly beneath the scanner */}
            <div
              style={{
                transform: `translate(-50%, ${cardShiftY}px) scale(${0.96 + step2Norm * 0.04})`,
              }}
              className="absolute left-1/2 bottom-20 sm:bottom-24 md:bottom-28 z-10 flex flex-col items-center justify-center will-change-transform"
            >
              <div className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/black-card-back.png"
                  alt="Carte de visite Asuka avec QR code gravé"
                  className="w-[200px] sm:w-[250px] md:w-[290px] h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
                  draggable={false}
                />

                {/* Animated laser scan beam across the card QR code */}
                <div className="absolute top-[38%] left-[13%] w-[30%] h-1 bg-[#FF6B00] shadow-[0_0_14px_#FF6B00] animate-bounce pointer-events-none rounded-full" />
              </div>
              {/* Ambient ground shadow */}
              <div className="w-[170px] sm:w-[220px] md:w-[260px] h-5 bg-black/15 blur-xl rounded-full mt-2" />
            </div>
          </div>

          {/* ================= STEP 3: APPLICATION / PROFIL DIGITAL ================= */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              activeStep === 3
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="relative w-[280px] sm:w-[320px] h-[390px] sm:h-[440px] rounded-[42px] bg-black border-4 border-neutral-800 shadow-2xl p-2.5 flex flex-col overflow-hidden">
              <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 border border-neutral-900 z-20 shrink-0" />

              <div className="w-full flex-1 rounded-[30px] bg-neutral-100 overflow-y-auto no-scrollbar p-2">
                {demoCard ? (
                  <div className="scale-90 origin-top">
                    <CardPreview card={demoCard} interactive={false} />
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 text-neutral-500 space-y-2">
                    <Smartphone className="w-8 h-8 text-neutral-400" />
                    <p className="text-xs font-semibold text-neutral-800">
                      Profil Digital Ouvert
                    </p>
                    <p className="text-[10px] text-neutral-500">
                      Vos coordonnées s&apos;enregistrent en un tap
                    </p>
                  </div>
                )}
              </div>

              <div className="w-28 h-1 bg-neutral-700 rounded-full mx-auto mt-2 shrink-0" />
            </div>
          </div>
        </div>

        {/* ================= 3. DESCRIPTION TEXT ================= */}
        <div className="relative z-30 lg:mt-auto pb-4 sm:pb-8 text-center px-4 pointer-events-none min-h-[72px] sm:min-h-[80px] flex flex-col justify-center items-center">
          {activeStep === 1 && (
            <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#111111]">
                Approchez votre carte du smartphone.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                Rien à installer. Détection sans contact instantanée.
              </p>
            </div>
          )}

          {activeStep === 2 && (
            <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#111111]">
                Scannez le QR Code de secours.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                Lisible par 100% des téléphones dotés d&apos;un appareil photo.
              </p>
            </div>
          )}

          {activeStep === 3 && (
            <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#111111]">
                Votre profil digital complet s&apos;ouvre.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                Enregistrement en un clic dans les contacts du correspondant.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
