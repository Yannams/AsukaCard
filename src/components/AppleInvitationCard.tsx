"use client";

import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Check,
  X,
  HelpCircle,
  Download,
  Share2,
  Navigation,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { Card } from "@/lib/db";

interface AppleInvitationCardProps {
  card: Partial<Card>;
  interactive?: boolean;
  onBack?: () => void;
  onRsvpClick?: (status: "yes" | "no" | "maybe") => void;
  onShareClick?: () => void;
}

export default function AppleInvitationCard({
  card,
  interactive = true,
  onBack,
  onRsvpClick,
  onShareClick,
}: AppleInvitationCardProps) {
  const [rsvpStatus, setRsvpStatus] = useState<"yes" | "no" | "maybe" | null>(null);

  const title = card.title || card.company || "Titre de l'évènement";
  const hostName = `${card.firstName || ""} ${card.lastName || ""}`.trim() || "Organisateur";
  const dateStr = (card.socials as any)?.eventDate || card.company || "mer. 13 janvier 2027 à 18:00";
  const locationStr = card.address || "Rue des Cheminots, Cotonou, Bénin";
  const messageStr = card.bio || "C'est mon anniversaire, vous êtes tous invités !";
  const bgImage = card.avatarUrl || "";

  // Compute 2-letter monogram for host
  const getInitials = (name: string) => {
    const parts = name.split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || "YA";
  };

  const handleRsvp = (status: "yes" | "no" | "maybe") => {
    setRsvpStatus(status);
    if (onRsvpClick) onRsvpClick(status);
  };

  const handleDownloadCalendar = () => {
    // Generate .ics calendar event
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Asuka Card//Apple Invitation//FR",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${messageStr} (Organisé par ${hostName})`,
      `LOCATION:${locationStr}`,
      "DTSTART:20270113T170000Z",
      "DTEND:20270113T230000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${title.replace(/\s+/g, "_")}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationStr)}`;

  return (
    <div className="relative w-full max-w-md mx-auto min-h-[640px] bg-black text-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col justify-between select-none">
      {/* Top Background Area (Full-bleed Photo or Vivid Gradient with blur transition) */}
      <div className="absolute inset-x-0 top-0 h-[420px] overflow-hidden z-0">
        {bgImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover object-center scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#FF453A] via-[#BF006E] to-[#2B0066]" />
        )}

        {/* Cinematic bottom fade to black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-[2px]" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 pt-6 px-5 flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all"
            aria-label="Retour à l'édition"
          >
            <ChevronLeft className="w-5 h-5 -ml-0.5" />
          </button>
        ) : (
          <div className="w-9 h-9" />
        )}

        {/* Small subtle badge */}
        <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#FF6B00]" />
          <span>Invitation Exclusive</span>
        </div>

        {onShareClick ? (
          <button
            type="button"
            onClick={onShareClick}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all"
            aria-label="Partager"
          >
            <Share2 className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-9 h-9" />
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 pt-28 px-5 pb-6 flex-1 flex flex-col justify-end space-y-4">
        {/* Event Title & Date (Screen 3 style) */}
        <div className="text-center space-y-1.5 px-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
            {title}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-white/80 drop-shadow-sm flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-white/70" />
            <span>{dateStr}</span>
          </p>
        </div>

        {/* RSVP 3-Choice Card (Oui / Non / Peut-être) */}
        <div className="rounded-3xl bg-neutral-900/70 backdrop-blur-2xl border border-white/10 p-2 shadow-xl">
          <div className="grid grid-cols-3 gap-1.5">
            {/* OUI */}
            <button
              type="button"
              onClick={() => handleRsvp("yes")}
              className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                rsvpStatus === "yes"
                  ? "bg-white text-black font-bold shadow-md"
                  : "bg-white/5 hover:bg-white/10 text-white/90"
              }`}
            >
              <Check className={`w-4 h-4 ${rsvpStatus === "yes" ? "text-black stroke-[3]" : "text-white/70"}`} />
              <span className="text-xs font-semibold">Oui</span>
            </button>

            {/* NON */}
            <button
              type="button"
              onClick={() => handleRsvp("no")}
              className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                rsvpStatus === "no"
                  ? "bg-white text-black font-bold shadow-md"
                  : "bg-white/5 hover:bg-white/10 text-white/90"
              }`}
            >
              <X className={`w-4 h-4 ${rsvpStatus === "no" ? "text-black stroke-[3]" : "text-white/70"}`} />
              <span className="text-xs font-semibold">Non</span>
            </button>

            {/* PEUT-ÊTRE */}
            <button
              type="button"
              onClick={() => handleRsvp("maybe")}
              className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                rsvpStatus === "maybe"
                  ? "bg-white text-black font-bold shadow-md"
                  : "bg-white/5 hover:bg-white/10 text-white/90"
              }`}
            >
              <HelpCircle className={`w-4 h-4 ${rsvpStatus === "maybe" ? "text-black stroke-[3]" : "text-white/70"}`} />
              <span className="text-xs font-semibold">Peut-être</span>
            </button>
          </div>
        </div>

        {/* Organizer Card (Avatar + Organisé par + Message) */}
        <div className="rounded-3xl bg-neutral-900/70 backdrop-blur-2xl border border-white/10 p-4 shadow-xl flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#007AFF] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
            {getInitials(hostName)}
          </div>
          <div className="overflow-hidden flex-1 text-left">
            <span className="block text-xs font-bold text-white truncate">
              Organisé par {hostName}
            </span>
            <span className="block text-[11px] text-neutral-300 truncate mt-0.5">
              {messageStr}
            </span>
          </div>
        </div>

        {/* Location & Calendar Actions */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Location button */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl bg-neutral-900/70 hover:bg-neutral-800/80 backdrop-blur-2xl border border-white/10 flex items-center gap-2.5 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4 text-rose-400" />
            </div>
            <div className="overflow-hidden flex-1">
              <span className="block text-[10px] uppercase font-bold text-neutral-400">
                Lieu
              </span>
              <span className="block text-xs font-medium text-white truncate">
                {locationStr.split(",")[0] || "Voir le lieu"}
              </span>
            </div>
          </a>

          {/* Add to Calendar button */}
          <button
            type="button"
            onClick={handleDownloadCalendar}
            className="p-3 rounded-2xl bg-neutral-900/70 hover:bg-neutral-800/80 backdrop-blur-2xl border border-white/10 flex items-center gap-2.5 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="overflow-hidden flex-1">
              <span className="block text-[10px] uppercase font-bold text-neutral-400">
                Calendrier
              </span>
              <span className="block text-xs font-medium text-white truncate">
                Ajouter
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Subtle Watermark */}
      <div className="relative z-10 pb-5 text-center">
        <span className="inline-flex items-center gap-1.5 text-[10px] text-neutral-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
          <span>Asuka Card • Apple Invite Experience</span>
        </span>
      </div>
    </div>
  );
}
