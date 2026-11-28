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
  X,
  Compass,
  Check,
} from "lucide-react";
import { Card } from "@/lib/db";
import { formatSocialUrl } from "@/lib/socials";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.07A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.74 4.54 6.29 6.29 0 0 0 1.95-4.54V8.07a8.27 8.27 0 0 0 4.76 1.48v-3.4c-.33 0-.67-.02-1-.06z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 2.002c-4.062 0-6.75 3.03-6.75 6.094 0 1.25.438 2.5 1.156 3.25-.125.438-.594.844-1.281 1.031-.344.094-.656.313-.656.656 0 .5.531.844 1.094.75.938-.156 1.875-.75 2.156-1.125.75.5 1.719.813 2.781.813.25 0 .5-.031.75-.063.25.031.5.063.75.063 1.063 0 2.031-.313 2.781-.813.281.375 1.219.969 2.156 1.125.563.094 1.094-.25 1.094-.75 0-.344-.313-.563-.656-.656-.688-.188-1.156-.594-1.281-1.031.719-.75 1.156-2 1.156-3.25 0-3.063-2.688-6.094-6.75-6.094z" />
    </svg>
  );
}

function NfcContactlessIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M7.5 16.5a6.5 6.5 0 0 0 0-9" />
      <path d="M11 19a10 10 0 0 0 0-14" />
      <path d="M14.5 21.5a13.5 13.5 0 0 0 0-19" />
    </svg>
  );
}

interface GovernmentCardProps {
  card: Partial<Card>;
  interactive?: boolean;
  onContactClick?: (type: string) => void;
  onShareClick?: () => void;
  onQrCodeClick?: () => void;
}

export default function GovernmentCard({
  card,
  interactive = true,
  onContactClick,
  onShareClick,
  onQrCodeClick,
}: GovernmentCardProps) {
  const [showToast, setShowToast] = useState(false);
  const [inAppNotice, setInAppNotice] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const firstName = card.firstName || "";
  const lastName = card.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || "Prénom Nom";
  const title = card.title || "";
  const company = card.company || "";
  const bio = card.bio || "";
  const phone = card.phone || "";
  const whatsapp = card.whatsapp || "";
  const email = card.email || "";
  const website = card.website || "";
  const address = card.address || "";
  const socials = (card.socials as Record<string, string | undefined>) || {};
  const visibility = (card.fieldVisibility as Record<string, boolean | undefined>) || {
    phone: true,
    whatsapp: true,
    email: true,
    website: true,
    address: true,
    bio: true,
    socials: true,
  };

  const cleanWebsite = website.startsWith("http") ? website : `https://${website}`;
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, "");
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase() || "AC";
  const vcardDownloadUrl = card.slug ? `/api/vcard/${card.slug}.vcf` : "#";
  const vcardFilename = card.slug ? `${card.slug}.vcf` : "contact.vcf";

  const hasDockItems = Boolean(
    socials.instagram ||
      socials.tiktok ||
      socials.youtube ||
      socials.snapchat ||
      socials.x ||
      socials.facebook ||
      socials.linkedin ||
      (visibility.website && website)
  );

  const handleAction = (type: string, url?: string) => {
    if (onContactClick) onContactClick(type);
    if (!interactive) return;
    if (url) {
      const destinationUrl = formatSocialUrl(type, url);
      if (destinationUrl.startsWith("http")) {
        window.open(destinationUrl, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = destinationUrl;
      }
    }
  };

  const handleVCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onContactClick) onContactClick("vcard");
    if (!interactive || !card.slug) {
      e.preventDefault();
      return;
    }

    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const ua = navigator.userAgent || "";
      const isIOS = /iPhone|iPad|iPod/i.test(ua);
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

  return (
    <div className="w-full max-w-md mx-auto rounded-[32px] sm:rounded-[36px] overflow-hidden bg-white text-neutral-950 border border-neutral-200/80 shadow-xl relative select-none">
      {/* Top Floating Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (onShareClick) onShareClick();
            else if (typeof navigator !== "undefined" && navigator.share && card.slug) {
              navigator
                .share({
                  title: `${fullName} - Asuka Card`,
                  url: `${window.location.origin}/${card.slug}`,
                })
                .catch(() => {});
            }
          }}
          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-neutral-900 border border-neutral-200/90 shadow-sm backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
          aria-label="Partager la carte"
          title="Partager"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (onQrCodeClick) onQrCodeClick();
          }}
          className="p-2.5 rounded-full bg-white/90 hover:bg-white text-neutral-900 border border-neutral-200/90 shadow-sm backdrop-blur-sm transition-transform active:scale-95 cursor-pointer"
          aria-label="Afficher le QR code"
          title="QR Code"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>

      {/* Top-Left Logo or Institution Pill */}
      {card.logoUrl ? (
        <div className="absolute top-4 left-4 z-20 h-10 px-3 rounded-full bg-white/95 border border-neutral-200/90 shadow-sm backdrop-blur-sm flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.logoUrl}
            alt={company || "Logo"}
            className="max-h-6 max-w-[120px] object-contain"
          />
        </div>
      ) : company ? (
        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/95 border border-neutral-200/90 shadow-sm backdrop-blur-sm text-[11px] font-medium text-neutral-700 flex items-center gap-1.5">
          <Building className="w-3 h-3 text-neutral-500 shrink-0" />
          <span className="truncate max-w-[140px]">{company}</span>
        </div>
      ) : null}

      {/* Cinematic Hero Portrait with Smooth S-Curve White Fade */}
      <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden bg-white">
        {card.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.avatarUrl}
            alt={fullName}
            className="w-full h-full object-cover object-[center_15%]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-neutral-100 to-white">
            <span className="text-6xl font-light text-neutral-400 tracking-wider font-serif">
              {initials}
            </span>
          </div>
        )}

        <div
          className="absolute inset-x-0 bottom-0 h-40 sm:h-44 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 15%, rgba(255,255,255,0.11) 30%, rgba(255,255,255,0.26) 45%, rgba(255,255,255,0.48) 60%, rgba(255,255,255,0.73) 75%, rgba(255,255,255,0.91) 88%, rgba(255,255,255,0.98) 95%, #ffffff 100%)",
          }}
        />
      </div>

      {/* Identity & Content Section */}
      <div className="px-6 pb-7 pt-2 relative z-10 space-y-6 bg-white">
        {/* Name & Title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl sm:text-[32px] font-bold tracking-tight text-neutral-950 leading-tight">
            {fullName}
          </h1>
          {title && (
            <p className="text-sm font-medium text-neutral-500">
              {title}
            </p>
          )}
          {card.logoUrl && company && (
            <p className="text-xs text-neutral-400 pt-0.5">
              {company}
            </p>
          )}
        </div>

        {/* Minimalist Dark-on-White Icon Dock */}
        {hasDockItems && (
          <div className="flex items-center justify-center gap-6 py-1">
            {socials.instagram && (
              <button
                type="button"
                onClick={() => handleAction("social_instagram", socials.instagram)}
                className="text-neutral-700 hover:text-neutral-950 transition-all transform hover:scale-110 active:scale-90 p-1 cursor-pointer"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </button>
            )}

            {socials.tiktok && (
              <button
                type="button"
                onClick={() => handleAction("social_tiktok", socials.tiktok)}
                className="text-neutral-700 hover:text-neutral-950 transition-all transform hover:scale-110 active:scale-90 p-1 cursor-pointer"
                title="TikTok"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </button>
            )}

            {socials.youtube && (
              <button
                type="button"
                onClick={() => handleAction("social_youtube", socials.youtube)}
                className="text-neutral-700 hover:text-neutral-950 transition-all transform hover:scale-110 active:scale-90 p-1 cursor-pointer"
                title="YouTube"
                aria-label="YouTube"
              >
                <YouTubeIcon className="w-5 h-5" />
              </button>
            )}

            {socials.snapchat && (
              <button
                type="button"
                onClick={() => handleAction("social_snapchat", socials.snapchat)}
                className="text-neutral-700 hover:text-neutral-950 transition-all transform hover:scale-110 active:scale-90 p-1 cursor-pointer"
                title="Snapchat"
                aria-label="Snapchat"
              >
                <SnapchatIcon className="w-5 h-5" />
              </button>
            )}

            {socials.x && (
              <button
                type="button"
                onClick={() => handleAction("social_x", socials.x)}
                className="text-neutral-700 hover:text-neutral-950 transition-all transform hover:scale-110 active:scale-90 p-1 cursor-pointer"
                title="X (Twitter)"
                aria-label="X (Twitter)"
              >
                <XTwitterIcon className="w-5 h-5" />
              </button>
            )}

            {socials.facebook && (
              <button
                type="button"
                onClick={() => handleAction("social_facebook", socials.facebook)}
                className="text-neutral-700 hover:text-neutral-950 transition-all transform hover:scale-110 active:scale-90 p-1 cursor-pointer"
                title="Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </button>
            )}

            {socials.linkedin && (
              <button
                type="button"
                onClick={() => handleAction("social_linkedin", socials.linkedin)}
                className="text-neutral-700 hover:text-neutral-950 transition-all transform hover:scale-110 active:scale-90 p-1 cursor-pointer"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </button>
            )}

            {visibility.website && website && (
              <button
                type="button"
                onClick={() => handleAction("website", cleanWebsite)}
                className="text-neutral-700 hover:text-neutral-950 transition-all transform hover:scale-110 active:scale-90 p-1 cursor-pointer"
                title="Site Web"
                aria-label="Site Web"
              >
                <Globe className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Primary CTA Button: Ajouter aux contacts */}
        <div>
          <a
            href={vcardDownloadUrl}
            download={vcardFilename}
            onClick={handleVCardClick}
            className="w-full py-3.5 px-6 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer"
          >
            <UserPlus className="w-4 h-4 stroke-[2.2]" />
            <span>Ajouter aux contacts</span>
          </a>
        </div>

        {/* Direct Action Tiles */}
        <div className="grid grid-cols-2 gap-2.5">
          {visibility.phone && phone && (
            <button
              type="button"
              onClick={() => handleAction("phone", `tel:${phone}`)}
              className="p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-neutral-950 flex items-center gap-3 transition-colors active:scale-[0.99] text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200/70 flex items-center justify-center text-neutral-900 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                  Appeler
                </span>
                <span className="block text-xs font-medium text-neutral-900 truncate">
                  {phone}
                </span>
              </div>
            </button>
          )}

          {visibility.whatsapp && cleanWhatsapp && (
            <button
              type="button"
              onClick={() => handleAction("whatsapp", `https://wa.me/${cleanWhatsapp}`)}
              className="p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-neutral-950 flex items-center gap-3 transition-colors active:scale-[0.99] text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200/70 flex items-center justify-center text-neutral-900 shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                  WhatsApp
                </span>
                <span className="block text-xs font-medium text-neutral-900 truncate">
                  Message direct
                </span>
              </div>
            </button>
          )}

          {visibility.email && email && (
            <button
              type="button"
              onClick={() => handleAction("email", `mailto:${email}`)}
              className="p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-neutral-950 flex items-center gap-3 transition-colors active:scale-[0.99] text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200/70 flex items-center justify-center text-neutral-900 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                  E-mail
                </span>
                <span className="block text-xs font-medium text-neutral-900 truncate">
                  {email}
                </span>
              </div>
            </button>
          )}

          {visibility.website && website && (
            <button
              type="button"
              onClick={() => handleAction("website", cleanWebsite)}
              className="p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 text-neutral-950 flex items-center gap-3 transition-colors active:scale-[0.99] text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200/70 flex items-center justify-center text-neutral-900 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                  Site web
                </span>
                <span className="block text-xs font-medium text-neutral-900 truncate">
                  Visiter
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Bio */}
        {visibility.bio && bio && (
          <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 text-xs sm:text-sm leading-relaxed text-neutral-600 text-center font-normal">
            {bio}
          </div>
        )}

        {/* Address */}
        {visibility.address && address && (
          <div className="p-3.5 rounded-2xl bg-neutral-50/80 border border-neutral-200/70 flex items-center gap-3 text-xs text-neutral-700">
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
                className="text-neutral-400 hover:text-neutral-900 p-1"
                title="Itinéraire"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {/* NFC & Authenticity Footer */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <NfcContactlessIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>Transmis via Asuka NFC</span>
          </div>
          <span className="font-semibold text-neutral-500">
            asuka-card.com{card.slug ? `/${card.slug}` : ""}
          </span>
        </div>
      </div>

      {/* Benin Tricolor Flag Band at Bottom */}
      <div className="flex h-2.5 w-full" aria-label="Drapeau du Bénin">
        <span className="flex-1 bg-[#008751]" />
        <span className="flex-1 bg-[#FCD116]" />
        <span className="flex-1 bg-[#E8112D]" />
      </div>

      {/* iOS Safari toast */}
      {showToast && (
        <div className="fixed top-4 inset-x-4 max-w-sm mx-auto z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Download className="w-5 h-5 text-white shrink-0" />
          <div className="flex-1 text-xs">
            <p className="font-semibold text-white">Fiche contact prête</p>
            <p className="text-white/90 text-[11px] leading-snug">
              Touchez <strong>Télécharger</strong>, puis l&apos;icône de téléchargement en haut pour l&apos;ajouter.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="text-white/80 hover:text-white p-1 rounded-lg"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* In-app browser notice */}
      {inAppNotice && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-black/80 animate-in fade-in duration-200"
          onClick={() => setInAppNotice(null)}
        >
          <div
            className="bg-white text-neutral-900 rounded-t-[28px] max-w-sm w-full p-6 border-t border-x border-neutral-200 relative pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 rounded-full bg-neutral-300 mx-auto -mt-2 mb-4 shrink-0" />
            <button
              type="button"
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
              <h3 className="text-sm font-bold text-neutral-900">Ouvrir dans Safari</h3>
            </div>
            <p className="text-xs text-neutral-600 mb-3.5 leading-relaxed">
              <strong>{inAppNotice}</strong> bloque le téléchargement direct sur iPhone. Appuyez sur{" "}
              <strong>•••</strong> puis <strong>« Ouvrir dans Safari »</strong> pour enregistrer en 1 clic.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && navigator.clipboard && card.slug) {
                  navigator.clipboard.writeText(`${window.location.origin}/${card.slug}`);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 text-white font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
              <span>{copiedLink ? "Lien copié !" : "Copier le lien"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
