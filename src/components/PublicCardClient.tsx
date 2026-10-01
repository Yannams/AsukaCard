"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CardPreview from "./CardPreview";
import ShareModal from "./ShareModal";
import { Card } from "@/lib/db";

interface PublicCardClientProps {
  card: Card;
}

export default function PublicCardClient({ card }: PublicCardClientProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Record initial view
  useEffect(() => {
    try {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: card.slug,
          type: "view",
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }
  }, [card.slug]);

  // Record contact interaction
  const handleContactClick = (type: string) => {
    try {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: card.slug,
          type: "contact_click",
          meta: type,
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }
  };

  const fullName = `${card.firstName} ${card.lastName}`;
  const isPremium = card.template === "premium" || card.template === "executive";
  const isCreative = card.template === "creative";

  return (
    <div
      className={`min-h-screen flex flex-col justify-between relative overflow-hidden ${
        isPremium
          ? "bg-[#0A0A0A] text-white py-0 sm:py-6 px-0 sm:px-4"
          : isCreative
          ? "bg-[#F8F9FA] text-neutral-900 py-3 sm:py-8 px-2 sm:px-4"
          : "bg-neutral-100 text-neutral-900 py-4 sm:py-6 px-3 sm:px-6"
      } transition-colors duration-300`}
    >
      {isCreative && (
        <>
          {/* Ambient soft neutral circular orbs behind the card */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-neutral-200/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-neutral-200/20 blur-3xl pointer-events-none" />
        </>
      )}

      {/* Main Card */}
      <main className="flex-1 flex items-center justify-center relative z-10 my-auto">
        <div className="w-full max-w-md">
          <CardPreview
            card={card}
            interactive={true}
            onContactClick={handleContactClick}
            onShareClick={() => setIsShareOpen(true)}
            onQrCodeClick={() => setIsShareOpen(true)}
          />
        </div>
      </main>

      {/* Bottom subtle watermark */}
      <footer className="max-w-md w-full mx-auto text-center pt-4 pb-3 relative z-10">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-medium tracking-wide ${
            isPremium
              ? "bg-neutral-900/60 border-neutral-800 text-neutral-400"
              : isCreative
              ? "bg-white/80 border-neutral-200 text-neutral-500"
              : "bg-white/80 border-neutral-200 text-neutral-500"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
          <span>Asuka Card • AS WORLD TECH</span>
        </div>
      </footer>

      {/* Share & QR Code Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        slug={card.slug}
        fullName={fullName}
      />
    </div>
  );
}
