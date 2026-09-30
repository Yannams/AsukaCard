"use client";

import React, { useState } from "react";
import { Radio, QrCode, Smartphone, Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import CardPreview from "./CardPreview";
import { Card } from "@/lib/db";

interface UsagesShowcaseProps {
  demoCards: Card[];
}

export default function UsagesShowcase({ demoCards }: UsagesShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"nfc" | "qr" | "app">("nfc");
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);

  const currentDemoCard = demoCards[selectedDemoIndex] || demoCards[0];

  return (
    <div className="w-full space-y-10">
      {/* Tab Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto p-1.5 bg-neutral-100/90 rounded-full border border-neutral-200">
        <button
          type="button"
          onClick={() => setActiveTab("nfc")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            activeTab === "nfc"
              ? "bg-[#111111] text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>1. Taper au smartphone (NFC)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("qr")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            activeTab === "qr"
              ? "bg-[#111111] text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>2. Scanner la carte (QR Code)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("app")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            activeTab === "app"
              ? "bg-[#111111] text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>3. L&apos;application dans le téléphone</span>
        </button>
      </div>

      {/* Tab 1: NFC Tap against phone */}
      {activeTab === "nfc" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs animate-in fade-in duration-200">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-[#111111]" />
              <span>Transmission sans contact en 0,2 seconde</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] leading-tight">
              Approchez votre carte du smartphone. Rien à installer.
            </h3>

            <p className="text-sm text-neutral-600 leading-relaxed">
              Il suffit d&apos;approcher votre carte Asuka NFC du dos de n&apos;importe quel téléphone récent (iPhone ou Android). Une notification apparaît automatiquement et ouvre votre profil complet.
            </p>

            <ul className="space-y-2.5 text-xs text-neutral-700">
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>Fonctionne sans aucune application requise pour vos contacts</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>Compatible nativement avec 100% des smartphones récents</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>Puce NFC ultra-sécurisée réinscriptible à l&apos;infini</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-md max-w-lg w-full group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/nfc-tap.jpg"
                alt="Carte NFC Asuka approchée au dos d'un smartphone"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
                <span>NFC Tap & Go — Détection immédiate</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: QR Code Scan with smartphone camera */}
      {activeTab === "qr" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs animate-in fade-in duration-200">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold">
              <QrCode className="w-3.5 h-3.5 text-[#111111]" />
              <span>Lisibilité universelle et instantanée</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] leading-tight">
              Scannez le QR Code avec l&apos;appareil photo.
            </h3>

            <p className="text-sm text-neutral-600 leading-relaxed">
              Pour les interlocuteurs dont le téléphone n&apos;a pas le NFC activé, ou lors de présentations vidéo et réunions à distance, chaque carte intègre un QR code haute définition gravé au laser.
            </p>

            <ul className="space-y-2.5 text-xs text-neutral-700">
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>Détection instantanée par l&apos;appareil photo natif</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>Téléchargement direct du QR Code en haute résolution</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral-100 text-neutral-900 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>Lien dynamique : modifiez vos infos sans changer le QR Code</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-md max-w-lg w-full group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/qr-scan.jpg"
                alt="Smartphone scannant le QR code sur la carte Asuka"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-[11px] font-medium flex items-center gap-2">
                <QrCode className="w-3.5 h-3.5 text-white" />
                <span>Scan caméra optique — 0 friction</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: The digital application in the phone */}
      {activeTab === "app" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-xs animate-in fade-in duration-200">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold">
              <Smartphone className="w-3.5 h-3.5 text-[#111111]" />
              <span>Application web progressive haut de gamme</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] leading-tight">
              Votre carte digitale, vivante et interactive dans l&apos;écran.
            </h3>

            <p className="text-sm text-neutral-600 leading-relaxed">
              Une fois ouverte sur le smartphone, votre interlocuteur accède à une interface fluide : boutons d&apos;appel, message WhatsApp en un clic, liens réseaux sociaux, itinéraire GPS et enregistrement instantané dans le carnet d&apos;adresses.
            </p>

            {/* Profile switcher */}
            <div className="pt-2">
              <span className="block text-xs font-semibold text-neutral-800 mb-2">
                Tester un profil d&apos;exemple :
              </span>
              <div className="flex flex-wrap gap-2">
                {demoCards.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedDemoIndex(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedDemoIndex === i
                        ? "bg-[#111111] text-white border-neutral-900"
                        : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    {c.firstName} {c.lastName} ({c.dominantColor})
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            {/* Smartphone mockup frame containing the real interactive card */}
            <div className="w-[320px] sm:w-[350px] bg-neutral-900 p-3 rounded-[38px] shadow-2xl border-4 border-neutral-800">
              <div className="w-full bg-neutral-100 rounded-[30px] overflow-hidden relative">
                {/* Speaker pill notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-900 rounded-full z-20" />
                <div className="pt-6 pb-2 px-1 max-h-[580px] overflow-y-auto">
                  {currentDemoCard && (
                    <CardPreview card={currentDemoCard} interactive={false} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
