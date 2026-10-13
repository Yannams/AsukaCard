"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Camera,
  ChevronLeft,
  Share2,
  QrCode,
  Building,
  Briefcase,
  UserPlus,
  Phone,
  MessageCircle,
  Mail,
  Globe,
  MapPin,
  Check,
  AlertCircle,
  Loader2,
  Trash2,
  Plus,
  Navigation,
  Clipboard,
  ExternalLink,
  Search,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { Card, DominantColor, CardTemplate } from "@/lib/db";
import { formatSocialUrl } from "@/lib/socials";
import CardPreview from "./CardPreview";
import AuthModal from "./AuthModal";
import OrderModal from "./OrderModal";

// Minimalist SVGs matching CardPreview exactly
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

interface CardFormProps {
  initialData?: Partial<Card>;
  isEditing?: boolean;
}

type ModalSheetType =
  | null
  | "capture_info"
  | "company"
  | "phone"
  | "whatsapp"
  | "email"
  | "website"
  | "address"
  | "social_instagram"
  | "social_tiktok"
  | "social_youtube"
  | "social_snapchat"
  | "social_facebook"
  | "social_linkedin"
  | "social_website";

export default function CardForm({ initialData, isEditing = false }: CardFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const photoInputRef = useRef<HTMLInputElement>(null);

  // 1: Edit Mode ("la page à remplir" & "après le remplissage") vs 2: Preview Mode ("l'aperçu adapté")
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [activeSheet, setActiveSheet] = useState<ModalSheetType>(null);
  const [activeCaptureField, setActiveCaptureField] = useState<string | null>(null);

  // Auth & Order Flow states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [savedCardForOrder, setSavedCardForOrder] = useState<Card | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setCurrentUser(data.user);
      })
      .catch(() => {});
  }, []);

  const openCaptureInfo = (field?: string) => {
    setActiveCaptureField(field || null);
    setActiveSheet("capture_info");
  };

  const [isLocating, setIsLocating] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);

  const pasteSocialLink = async (network: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        const clipText = await navigator.clipboard.readText();
        if (clipText) {
          let cleaned = clipText.trim();
          cleaned = cleaned.split("?")[0].replace(/\/$/, "");
          updateSocial(network, cleaned);
        }
      }
    } catch {
      // ignore
    }
  };

  const handleGetGpsLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setErrorMsg("La géolocalisation n'est pas supportée sur ce navigateur.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data && data.address) {
            const addr = data.address;
            const city = addr.city || addr.town || addr.village || addr.county || "";
            const country = addr.country || "";
            const formatted = [city, country].filter(Boolean).join(", ") || data.display_name;
            updateField("address", formatted);
          }
        } catch {
          // ignore
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSearchAddress = async (query: string) => {
    updateField("address", query);
    if (!query || query.trim().length < 3) {
      setAddressSuggestions([]);
      return;
    }
    try {
      setIsSearchingAddress(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=4`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        setAddressSuggestions(data.map((item: any) => item.display_name));
      }
    } catch {
      // ignore
    } finally {
      setIsSearchingAddress(false);
    }
  };

  // Form State initialized empty by default
  const [formData, setFormData] = useState<Partial<Card>>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    title: initialData?.title || "",
    company: initialData?.company || "",
    avatarUrl: initialData?.avatarUrl || "",
    phone: initialData?.phone || "",
    whatsapp: initialData?.whatsapp || "",
    email: initialData?.email || "",
    website: initialData?.website || "",
    address: initialData?.address || "",
    bio: initialData?.bio || "",
    slug: initialData?.slug || "",
    dominantColor: (initialData?.dominantColor || "black") as DominantColor,
    template: (initialData?.template || "premium") as CardTemplate,
    socials: initialData?.socials || {
      instagram: "",
      tiktok: "",
      youtube: "",
      snapchat: "",
      facebook: "",
      linkedin: "",
      website: "",
    },
    fieldVisibility: initialData?.fieldVisibility || {
      phone: true,
      whatsapp: true,
      email: true,
      website: true,
      address: true,
      bio: true,
      socials: true,
    },
  });

  const [fullNameInput, setFullNameInput] = useState(
    initialData ? `${initialData.firstName || ""} ${initialData.lastName || ""}`.trim() : ""
  );

  const handleFullNameChange = (val: string) => {
    setFullNameInput(val);
    const trimmed = val.trim();
    if (!trimmed) {
      setFormData((prev) => ({ ...prev, firstName: "", lastName: "" }));
      return;
    }
    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) {
      setFormData((prev) => ({ ...prev, firstName: parts[0], lastName: "" }));
    } else {
      setFormData((prev) => ({
        ...prev,
        firstName: parts[0],
        lastName: parts.slice(1).join(" "),
      }));
    }
  };

  // Generate unguessable 8-character token if needed
  const generateSecureSlug = () => {
    const chars = "abcdefghjkmnpqrstuvwxyz23456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, slug: result }));
  };

  useEffect(() => {
    if (!formData.slug && !isEditing) {
      generateSecureSlug();
    }
  }, []);

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocial = (network: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socials: {
        ...(prev.socials as any),
        [network]: value,
      },
    }));
  };

  const handleFileUpload = async (file: File) => {
    setIsUploadingPhoto(true);
    setErrorMsg("");

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Échec du téléchargement");
      }

      updateField("avatarUrl", data.url);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Impossible de télécharger l'image");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!formData.firstName?.trim() && !formData.lastName?.trim()) {
      setErrorMsg("Veuillez renseigner votre nom directement sur la carte.");
      return;
    }

    if (!formData.slug?.trim()) {
      generateSecureSlug();
    }

    // Check if user is logged in
    try {
      const authRes = await fetch("/api/auth/me");
      const authData = await authRes.json();
      if (!authData.user) {
        setIsAuthModalOpen(true);
        return;
      }
      setCurrentUser(authData.user);
      await executeSaveAndOrder(authData.user);
    } catch {
      setIsAuthModalOpen(true);
    }
  };

  const executeSaveAndOrder = async (user?: any) => {
    startTransition(async () => {
      try {
        const endpoint = isEditing && initialData?.id
          ? `/api/cards/${initialData.id}`
          : "/api/cards";
        const method = isEditing ? "PUT" : "POST";

        const res = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Une erreur est survenue.");
        }

        const savedCard = data.card || {
          ...formData,
          id: initialData?.id || data.id || "card_tmp",
          userId: user?.id || user?.userId,
        };

        setSavedCardForOrder(savedCard);

        if (isEditing) {
          setSuccessMsg("Carte mise à jour avec succès !");
          setTimeout(() => {
            router.push("/dashboard");
            router.refresh();
          }, 800);
        } else {
          setSuccessMsg("Profil enregistré ! Finalisez votre commande et paiement.");
          // Trigger FedaPay physical card order modal immediately
          setIsOrderModalOpen(true);
        }
      } catch (err: unknown) {
        const error = err as Error;
        setErrorMsg(error.message || "Échec de l'enregistrement de la carte.");
      }
    });
  };

  const handleAuthSuccess = async (user: any) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    await executeSaveAndOrder(user);
  };

  const socials = (formData.socials as any) || {};
  const fullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();
  const hasCaptureInfo = Boolean(
    formData.phone ||
    formData.whatsapp ||
    formData.email ||
    formData.website ||
    Object.values(socials).some(Boolean)
  );

  // =========================================================================
  // ÉCRAN 3 : L'APERÇU ADAPTÉ POUR NOTRE TEMPLATE (Identique à l'image fournie)
  // =========================================================================
  if (viewMode === "preview") {
    return (
      <div className="w-full max-w-md mx-auto space-y-4">
        {/* Floating Return Pill Bar */}
        <div className="flex items-center justify-between px-2 gap-2">
          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white border border-white/10 text-xs font-semibold backdrop-blur-md active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 -ml-1" />
            <span>Modifier la carte</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="px-4 py-1.5 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold shadow-lg active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1 cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CreditCard className="w-3.5 h-3.5" />
              )}
              <span>{isPending ? "Publication..." : isEditing ? "Enregistrer" : "Publier & Commander"}</span>
            </button>
          </div>
        </div>

        {/* The Exact Final Card (Template Premium Asuka Card) */}
        <CardPreview
          card={formData}
          interactive={true}
          onShareClick={() => handleSubmit()}
        />

        {/* Primary Action Button */}
        <div className="px-2 pt-2 pb-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full py-3.5 px-6 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <CreditCard className="w-4 h-4 text-white" />
            )}
            <span>{isEditing ? "Enregistrer les modifications" : "Publier et Commander ma carte"}</span>
          </button>
        </div>

        {/* Physical NFC Card Order Modal */}
        {isOrderModalOpen && savedCardForOrder && (
          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={() => {
              setIsOrderModalOpen(false);
              router.push("/dashboard");
            }}
            availableCards={[savedCardForOrder]}
            preselectedCard={savedCardForOrder}
            initialColor={formData.dominantColor === "white" ? "BLANC_PERLE" : "NOIR_MAT"}
            onOrderSuccess={() => {
              router.push("/dashboard");
            }}
          />
        )}

        {/* Inline Auth Modal */}
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={handleAuthSuccess}
            title="Connectez-vous pour finaliser votre commande"
            subtitle="Vos informations sont sauvegardées en toute sécurité. Connectez-vous pour régler votre carte via FedaPay."
          />
        )}
      </div>
    );
  }

  // =========================================================================
  // ÉCRANS 1 & 2 : LA PAGE À REMPLIR & APRÈS LE REMPLISSAGE (APPLE INVITE FLOW)
  // =========================================================================
  return (
    <div className="w-full max-w-md mx-auto space-y-4 pb-16">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={photoInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />

      {/* Main Card Container (Style Richard Odjrado) */}
      <div className="w-full rounded-[36px] overflow-hidden bg-black text-white border border-neutral-800/80 shadow-2xl relative select-none">
        {/* Top Header Floating Controls */}
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between gap-2">
          {/* Company Badge (Top Left) */}
          <button
            type="button"
            onClick={() => setActiveSheet("company")}
            className="px-3 py-1 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-medium text-neutral-300 flex items-center gap-1.5 active:scale-95 transition-all"
            title="Modifier le nom de l'entreprise"
          >
            <Building className="w-3 h-3 text-neutral-400" />
            <span className="truncate max-w-[120px] font-semibold">
              {formData.company || "+ Entreprise"}
            </span>
          </button>

          {/* Right side: Aperçu */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className="px-3.5 py-1 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-bold backdrop-blur-md shadow-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Aperçu</span>
            </button>
          </div>
        </div>

        {/* Hero Portrait Photo Area with Delicate Bottom Fade */}
        <div className="relative w-full h-[380px] sm:h-[420px] overflow-hidden bg-neutral-950 flex flex-col items-center justify-center">
          {formData.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={formData.avatarUrl}
              alt={fullName}
              className="w-full h-full object-cover object-[center_15%]"
            />
          ) : (
            // State 1: Placeholder when photo is not uploaded yet
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-neutral-400 mb-3 shadow-lg">
                <Camera className="w-7 h-7 stroke-[1.8] text-white" />
              </div>
              <p className="text-sm font-semibold text-white">Photo portrait</p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Une photo nette de face pour votre carte
              </p>
            </div>
          )}

          {/* Floating Button: "Ajouter une photo" or "Modifier la photo" */}
          <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              disabled={isUploadingPhoto}
              className="px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold flex items-center gap-2 shadow-2xl active:scale-95 transition-all"
            >
              {isUploadingPhoto ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Téléchargement...</span>
                </>
              ) : (
                <>
                  <Camera className="w-3.5 h-3.5" />
                  <span>{formData.avatarUrl ? "Modifier la photo" : "Ajouter une photo"}</span>
                </>
              )}
            </button>
          </div>

          {/* Delicate bottom gradient fade into pitch black body */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
        </div>

        {/* Identity & Content Section (Direct in-place inputs!) */}
        <div className="px-6 pb-8 pt-2 relative z-10 space-y-6">
          {/* Identity Card (Apple Invites Frosted Card Style with Dividers) */}
          <div className="rounded-[32px] bg-neutral-900/70 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl text-white space-y-3.5">
            {/* Row 1: Nom et Prénom en une seule fois */}
            <div className="py-1">
              <input
                type="text"
                value={fullNameInput}
                onChange={(e) => handleFullNameChange(e.target.value)}
                placeholder="Nom et Prénom"
                className="w-full text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-white placeholder:text-white/35 bg-transparent border-none focus:outline-none"
              />
            </div>

            <div className="border-t border-white/10" />

            {/* Row 2: Poste / Titre */}
            <div className="flex flex-col items-center justify-center py-1">
              <div className="flex items-center gap-1.5 text-white/50 mb-1">
                <Briefcase className="w-4 h-4 text-white/60" />
              </div>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Poste ou Titre (ex: Fondateur & CEO)"
                className="w-full text-center text-xs sm:text-sm font-medium text-white/90 placeholder:text-white/35 bg-transparent border-none focus:outline-none"
              />
            </div>

            <div className="border-t border-white/10" />

            {/* Row 3: Nom de l'entreprise */}
            <div className="flex flex-col items-center justify-center py-1">
              <div className="flex items-center gap-1.5 text-white/50 mb-1">
                <Building className="w-4 h-4 text-white/60" />
              </div>
              <input
                type="text"
                value={formData.company || ""}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="Nom de l'entreprise (ex: AS WORLD TECH)"
                className="w-full text-center text-xs sm:text-sm font-medium text-white/90 placeholder:text-white/35 bg-transparent border-none focus:outline-none"
              />
            </div>
          </div>

          {/* Icônes des réseaux sociaux ajoutés (apparaissent progressivement au fur et à mesure) */}
          {Object.entries(socials || {}).some(([_, val]) => Boolean(val)) && (
            <div className="flex items-center justify-center gap-3.5 py-1.5 flex-wrap animate-in fade-in zoom-in-95 duration-300">
              {socials.instagram && (
                <button
                  type="button"
                  onClick={() => openCaptureInfo("instagram")}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-pink-400 hover:scale-110 active:scale-95 transition-all shadow-md"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </button>
              )}
              {socials.tiktok && (
                <button
                  type="button"
                  onClick={() => openCaptureInfo("tiktok")}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-md"
                  title="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </button>
              )}
              {socials.youtube && (
                <button
                  type="button"
                  onClick={() => openCaptureInfo("youtube")}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-red-500 hover:scale-110 active:scale-95 transition-all shadow-md"
                  title="YouTube"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </button>
              )}
              {socials.snapchat && (
                <button
                  type="button"
                  onClick={() => openCaptureInfo("snapchat")}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-amber-300 hover:scale-110 active:scale-95 transition-all shadow-md"
                  title="Snapchat"
                >
                  <SnapchatIcon className="w-4 h-4" />
                </button>
              )}
              {socials.facebook && (
                <button
                  type="button"
                  onClick={() => openCaptureInfo("facebook")}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-blue-500 hover:scale-110 active:scale-95 transition-all shadow-md"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </button>
              )}
              {socials.linkedin && (
                <button
                  type="button"
                  onClick={() => openCaptureInfo("linkedin")}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-sky-400 hover:scale-110 active:scale-95 transition-all shadow-md"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Bouton Ajouter mes informations (ouvre la Bottom Sheet) */}
          <div>
            <button
              type="button"
              onClick={() => openCaptureInfo("phone")}
              className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-neutral-100 active:scale-98 text-black font-semibold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-white/10 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4 stroke-[2.2] text-black" />
              <span>{hasCaptureInfo ? "Modifier mes informations" : "Ajouter mes informations"}</span>
            </button>
          </div>

          {/* Bio Card (Dark Rounded Box directly on the card) */}
          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
              Présentation / Biographie
            </label>
            <textarea
              rows={3}
              value={formData.bio || ""}
              onChange={(e) => updateField("bio", e.target.value)}
              placeholder="Entrepreneur & Innovateur Tech. Fondateur & CEO..."
              className="w-full text-xs sm:text-sm leading-relaxed text-neutral-300 placeholder:text-neutral-600 bg-transparent border-none focus:outline-none resize-none"
            />
          </div>

          {/* Address Card */}
          <button
            type="button"
            onClick={() => setActiveSheet("address")}
            className="w-full p-3.5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800/80 text-left flex items-center gap-3 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
              <MapPin className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="overflow-hidden flex-1">
              <span className="block text-[10px] text-neutral-400 uppercase font-semibold">
                Adresse
              </span>
              <span className="block text-xs font-medium text-white truncate">
                {formData.address || "+ Ajouter une adresse (Paris, Cotonou...)"}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 backdrop-blur-md">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span className="flex-1">{errorMsg}</span>
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full py-3.5 px-6 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Enregistrement en cours...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 text-white" />
              <span>{isEditing ? "Enregistrer les modifications" : "Publier et Commander ma carte"}</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          IOS-STYLE BOTTOM SHEETS (POPOVERS) FOR QUICK EDITS
         ========================================================================= */}
      {activeSheet && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveSheet(null)}
        >
          <div
            className={`w-full ${
              activeSheet === "capture_info" ? "max-w-lg" : "max-w-md"
            } bg-neutral-900 border-t border-x border-neutral-800 text-white rounded-t-[32px] rounded-b-none p-5 sm:p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[88vh] overflow-y-auto pb-8`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barre de poignée (drag handle) pour l'effet Bottom Sheet mobile */}
            <div className="w-12 h-1.5 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors mx-auto -mt-1 mb-2.5 shrink-0" />

            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              {activeSheet === "capture_info" ? (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                    <UserPlus className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Ajouter mes informations
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Coordonnées directes et réseaux sociaux
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  {activeSheet === "address" && (
                    <div className="w-8 h-8 rounded-xl bg-[#FF6B00]/15 flex items-center justify-center text-[#FF6B00] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {activeSheet === "company" && "Nom de l'entreprise"}
                      {activeSheet === "address" && "Adresse & Localisation Maps"}
                      {activeSheet === "phone" && "Numéro de téléphone"}
                      {activeSheet === "whatsapp" && "Numéro WhatsApp"}
                      {activeSheet === "email" && "Adresse E-mail"}
                      {activeSheet === "website" && "Site internet"}
                      {activeSheet === "social_instagram" && "Profil Instagram"}
                      {activeSheet === "social_tiktok" && "Compte TikTok"}
                      {activeSheet === "social_youtube" && "Chaîne YouTube"}
                      {activeSheet === "social_snapchat" && "Compte Snapchat"}
                      {activeSheet === "social_facebook" && "Page ou profil Facebook"}
                      {activeSheet === "social_linkedin" && "Profil LinkedIn"}
                    </h3>
                    {activeSheet === "address" && (
                      <p className="text-[11px] text-neutral-400">
                        GPS automatique ou recherche d'adresse
                      </p>
                    )}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setActiveSheet(null)}
                className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal dédiée uniquement aux informations de la capture */}
            {activeSheet === "capture_info" ? (
              <div className="space-y-4 text-left">
                {/* 1. Coordonnées directes (Appeler, WhatsApp, Email, Site Web) */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">
                      Coordonnées directes
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {/* Téléphone (Appeler) */}
                    <div>
                      <label className="text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Téléphone (Appeler)</span>
                      </label>
                      <input
                        type="tel"
                        autoFocus={activeCaptureField === "phone"}
                        value={formData.phone || ""}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="ex: +229 67 08 83 03"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                      </label>
                      <input
                        type="tel"
                        autoFocus={activeCaptureField === "whatsapp"}
                        value={formData.whatsapp || ""}
                        onChange={(e) => updateField("whatsapp", e.target.value)}
                        placeholder="ex: 22967088303 (avec indicatif)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* E-mail */}
                    <div>
                      <label className="text-xs font-medium text-neutral-300 mb-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-sky-400" />
                        <span>E-mail</span>
                      </label>
                      <input
                        type="email"
                        autoFocus={activeCaptureField === "email"}
                        value={formData.email || ""}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="ex: contact@exemple.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Site Web */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Site Web</span>
                        </label>
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              const t = await navigator.clipboard.readText();
                              if (t) updateField("website", t.trim());
                            } catch {}
                          }}
                          className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] text-neutral-300 flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <Clipboard className="w-3 h-3" />
                          <span>Coller</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        autoFocus={activeCaptureField === "website"}
                        value={formData.website || ""}
                        onChange={(e) => updateField("website", e.target.value)}
                        placeholder="ex: https://monsite.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Réseaux sociaux (les 6 de la capture) */}
                <div className="pt-2 border-t border-neutral-800">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">
                      Réseaux sociaux
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      Cliquez sur Coller pour insérer le lien
                    </span>
                  </div>
                  <div className="space-y-3">
                    {/* Instagram */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                          <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                          <span>Instagram</span>
                        </label>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const cur = socials.instagram || "";
                              updateSocial("instagram", cur.startsWith("@") ? cur : `@${cur}`);
                            }}
                            className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-mono text-neutral-200 active:scale-95 transition-all"
                            title="Ajouter @"
                          >
                            @
                          </button>
                          <button
                            type="button"
                            onClick={() => pasteSocialLink("instagram")}
                            className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] text-neutral-300 flex items-center gap-1 active:scale-95 transition-all"
                          >
                            <Clipboard className="w-3 h-3" />
                            <span>Coller</span>
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        autoFocus={activeCaptureField === "instagram"}
                        value={socials.instagram || ""}
                        onChange={(e) => updateSocial("instagram", e.target.value)}
                        placeholder="ex: @votrecompte"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                      />
                      {socials.instagram && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-pink-400/90 font-mono">
                          <span className="text-neutral-500">Lien :</span>
                          <span className="truncate">{formatSocialUrl("instagram", socials.instagram)}</span>
                        </div>
                      )}
                    </div>

                    {/* TikTok */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                          <TikTokIcon className="w-3.5 h-3.5 text-white" />
                          <span>TikTok</span>
                        </label>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const cur = socials.tiktok || "";
                              updateSocial("tiktok", cur.startsWith("@") ? cur : `@${cur}`);
                            }}
                            className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-mono text-neutral-200 active:scale-95 transition-all"
                            title="Ajouter @"
                          >
                            @
                          </button>
                          <button
                            type="button"
                            onClick={() => pasteSocialLink("tiktok")}
                            className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] text-neutral-300 flex items-center gap-1 active:scale-95 transition-all"
                          >
                            <Clipboard className="w-3 h-3" />
                            <span>Coller</span>
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        autoFocus={activeCaptureField === "tiktok"}
                        value={socials.tiktok || ""}
                        onChange={(e) => updateSocial("tiktok", e.target.value)}
                        placeholder="ex: @votrecompte"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                      />
                      {socials.tiktok && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-neutral-300 font-mono">
                          <span className="text-neutral-500">Lien :</span>
                          <span className="truncate">{formatSocialUrl("tiktok", socials.tiktok)}</span>
                        </div>
                      )}
                    </div>

                    {/* YouTube */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                          <YouTubeIcon className="w-3.5 h-3.5 text-red-500" />
                          <span>YouTube</span>
                        </label>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const cur = socials.youtube || "";
                              updateSocial("youtube", cur.startsWith("@") ? cur : `@${cur}`);
                            }}
                            className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-mono text-neutral-200 active:scale-95 transition-all"
                            title="Ajouter @"
                          >
                            @
                          </button>
                          <button
                            type="button"
                            onClick={() => pasteSocialLink("youtube")}
                            className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] text-neutral-300 flex items-center gap-1 active:scale-95 transition-all"
                          >
                            <Clipboard className="w-3 h-3" />
                            <span>Coller</span>
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        autoFocus={activeCaptureField === "youtube"}
                        value={socials.youtube || ""}
                        onChange={(e) => updateSocial("youtube", e.target.value)}
                        placeholder="ex: @chaine ou lien URL"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                      />
                      {socials.youtube && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-red-400 font-mono">
                          <span className="text-neutral-500">Lien :</span>
                          <span className="truncate">{formatSocialUrl("youtube", socials.youtube)}</span>
                        </div>
                      )}
                    </div>

                    {/* Snapchat */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                          <SnapchatIcon className="w-3.5 h-3.5 text-amber-300" />
                          <span>Snapchat</span>
                        </label>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const cur = socials.snapchat || "";
                              updateSocial("snapchat", cur.startsWith("@") ? cur : `@${cur}`);
                            }}
                            className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-mono text-neutral-200 active:scale-95 transition-all"
                            title="Ajouter @"
                          >
                            @
                          </button>
                          <button
                            type="button"
                            onClick={() => pasteSocialLink("snapchat")}
                            className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] text-neutral-300 flex items-center gap-1 active:scale-95 transition-all"
                          >
                            <Clipboard className="w-3 h-3" />
                            <span>Coller</span>
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        autoFocus={activeCaptureField === "snapchat"}
                        value={socials.snapchat || ""}
                        onChange={(e) => updateSocial("snapchat", e.target.value)}
                        placeholder="ex: pseudo_snap"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                      />
                      {socials.snapchat && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-300 font-mono">
                          <span className="text-neutral-500">Lien :</span>
                          <span className="truncate">{formatSocialUrl("snapchat", socials.snapchat)}</span>
                        </div>
                      )}
                    </div>

                    {/* Facebook */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                          <FacebookIcon className="w-3.5 h-3.5 text-blue-500" />
                          <span>Facebook</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => pasteSocialLink("facebook")}
                          className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] text-neutral-300 flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <Clipboard className="w-3 h-3" />
                          <span>Coller</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        autoFocus={activeCaptureField === "facebook"}
                        value={socials.facebook || ""}
                        onChange={(e) => updateSocial("facebook", e.target.value)}
                        placeholder="ex: page ou profil Facebook"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                      />
                      {socials.facebook && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-blue-400 font-mono">
                          <span className="text-neutral-500">Lien :</span>
                          <span className="truncate">{formatSocialUrl("facebook", socials.facebook)}</span>
                        </div>
                      )}
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                          <LinkedInIcon className="w-3.5 h-3.5 text-sky-400" />
                          <span>LinkedIn</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => pasteSocialLink("linkedin")}
                          className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[10px] text-neutral-300 flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <Clipboard className="w-3 h-3" />
                          <span>Coller</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        autoFocus={activeCaptureField === "linkedin"}
                        value={socials.linkedin || ""}
                        onChange={(e) => updateSocial("linkedin", e.target.value)}
                        placeholder="ex: linkedin.com/in/profil"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                      />
                      {socials.linkedin && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] text-sky-400 font-mono">
                          <span className="text-neutral-500">Lien :</span>
                          <span className="truncate">{formatSocialUrl("linkedin", socials.linkedin)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSheet(null)}
                    className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 active:scale-98 text-black text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Valider mes informations</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {activeSheet === "company" && (
                    <input
                      type="text"
                      autoFocus
                      value={formData.company || ""}
                      onChange={(e) => updateField("company", e.target.value)}
                      placeholder="ex: AS WORLD TECH"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}

                  {activeSheet === "address" && (
                    <div className="space-y-3">
                      {/* GPS 1-clic */}
                      <button
                        type="button"
                        onClick={handleGetGpsLocation}
                        disabled={isLocating}
                        className="w-full py-2.5 px-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
                      >
                        {isLocating ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Détection GPS en cours...</span>
                          </>
                        ) : (
                          <>
                            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                            <span>📍 Utiliser ma position actuelle (GPS)</span>
                          </>
                        )}
                      </button>

                      {/* Champ de recherche avec autocomplétion Maps */}
                      <div className="relative">
                        <div className="relative">
                          <input
                            type="text"
                            autoFocus
                            value={formData.address || ""}
                            onChange={(e) => handleSearchAddress(e.target.value)}
                            placeholder="Tapez une ville ou adresse (ex: Cotonou, Paris)..."
                            className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:border-white focus:outline-none"
                          />
                          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          {isSearchingAddress && (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2" />
                          )}
                        </div>

                        {/* Suggestions de recherche Maps */}
                        {addressSuggestions.length > 0 && (
                          <div className="mt-2 rounded-xl bg-neutral-800 border border-neutral-700 divide-y divide-neutral-700/60 overflow-hidden shadow-xl max-h-48 overflow-y-auto">
                            {addressSuggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  updateField("address", suggestion);
                                  setAddressSuggestions([]);
                                }}
                                className="w-full p-2.5 text-left text-xs text-neutral-200 hover:bg-neutral-700 flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                                <span className="truncate">{suggestion}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Lien direct Google Maps */}
                      {formData.address && (
                        <div className="pt-1 flex items-center justify-between">
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(formData.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-[#FF6B00] hover:underline font-medium"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Voir le repère sur Google Maps</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {activeSheet === "phone" && (
                    <input
                      type="tel"
                      autoFocus
                      value={formData.phone || ""}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="ex: +229 67 08 83 03"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}

                  {activeSheet === "whatsapp" && (
                    <input
                      type="tel"
                      autoFocus
                      value={formData.whatsapp || ""}
                      onChange={(e) => updateField("whatsapp", e.target.value)}
                      placeholder="ex: 22967088303 (avec indicatif)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}

                  {activeSheet === "email" && (
                    <input
                      type="email"
                      autoFocus
                      value={formData.email || ""}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="ex: rodjrado-ceo@asworldtech.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}

                  {activeSheet === "website" && (
                    <input
                      type="text"
                      autoFocus
                      value={formData.website || ""}
                      onChange={(e) => updateField("website", e.target.value)}
                      placeholder="ex: https://asworldtech.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}

                  {activeSheet === "social_instagram" && (
                    <input
                      type="text"
                      autoFocus
                      value={socials.instagram || ""}
                      onChange={(e) => updateSocial("instagram", e.target.value)}
                      placeholder="ex: richardodjrado"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}

                  {activeSheet === "social_tiktok" && (
                    <input
                      type="text"
                      autoFocus
                      value={socials.tiktok || ""}
                      onChange={(e) => updateSocial("tiktok", e.target.value)}
                      placeholder="ex: richardodjrado"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}

                  {activeSheet === "social_youtube" && (
                    <input
                      type="text"
                      autoFocus
                      value={socials.youtube || ""}
                      onChange={(e) => updateSocial("youtube", e.target.value)}
                      placeholder="ex: @richardodjrado"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}

                  {activeSheet === "social_snapchat" && (
                    <input
                      type="text"
                      autoFocus
                      value={socials.snapchat || ""}
                      onChange={(e) => updateSocial("snapchat", e.target.value)}
                      placeholder="ex: richardodjrado"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}

                  {activeSheet === "social_facebook" && (
                    <input
                      type="text"
                      autoFocus
                      value={socials.facebook || ""}
                      onChange={(e) => updateSocial("facebook", e.target.value)}
                      placeholder="ex: richardodjrado"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}

                  {activeSheet === "social_linkedin" && (
                    <input
                      type="text"
                      autoFocus
                      value={socials.linkedin || ""}
                      onChange={(e) => updateSocial("linkedin", e.target.value)}
                      placeholder="ex: richardodjrado"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-sm text-white focus:border-white focus:outline-none"
                    />
                  )}
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveSheet(null)}
                    className="px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold"
                  >
                    Valider
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Physical NFC Card Order Modal */}
      {isOrderModalOpen && savedCardForOrder && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => {
            setIsOrderModalOpen(false);
            router.push("/dashboard");
          }}
          availableCards={[savedCardForOrder]}
          preselectedCard={savedCardForOrder}
          initialColor={formData.dominantColor === "white" ? "BLANC_PERLE" : "NOIR_MAT"}
          onOrderSuccess={() => {
            router.push("/dashboard");
          }}
        />
      )}

      {/* Inline Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          title="Connectez-vous pour finaliser votre commande"
          subtitle="Vos informations sont sauvegardées en toute sécurité. Connectez-vous pour régler votre carte via FedaPay."
        />
      )}
    </div>
  );
}
