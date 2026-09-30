"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Globe,
  MapPin,
  Building,
  UserPlus,
  Share2,
  QrCode,
  ExternalLink,
  Download,
  ArrowUpRight,
  Sparkles,
  X,
  Compass,
  Check,
} from "lucide-react";
import { Card } from "@/lib/db";

// Minimalist SVG for LinkedIn
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

// Minimalist SVG for Instagram
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Minimalist SVG for Facebook
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// Minimalist SVG for X (formerly Twitter)
function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Minimalist SVG for TikTok
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.07A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.74 4.54 6.29 6.29 0 0 0 1.95-4.54V8.07a8.27 8.27 0 0 0 4.76 1.48v-3.4c-.33 0-.67-.02-1-.06z" />
    </svg>
  );
}

// Minimalist SVG for YouTube
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

// Minimalist SVG for Snapchat
function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 2.002c-4.062 0-6.75 3.03-6.75 6.094 0 1.25.438 2.5 1.156 3.25-.125.438-.594.844-1.281 1.031-.344.094-.656.313-.656.656 0 .5.531.844 1.094.75.938-.156 1.875-.75 2.156-1.125.75.5 1.719.813 2.781.813.25 0 .5-.031.75-.063.25.031.5.063.75.063 1.063 0 2.031-.313 2.781-.813.281.375 1.219.969 2.156 1.125.563.094 1.094-.25 1.094-.75 0-.344-.313-.563-.656-.656-.688-.188-1.156-.594-1.281-1.031.719-.75 1.156-2 1.156-3.25 0-3.063-2.688-6.094-6.75-6.094z"/>
    </svg>
  );
}

// Minimalist SVG for Contactless NFC wave
function NfcContactlessIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M7 16a7.5 7.5 0 0 1 0-8" />
      <path d="M10.5 14.5a5 5 0 0 1 0-5" />
      <path d="M14 13a2.5 2.5 0 0 1 0-2" />
    </svg>
  );
}

interface CardPreviewProps {
  card: Partial<Card>;
  onContactClick?: (type: string) => void;
  onShareClick?: () => void;
  onQrCodeClick?: () => void;
  interactive?: boolean;
}

export default function CardPreview({
  card,
  onContactClick,
  onShareClick,
  onQrCodeClick,
  interactive = true,
}: CardPreviewProps) {
  const [showQrInline, setShowQrInline] = useState(false);

  const firstName = card.firstName || "Prénom";
  const lastName = card.lastName || "Nom";
  const fullName = `${firstName} ${lastName}`.trim();
  const title = card.title || "Votre poste ou profession";
  const company = card.company || "Nom de l'entreprise";
  const bio = card.bio || "";
  const phone = card.phone || "";
  const whatsapp = card.whatsapp || "";
  const email = card.email || "";
  const website = card.website || "";
  const address = card.address || "";
  const socials = card.socials || {};
  const visibility = card.fieldVisibility || {
    phone: true,
    whatsapp: true,
    email: true,
    website: true,
    address: true,
    bio: true,
    socials: true,
  };

  const dominantColor = card.dominantColor || "orange";
  const template = card.template || "modern";

  // Format clean URLs
  const cleanWebsite = website.startsWith("http") ? website : `https://${website}`;
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  // Styling maps based on dominant color
  const colorStyles = {
    orange: {
      accent: "#FF6B00",
      accentBg: "bg-[#FF6B00]",
      accentText: "text-[#FF6B00]",
      accentBorder: "border-[#FF6B00]",
      primaryBtn: "bg-[#FF6B00] hover:bg-[#E55F00] text-white",
      secondaryBtn: "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-200",
      badge: "bg-[#FFF3EB] text-[#FF6B00] border border-[#FF6B00]/20",
      iconBg: "bg-[#FFF3EB] text-[#FF6B00]",
      bannerBg: "bg-[#FF6B00]",
    },
    black: {
      accent: "#111111",
      accentBg: "bg-[#111111]",
      accentText: "text-[#111111]",
      accentBorder: "border-[#111111]",
      primaryBtn: "bg-[#111111] hover:bg-neutral-800 text-white",
      secondaryBtn: "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-200",
      badge: "bg-neutral-100 text-[#111111] border border-neutral-300",
      iconBg: "bg-neutral-100 text-[#111111]",
      bannerBg: "bg-[#111111]",
    },
    white: {
      accent: "#111111",
      accentBg: "bg-white",
      accentText: "text-[#111111]",
      accentBorder: "border-neutral-300",
      primaryBtn: "bg-[#111111] hover:bg-neutral-800 text-white",
      secondaryBtn: "bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-300",
      badge: "bg-neutral-50 text-neutral-700 border border-neutral-200",
      iconBg: "bg-neutral-100 text-neutral-800",
      bannerBg: "bg-neutral-100 border-b border-neutral-200",
    },
  }[dominantColor];

  // Template base container styles
  const isMinimalist = template === "minimalist";
  const isExecutive = template === "executive";
  const isCreative = template === "creative";
  const isPremium = template === "premium" || template === "executive";

  const handleAction = (type: string, url?: string) => {
    if (onContactClick) onContactClick(type);
    if (!interactive) return;
    if (url) {
      if (url.startsWith("http")) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
    }
  };

  const [showToast, setShowToast] = useState(false);
  const [inAppNotice, setInAppNotice] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleVCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onContactClick) onContactClick("vcard");
    if (!interactive || !card.slug) {
      e.preventDefault();
      return;
    }

    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const ua = navigator.userAgent || "";
      const isIOS = /iPhone|iPad|iPod/i.test(ua);

      // Detect in-app browsers on iOS that restrict direct vCard downloads
      const isInstagram = /Instagram/i.test(ua);
      const isLinkedIn = /LinkedInApp/i.test(ua);
      const isWhatsApp = /WhatsApp/i.test(ua);
      const isFacebook = /FBAN|FBAV/i.test(ua);
      const isTikTok = /TikTok|musical_ly/i.test(ua);
      const isTwitter = /Twitter/i.test(ua);

      let appName: string | null = null;
      if (isInstagram) appName = "Instagram";
      else if (isWhatsApp) appName = "WhatsApp";
      else if (isLinkedIn) appName = "LinkedIn";
      else if (isFacebook) appName = "Facebook";
      else if (isTikTok) appName = "TikTok";
      else if (isTwitter) appName = "X (Twitter)";
      else if (isIOS && /WebView/i.test(ua)) appName = "l'application";

      if (appName) {
        setInAppNotice(appName);
      } else if (isIOS) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4500);
      }
    }
  };

  const vcardDownloadUrl = card.slug ? `/api/vcard/${card.slug}.vcf` : "#";
  const vcardFilename = card.slug ? `${card.slug}.vcf` : "contact.vcf";

  const renderIosGuideModal = () => {
    return (
      <>
        {/* Subtle, floating non-blocking notification for iOS Safari */}
        {showToast && (
          <div className="fixed top-4 inset-x-4 max-w-sm mx-auto z-50 bg-[#111111]/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-neutral-800 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="w-8 h-8 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center shrink-0 font-bold text-sm">
              ⬇️
            </div>
            <div className="flex-1 text-xs">
              <p className="font-semibold text-white">Fiche contact prête !</p>
              <p className="text-neutral-300 text-[11px] leading-snug">
                Touchez <strong>Télécharger</strong>, puis l'icône <strong>⬇️</strong> en haut pour l'ajouter.
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-lg"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* In-App Browser modal only if in WhatsApp/Instagram */}
        {inAppNotice && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white text-neutral-900 rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-neutral-200 relative animate-in slide-in-from-bottom-4 duration-150">
              <button
                onClick={() => setInAppNotice(null)}
                className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-neutral-900"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Ouvrir dans Safari
                </h3>
              </div>
              <p className="text-xs text-neutral-600 mb-3.5 leading-relaxed">
                <strong>{inAppNotice}</strong> bloque le téléchargement direct sur iPhone.
                Appuyez sur <strong>•••</strong> puis <strong>« Ouvrir dans Safari »</strong> pour enregistrer en 1 clic.
              </p>
              <button
                onClick={() => {
                  if (typeof window !== "undefined" && navigator.clipboard && card.slug) {
                    navigator.clipboard.writeText(`${window.location.origin}/${card.slug}`);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-98"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                <span>{copiedLink ? "Lien copié !" : "Copier le lien"}</span>
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  // Avatar initials fallback
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "AC";

  // DEDICATED CREATIVE RANGE (Threads-Inspired Constellation in Minimalist Mineral Gray & Pure White)
  if (isCreative) {
    return (
      <div className="w-full max-w-md mx-auto rounded-[36px] overflow-hidden bg-white text-neutral-900 border border-neutral-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative select-none flex flex-col justify-between p-5 sm:p-6 min-h-[920px] sm:min-h-[960px]">
        {/* Top 3D Curving Typographic Ribbon (Threads Style - 3 Weaving Ribbons in Solid Mineral Gray) */}
        <div className="absolute top-0 inset-x-0 h-44 sm:h-48 overflow-hidden pointer-events-none z-10">
          <svg className="w-[125%] -ml-[12%] h-full" viewBox="0 0 450 180" fill="none">
            {/* Layer 1: Background curving ribbon in solid light gray */}
            <path
              d="M -30,50 C 110,15 250,110 480,55"
              stroke="#F4F5F7"
              strokeWidth="38"
              strokeLinecap="round"
            />
            <path id="curveBack" d="M -30,54 C 110,19 250,114 480,59" fill="none" />
            <text fill="#A3A3A3" fontSize="12" fontWeight="800" letterSpacing="4">
              <textPath href="#curveBack" startOffset="5%">
                STUDIO PARIS • DESIGN D'ESPACE • INNOVATION • ATELIER •
              </textPath>
            </text>

            {/* Layer 2: 3rd Middle ribbon coming from top center and swooping to settle on the left */}
            <path
              d="M -35,88 C 100,94 195,50 235,-20"
              stroke="#E8EAEF"
              strokeWidth="38"
              strokeLinecap="round"
            />
            <path id="curveMiddle" d="M -35,92 C 100,98 195,54 235,-16" fill="none" />
            <text fill="#8E8E93" fontSize="11" fontWeight="800" letterSpacing="4">
              <textPath href="#curveMiddle" startOffset="6%">
                PROJETS • ESPACE • CONCEPT • MATIÈRES •
              </textPath>
            </text>

            {/* Layer 3: Foreground 3D sweeping ribbon in solid soft mineral gray */}
            <path
              d="M -30,135 C 105,175 250,60 480,120"
              stroke="#ECEEF1"
              strokeWidth="42"
              strokeLinecap="round"
            />
            <path id="curveFront" d="M -30,139 C 105,179 250,64 480,124" fill="none" />
            <text fill="#737373" fontSize="13" fontWeight="800" letterSpacing="4">
              <textPath href="#curveFront" startOffset="3%">
                CREATIVE • ARCHITECTURE • DIRECTION ARTISTIQUE • PORTFOLIO •
              </textPath>
            </text>
          </svg>
        </div>

        {/* Top Controls Floating in Corner (Share & QR Code) */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={() => {
              if (onShareClick) onShareClick();
              else if (navigator.share && card.slug) {
                navigator.share({
                  title: `${fullName} - Asuka Card`,
                  url: `${window.location.origin}/${card.slug}`,
                }).catch(() => {});
              }
            }}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-black border border-neutral-200/90 backdrop-blur-md flex items-center justify-center transition-all active:scale-90"
            aria-label="Partager la carte"
            title="Partager"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (onQrCodeClick) onQrCodeClick();
              else setShowQrInline(!showQrInline);
            }}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-700 hover:text-black border border-neutral-200/90 backdrop-blur-md flex items-center justify-center transition-all active:scale-90"
            aria-label="Afficher le QR code"
            title="QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        {/* Header content with expanded vertical breathing room above and below */}
        <div className="text-center pt-[180px] sm:pt-[200px] mb-11 sm:mb-14 relative z-20 space-y-1.5">
          <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#111111] leading-tight">
            {fullName}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-neutral-500">
            {title}
          </p>
          {company && (
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold">
                <Building className="w-3 h-3 text-neutral-500" />
                <span>{company}</span>
              </span>
            </div>
          )}
        </div>

        {/* Central Constellation of Floating Circles (Tightly Clustered Threads Signature Feature) */}
        <div className="relative w-full max-w-[300px] mx-auto h-[230px] mt-2 mb-1 flex items-center justify-center select-none">
          {/* Central Main Portrait Circle */}
          <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-white border border-neutral-200 overflow-hidden group">
            {card.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.avatarUrl}
                alt={fullName}
                className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center text-3xl font-bold text-neutral-600">
                {initials}
              </div>
            )}
            <div className="absolute inset-0 rounded-full border border-black/5 pointer-events-none" />
          </div>

          {/* Floating Bubble 1: Arrow ↗ (Website / Portfolio) - Large, Tightly Hugging Top Left */}
          {visibility.website && website && (
            <button
              onClick={() => handleAction("website", cleanWebsite)}
              className="absolute top-2 left-9 sm:left-11 w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-white border-2 border-white ring-1 ring-neutral-200/90 flex items-center justify-center text-neutral-800 hover:bg-[#111111] hover:text-white hover:border-[#111111] hover:scale-110 active:scale-95 transition-all z-20 group"
              title="Site web & Portfolio"
            >
              <ArrowUpRight className="w-7 h-7 stroke-[2.2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}

          {/* Floating Bubble 2: Mini Badge "+1" - Compact, Tightly Hugging Top Right */}
          <div
            className="absolute top-5 right-11 sm:right-13 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-neutral-100 border-2 border-white ring-1 ring-neutral-200 flex items-center justify-center text-neutral-700 text-xs font-bold tracking-tight z-20 select-none"
            title="Profil certifié"
          >
            +1
          </div>

          {/* Floating Bubble 3: Phone - Medium, Tightly Hugging Bottom Left */}
          {visibility.phone && phone && (
            <button
              onClick={() => handleAction("phone", `tel:${phone}`)}
              className="absolute bottom-2 left-10 sm:left-12 w-14 h-14 sm:w-[58px] sm:h-[58px] rounded-full bg-white border-2 border-white ring-1 ring-neutral-200/90 flex items-center justify-center text-neutral-800 hover:bg-[#111111] hover:text-white hover:border-[#111111] hover:scale-110 active:scale-95 transition-all z-20"
              title="Appeler"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Floating Bubble 4: WhatsApp - Large, Tightly Hugging Bottom Right */}
          {visibility.whatsapp && cleanWhatsapp && (
            <button
              onClick={() => handleAction("whatsapp", `https://wa.me/${cleanWhatsapp}`)}
              className="absolute bottom-1 right-8 sm:right-10 w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-white border-2 border-white ring-1 ring-neutral-200/90 flex items-center justify-center text-neutral-800 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:scale-110 active:scale-95 transition-all z-20"
              title="WhatsApp"
            >
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}

          {/* Floating Bubble 5: Email - Medium-Compact, Snug Directly Below Avatar */}
          {visibility.email && email && (
            <button
              onClick={() => handleAction("email", `mailto:${email}`)}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-white ring-1 ring-neutral-200/90 flex items-center justify-center text-neutral-800 hover:bg-[#111111] hover:text-white hover:border-[#111111] hover:scale-110 active:scale-95 transition-all z-20"
              title="Envoyer un e-mail"
            >
              <Mail className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Bio / Tagline under constellation with generous editorial breathing room */}
        {visibility.bio && bio && (
          <p className="text-xs sm:text-[13px] text-neutral-500 text-center max-w-[310px] mx-auto leading-relaxed mt-16 sm:mt-20 mb-12 sm:mb-14 line-clamp-3">
            {bio}
          </p>
        )}

        {/* Social dock pills */}
        {visibility.socials && Object.values(socials).some(Boolean) && (
          <div className="flex items-center justify-center gap-3 py-1">
            {socials.instagram && (
              <button
                onClick={() => handleAction("social_instagram", socials.instagram)}
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-400 hover:scale-110 active:scale-90 transition-all"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </button>
            )}
            {socials.linkedin && (
              <button
                onClick={() => handleAction("social_linkedin", socials.linkedin)}
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-400 hover:scale-110 active:scale-90 transition-all"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </button>
            )}
            {socials.x && (
              <button
                onClick={() => handleAction("social_x", socials.x)}
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-400 hover:scale-110 active:scale-90 transition-all"
                title="X (Twitter)"
              >
                <XTwitterIcon className="w-4 h-4" />
              </button>
            )}
            {socials.tiktok && (
              <button
                onClick={() => handleAction("social_tiktok", socials.tiktok)}
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-400 hover:scale-110 active:scale-90 transition-all"
                title="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </button>
            )}
            {socials.youtube && (
              <button
                onClick={() => handleAction("social_youtube", socials.youtube)}
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-400 hover:scale-110 active:scale-90 transition-all"
                title="YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </button>
            )}
            {socials.snapchat && (
              <button
                onClick={() => handleAction("social_snapchat", socials.snapchat)}
                className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-400 hover:scale-110 active:scale-90 transition-all"
                title="Snapchat"
              >
                <SnapchatIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Bottom CTA Pill Button (Minimalist, No Clutter) */}
        <div className="pt-2 w-full">
          <a
            href={vcardDownloadUrl}
            download={vcardFilename}
            onClick={handleVCardClick}
            className="w-full py-3.5 px-6 rounded-full bg-[#111111] hover:bg-neutral-800 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
          >
            <UserPlus className="w-4 h-4 stroke-[2.2]" />
            <span>Ajouter aux contacts</span>
          </a>
        </div>

        {renderIosGuideModal()}
      </div>
    );
  }

  // DEDICATED PREMIUM RANGE (Cinematic Hero Portrait, Pure Pitch Black, Minimalist White Icons)
  if (isPremium) {
    return (
      <div className="w-full max-w-md mx-auto rounded-[32px] sm:rounded-[36px] overflow-hidden bg-black text-white border border-neutral-800/80 shadow-2xl relative select-none">
        {/* Top Floating Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => {
              if (onShareClick) onShareClick();
              else if (navigator.share && card.slug) {
                navigator.share({
                  title: `${fullName} - Asuka Card`,
                  url: `${window.location.origin}/${card.slug}`,
                }).catch(() => {});
              }
            }}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/15 transition-transform active:scale-95 shadow-md"
            aria-label="Partager la carte"
            title="Partager"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (onQrCodeClick) onQrCodeClick();
              else setShowQrInline(!showQrInline);
            }}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/15 transition-transform active:scale-95 shadow-md"
            aria-label="Afficher le QR code"
            title="QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        {/* Company logo or badge if present */}
        {card.logoUrl ? (
          <div className="absolute top-4 left-4 z-20 h-9 px-3 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.logoUrl} alt="Logo" className="max-h-5 max-w-[100px] object-contain filter drop-shadow-sm" />
          </div>
        ) : company ? (
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
            <Building className="w-3 h-3 text-neutral-400" />
            <span className="truncate max-w-[130px]">{company}</span>
          </div>
        ) : null}

        {/* Cinematic Hero Portrait with Clean, Subtle Bottom-Only Fade */}
        <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden bg-neutral-950">
          {card.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card.avatarUrl}
              alt={fullName}
              className="w-full h-full object-cover object-[center_15%]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-neutral-900 to-black">
              <span className="text-6xl font-light text-neutral-600 tracking-wider font-serif">
                {initials}
              </span>
            </div>
          )}

          {/* Delicate bottom gradient fade - keeping the face, chin & neck 100% visible */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Identity & Content Section */}
        <div className="px-6 pb-8 pt-3 relative z-10 space-y-6">
          {/* Name & Title */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl sm:text-[32px] font-bold tracking-tight text-white leading-tight">
              {fullName}
            </h1>
            <p className="text-sm font-medium text-neutral-400">
              {title}
            </p>
          </div>

          {/* Minimalist White Icon Dock */}
          <div className="flex items-center justify-center gap-6 py-1">
            {socials.instagram && (
              <button
                onClick={() => handleAction("social_instagram", socials.instagram)}
                className="text-white/80 hover:text-white transition-all transform hover:scale-115 active:scale-90 p-1"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </button>
            )}

            {socials.tiktok && (
              <button
                onClick={() => handleAction("social_tiktok", socials.tiktok)}
                className="text-white/80 hover:text-white transition-all transform hover:scale-115 active:scale-90 p-1"
                title="TikTok"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </button>
            )}

            {socials.youtube && (
              <button
                onClick={() => handleAction("social_youtube", socials.youtube)}
                className="text-white/80 hover:text-white transition-all transform hover:scale-115 active:scale-90 p-1"
                title="YouTube"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-5 h-5" />
              </button>
            )}

            {socials.snapchat && (
              <button
                onClick={() => handleAction("social_snapchat", socials.snapchat)}
                className="text-white/80 hover:text-white transition-all transform hover:scale-115 active:scale-90 p-1"
                title="Snapchat"
                aria-label="Snapchat"
              >
                <SnapchatIcon className="w-5 h-5" />
              </button>
            )}

            {socials.x && (
              <button
                onClick={() => handleAction("social_x", socials.x)}
                className="text-white/80 hover:text-white transition-all transform hover:scale-115 active:scale-90 p-1"
                title="X (Twitter)"
                aria-label="X (Twitter)"
              >
                <XTwitterIcon className="w-5 h-5" />
              </button>
            )}

            {socials.facebook && (
              <button
                onClick={() => handleAction("social_facebook", socials.facebook)}
                className="text-white/80 hover:text-white transition-all transform hover:scale-115 active:scale-90 p-1"
                title="Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </button>
            )}

            {socials.linkedin && (
              <button
                onClick={() => handleAction("social_linkedin", socials.linkedin)}
                className="text-white/80 hover:text-white transition-all transform hover:scale-115 active:scale-90 p-1"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </button>
            )}

            {visibility.website && website && (
              <button
                onClick={() => handleAction("website", cleanWebsite)}
                className="text-white/80 hover:text-white transition-all transform hover:scale-115 active:scale-90 p-1"
                title="Site Web"
                aria-label="Site Web"
              >
                <Globe className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Primary CTA Button: Ajouter aux contacts */}
          <div>
            <a
              href={vcardDownloadUrl}
              download={vcardFilename}
              onClick={handleVCardClick}
              className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-white/5 transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <UserPlus className="w-4 h-4 stroke-[2.2]" />
              <span>Ajouter aux contacts</span>
            </a>
          </div>

          {/* Direct Action Buttons / Pills (Phone, WhatsApp, Email, Site) */}
          <div className="grid grid-cols-2 gap-2.5">
            {visibility.phone && phone && (
              <button
                onClick={() => handleAction("phone", `tel:${phone}`)}
                className="p-3.5 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 text-white flex items-center gap-3 transition-colors active:scale-[0.99] text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                    Appeler
                  </span>
                  <span className="block text-xs font-medium text-white truncate">
                    {phone}
                  </span>
                </div>
              </button>
            )}

            {visibility.whatsapp && cleanWhatsapp && (
              <button
                onClick={() => handleAction("whatsapp", `https://wa.me/${cleanWhatsapp}`)}
                className="p-3.5 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 text-white flex items-center gap-3 transition-colors active:scale-[0.99] text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                    WhatsApp
                  </span>
                  <span className="block text-xs font-medium text-white truncate">
                    Message direct
                  </span>
                </div>
              </button>
            )}

            {visibility.email && email && (
              <button
                onClick={() => handleAction("email", `mailto:${email}`)}
                className="p-3.5 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 text-white flex items-center gap-3 transition-colors active:scale-[0.99] text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                    E-mail
                  </span>
                  <span className="block text-xs font-medium text-white truncate">
                    {email}
                  </span>
                </div>
              </button>
            )}

            {visibility.website && website && (
              <button
                onClick={() => handleAction("website", cleanWebsite)}
                className="p-3.5 rounded-2xl bg-neutral-900/80 hover:bg-neutral-800/90 border border-neutral-800 text-white flex items-center gap-3 transition-colors active:scale-[0.99] text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                    Site web
                  </span>
                  <span className="block text-xs font-medium text-white truncate">
                    Visiter
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Bio if available */}
          {visibility.bio && bio && (
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 text-xs sm:text-sm leading-relaxed text-neutral-300 text-center font-normal">
              {bio}
            </div>
          )}

          {/* Address if available */}
          {visibility.address && address && (
            <div className="p-3.5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex items-center gap-3 text-xs text-neutral-300">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
              <div className="flex-1 truncate">
                <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                  Adresse
                </span>
                <span className="truncate">{address}</span>
              </div>
              {interactive && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-400 hover:text-white p-1"
                  title="Itinéraire"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* NFC & Authenticity Footer */}
          <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5">
              <NfcContactlessIcon className="w-3.5 h-3.5 text-neutral-400" />
              <span>Transmis via Asuka NFC</span>
            </div>
            <span className="font-semibold text-neutral-400">
              asuka-card.com{card.slug ? `/${card.slug}` : ""}
            </span>
          </div>

          {renderIosGuideModal()}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-md mx-auto rounded-2xl overflow-hidden transition-all duration-300 shadow-sm border ${
        isExecutive
          ? "bg-[#111111] text-white border-neutral-800"
          : "bg-white text-[#111111] border-neutral-200"
      }`}
    >
      {/* Top Banner Accent */}
      <div
        className={`h-24 sm:h-28 w-full relative ${
          isMinimalist
            ? "h-12 sm:h-14 bg-neutral-100 border-b border-neutral-200"
            : isExecutive
            ? "bg-neutral-900 border-b border-neutral-800"
            : isCreative
            ? "bg-gradient-to-r from-[#FF6B00] via-[#111111] to-[#FF6B00]"
            : colorStyles.bannerBg
        }`}
      >
        {/* Top actions (Share & QR Code) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={() => {
              if (onShareClick) onShareClick();
              else if (navigator.share && card.slug) {
                navigator.share({
                  title: `${fullName} - Asuka Card`,
                  url: `${window.location.origin}/${card.slug}`,
                }).catch(() => {});
              }
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-neutral-800 backdrop-blur-sm shadow-sm transition-transform active:scale-95"
            aria-label="Partager la carte"
            title="Partager"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (onQrCodeClick) onQrCodeClick();
              else setShowQrInline(!showQrInline);
            }}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-neutral-800 backdrop-blur-sm shadow-sm transition-transform active:scale-95"
            aria-label="Afficher le QR code"
            title="QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        {/* Company Logo in Banner if available */}
        {card.logoUrl && (
          <div className="absolute top-3 left-4 h-8 max-w-[120px] flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.logoUrl}
              alt="Logo"
              className="max-h-8 max-w-full object-contain filter drop-shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Main Profile Info */}
      <div className="px-6 pb-6 pt-0 relative">
        {/* Avatar */}
        <div className="-mt-12 sm:-mt-14 mb-4 flex items-end justify-between">
          <div className="relative">
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 flex items-center justify-center shadow-sm ${
                isExecutive
                  ? "border-[#111111] bg-neutral-800"
                  : "border-white bg-neutral-100"
              }`}
            >
              {card.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.avatarUrl}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span
                  className={`text-2xl font-bold ${
                    isExecutive ? "text-neutral-300" : "text-neutral-600"
                  }`}
                >
                  {initials}
                </span>
              )}
            </div>
            {/* Verified / active status dot */}
            <div
              className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 ${
                isExecutive ? "border-[#111111]" : "border-white"
              } bg-[#FF6B00]`}
              title="Carte active vérifiée"
            />
          </div>

          {/* Company Badge */}
          {company && (
            <div className="mb-2 max-w-[190px]">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium truncate ${
                  isExecutive
                    ? "bg-neutral-800 text-neutral-300 border border-neutral-700"
                    : colorStyles.badge
                }`}
              >
                <Building className="w-3 h-3 shrink-0" />
                <span className="truncate">{company}</span>
              </span>
            </div>
          )}
        </div>

        {/* Identity Details */}
        <div className="space-y-1 mb-5">
          <h1
            className={`text-2xl font-bold tracking-tight ${
              isExecutive ? "text-white" : "text-[#111111]"
            }`}
          >
            {fullName}
          </h1>
          <p
            className={`text-sm font-medium ${
              isExecutive ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            {title}
          </p>
        </div>

        {/* Bio */}
        {visibility.bio && bio && (
          <div
            className={`p-3.5 rounded-xl mb-5 text-xs sm:text-sm leading-relaxed ${
              isExecutive
                ? "bg-neutral-900 border border-neutral-800 text-neutral-300"
                : "bg-neutral-50 border border-neutral-200 text-neutral-600"
            }`}
          >
            {bio}
          </div>
        )}

        {/* Primary Action Button: Ajouter aux contacts */}
        <div className="mb-6">
          <a
            href={vcardDownloadUrl}
            download={vcardFilename}
            onClick={handleVCardClick}
            className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer ${colorStyles.primaryBtn}`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Ajouter aux contacts</span>
          </a>
        </div>

        {/* Direct Action Grid (Appeler, Email, WhatsApp, Site) */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {visibility.phone && phone && (
            <button
              onClick={() => handleAction("phone", `tel:${phone}`)}
              className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-medium border transition-colors ${
                isExecutive
                  ? "bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                  : "bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  dominantColor === "orange"
                    ? "bg-[#FFF3EB] text-[#FF6B00]"
                    : "bg-neutral-100 text-neutral-900"
                }`}
              >
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                  Appeler
                </span>
                <span className="block truncate">{phone}</span>
              </div>
            </button>
          )}

          {visibility.email && email && (
            <button
              onClick={() => handleAction("email", `mailto:${email}`)}
              className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-medium border transition-colors ${
                isExecutive
                  ? "bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                  : "bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  dominantColor === "orange"
                    ? "bg-[#FFF3EB] text-[#FF6B00]"
                    : "bg-neutral-100 text-neutral-900"
                }`}
              >
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                  E-mail
                </span>
                <span className="block truncate">{email}</span>
              </div>
            </button>
          )}

          {visibility.whatsapp && cleanWhatsapp && (
            <button
              onClick={() => handleAction("whatsapp", `https://wa.me/${cleanWhatsapp}`)}
              className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-medium border transition-colors ${
                isExecutive
                  ? "bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                  : "bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  dominantColor === "orange"
                    ? "bg-[#FFF3EB] text-[#FF6B00]"
                    : "bg-neutral-100 text-neutral-900"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                  WhatsApp
                </span>
                <span className="block truncate">Message direct</span>
              </div>
            </button>
          )}

          {visibility.website && website && (
            <button
              onClick={() => handleAction("website", cleanWebsite)}
              className={`p-3 rounded-xl flex items-center gap-2.5 text-xs font-medium border transition-colors ${
                isExecutive
                  ? "bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                  : "bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${
                  dominantColor === "orange"
                    ? "bg-[#FFF3EB] text-[#FF6B00]"
                    : "bg-neutral-100 text-neutral-900"
                }`}
              >
                <Globe className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                  Site web
                </span>
                <span className="block truncate">Visiter</span>
              </div>
            </button>
          )}
        </div>

        {/* Address if visible */}
        {visibility.address && address && (
          <div
            className={`p-3 rounded-xl mb-6 flex items-start gap-2.5 text-xs border ${
              isExecutive
                ? "bg-neutral-900/60 border-neutral-800 text-neutral-300"
                : "bg-neutral-50/80 border-neutral-200 text-neutral-600"
            }`}
          >
            <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                Adresse
              </span>
              <span>{address}</span>
            </div>
            {interactive && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noreferrer"
                className="text-neutral-400 hover:text-neutral-600"
                title="Itinéraire"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* Social Links */}
        {visibility.socials && Object.values(socials).some(Boolean) && (
          <div className="mb-6">
            <span
              className={`block text-[11px] uppercase tracking-wider font-semibold mb-3 ${
                isExecutive ? "text-neutral-400" : "text-neutral-400"
              }`}
            >
              Réseaux professionnels & sociaux
            </span>
            <div className="flex flex-wrap gap-2">
              {socials.linkedin && (
                <button
                  onClick={() => handleAction("social_linkedin", socials.linkedin)}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors ${
                    isExecutive
                      ? "bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-[#111111] hover:bg-neutral-100"
                  }`}
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </button>
              )}

              {socials.x && (
                <button
                  onClick={() => handleAction("social_x", socials.x)}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors ${
                    isExecutive
                      ? "bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-[#111111] hover:bg-neutral-100"
                  }`}
                  title="X (Twitter)"
                  aria-label="X (Twitter)"
                >
                  <XTwitterIcon className="w-4 h-4" />
                </button>
              )}

              {socials.instagram && (
                <button
                  onClick={() => handleAction("social_instagram", socials.instagram)}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors ${
                    isExecutive
                      ? "bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-[#111111] hover:bg-neutral-100"
                  }`}
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </button>
              )}

              {socials.facebook && (
                <button
                  onClick={() => handleAction("social_facebook", socials.facebook)}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors ${
                    isExecutive
                      ? "bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-[#111111] hover:bg-neutral-100"
                  }`}
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </button>
              )}

              {socials.tiktok && (
                <button
                  onClick={() => handleAction("social_tiktok", socials.tiktok)}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors ${
                    isExecutive
                      ? "bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-[#111111] hover:bg-neutral-100"
                  }`}
                  title="TikTok"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </button>
              )}

              {socials.youtube && (
                <button
                  onClick={() => handleAction("social_youtube", socials.youtube)}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors ${
                    isExecutive
                      ? "bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-[#111111] hover:bg-neutral-100"
                  }`}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </button>
              )}

              {socials.snapchat && (
                <button
                  onClick={() => handleAction("social_snapchat", socials.snapchat)}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-colors ${
                    isExecutive
                      ? "bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800"
                      : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:text-[#111111] hover:bg-neutral-100"
                  }`}
                  title="Snapchat"
                  aria-label="Snapchat"
                >
                  <SnapchatIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Brand Footer Stamp */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Carte vérifiée sur Asuka Card</span>
          <span className="font-semibold text-neutral-500">
            asuka-card.com{card.slug ? `/${card.slug}` : ""}
          </span>
        </div>

        {renderIosGuideModal()}
      </div>
    </div>
  );
}
