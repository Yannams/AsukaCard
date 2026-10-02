"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  Camera,
  Image as ImageIcon,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  MapPin,
  Palette,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Smartphone,
  Monitor,
  ArrowRight,
  ArrowLeft,
  Upload,
  Loader2,
  Sparkles,
} from "lucide-react";
import CardPreview from "./CardPreview";
import { Card, DominantColor, CardTemplate } from "@/lib/db";

interface CardFormProps {
  initialData?: Partial<Card>;
  isEditing?: boolean;
}

export default function CardForm({ initialData, isEditing = false }: CardFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form State
  const [formData, setFormData] = useState<Partial<Card>>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    title: initialData?.title || "",
    company: initialData?.company || "",
    bio: initialData?.bio || "",
    avatarUrl: initialData?.avatarUrl || "",
    logoUrl: initialData?.logoUrl || "",
    phone: initialData?.phone || "",
    whatsapp: initialData?.whatsapp || "",
    email: initialData?.email || "",
    website: initialData?.website || "",
    address: initialData?.address || "",
    slug: initialData?.slug || "",
    dominantColor: initialData?.dominantColor || "orange",
    template: initialData?.template || "modern",
    fieldVisibility: initialData?.fieldVisibility || {
      phone: true,
      whatsapp: true,
      email: true,
      website: true,
      address: true,
      bio: true,
      socials: true,
    },
    socials: initialData?.socials || {
      linkedin: "",
      instagram: "",
      facebook: "",
      tiktok: "",
      x: "",
    },
  });

  // Slug check state
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [slugMessage, setSlugMessage] = useState("");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  // Auto-generate slug from names if user hasn't explicitly set one
  const handleAutoSlug = () => {
    if (!formData.firstName && !formData.lastName) return;
    const combined = `${formData.firstName || ""} ${formData.lastName || ""}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (combined) {
      updateField("slug", combined);
      checkSlugAvailability(combined);
    }
  };

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

  const toggleVisibility = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      fieldVisibility: {
        phone: (prev.fieldVisibility as any)?.phone ?? true,
        whatsapp: (prev.fieldVisibility as any)?.whatsapp ?? true,
        email: (prev.fieldVisibility as any)?.email ?? true,
        website: (prev.fieldVisibility as any)?.website ?? true,
        address: (prev.fieldVisibility as any)?.address ?? true,
        bio: (prev.fieldVisibility as any)?.bio ?? true,
        socials: (prev.fieldVisibility as any)?.socials ?? true,
        [field]: !(prev.fieldVisibility as any)?.[field],
      },
    }));
  };

  // Check slug availability
  const checkSlugAvailability = async (slugToCheck: string) => {
    if (!slugToCheck || slugToCheck.trim().length < 3) {
      setSlugStatus("idle");
      setSlugMessage("");
      return;
    }
    setSlugStatus("checking");
    try {
      const url = `/api/check-slug?slug=${encodeURIComponent(slugToCheck.trim())}${
        initialData?.id ? `&cardId=${initialData.id}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.available) {
        setSlugStatus("available");
        setSlugMessage(data.message);
      } else {
        setSlugStatus("unavailable");
        setSlugMessage(data.error || data.message);
      }
    } catch {
      setSlugStatus("idle");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.slug) {
        checkSlugAvailability(formData.slug);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [formData.slug]);

  // Handle image upload
  const handleFileUpload = async (
    file: File,
    type: "avatar" | "logo"
  ) => {
    if (type === "avatar") setIsUploadingAvatar(true);
    else setIsUploadingLogo(true);
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

      if (type === "avatar") {
        updateField("avatarUrl", data.url);
      } else {
        updateField("logoUrl", data.url);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Impossible de télécharger l'image");
    } finally {
      if (type === "avatar") setIsUploadingAvatar(false);
      else setIsUploadingLogo(false);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validate minimum requirements
    if (!formData.firstName?.trim() || !formData.lastName?.trim()) {
      setErrorMsg("Le prénom et le nom sont obligatoires.");
      setCurrentStep(1);
      return;
    }

    if (!formData.slug?.trim()) {
      setErrorMsg("Veuillez choisir un nom d'utilisateur pour l'URL publique.");
      setCurrentStep(4);
      return;
    }

    if (slugStatus === "unavailable") {
      setErrorMsg("Ce nom d'utilisateur n'est pas disponible. Veuillez en choisir un autre.");
      setCurrentStep(4);
      return;
    }

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

        setSuccessMsg(isEditing ? "Carte mise à jour !" : "Carte créée avec succès !");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 800);
      } catch (err: unknown) {
        const error = err as Error;
        setErrorMsg(error.message || "Échec de l'enregistrement de la carte.");
      }
    });
  };

  const steps = [
    { id: 1, title: "Identité", icon: User },
    { id: 2, title: "Médias", icon: Camera },
    { id: 3, title: "Coordonnées", icon: Phone },
    { id: 4, title: "Style & URL", icon: Palette },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: WIZARD FORM */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
        {/* Progress Bar & Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, idx) => {
              const StepIcon = s.icon;
              const isActive = currentStep === s.id;
              const isDone = currentStep > s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentStep(s.id)}
                  className="flex flex-col items-center flex-1 group"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#FF6B00] text-white shadow-sm"
                        : isDone
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200"
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-[11px] mt-1.5 font-medium ${
                      isActive ? "text-[#FF6B00]" : "text-neutral-500"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress track */}
          <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#FF6B00] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Feedback alerts */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2.5">
            <Check className="w-4 h-4 shrink-0 text-green-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: IDENTITÉ & PROFESSION */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-neutral-100 pb-3">
                <h2 className="text-base font-semibold text-[#111111]">
                  1. Identité & Profession
                </h2>
                <p className="text-xs text-neutral-500">
                  Renseignez vos informations professionnelles de base.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Prénom <span className="text-[#FF6B00]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName || ""}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="ex: Jean"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Nom <span className="text-[#FF6B00]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName || ""}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="ex: Dupont"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Poste ou profession <span className="text-[#FF6B00]">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="ex: Directeur Artistique & Designer"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Nom de l&apos;entreprise
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={formData.company || ""}
                    onChange={(e) => updateField("company", e.target.value)}
                    placeholder="ex: Asuka Studio Paris"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-neutral-700">
                    Courte biographie ou présentation
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleVisibility("bio")}
                    className="text-[11px] text-neutral-500 hover:text-neutral-900 flex items-center gap-1"
                  >
                    {(formData.fieldVisibility as any)?.bio ? (
                      <>
                        <Eye className="w-3 h-3 text-[#FF6B00]" />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 text-neutral-400" />
                        <span className="text-neutral-400">Masqué</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={formData.bio || ""}
                  onChange={(e) => updateField("bio", e.target.value)}
                  placeholder="Présentez brièvement vos compétences, votre mission ou votre proposition de valeur..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                />
              </div>
            </div>
          )}

          {/* STEP 2: MÉDIAS & LOGOS */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-neutral-100 pb-3">
                <h2 className="text-base font-semibold text-[#111111]">
                  2. Médias & Identité Visuelle
                </h2>
                <p className="text-xs text-neutral-500">
                  Téléversez votre photo de profil et le logo de votre entreprise (facultatif).
                </p>
              </div>

              {/* Photo de profil */}
              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
                <label className="block text-xs font-semibold text-neutral-800 mb-2">
                  Photo de profil (Avatar)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-200 flex items-center justify-center border border-neutral-300 shrink-0 relative">
                    {formData.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={formData.avatarUrl}
                        alt="Aperçu photo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-7 h-7 text-neutral-400" />
                    )}
                    {isUploadingAvatar && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-[#111111] text-white text-xs font-medium flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Téléverser une photo</span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, "avatar");
                          }}
                        />
                      </label>
                      {formData.avatarUrl && (
                        <button
                          type="button"
                          onClick={() => updateField("avatarUrl", "")}
                          className="px-3 py-1.5 rounded-lg text-neutral-600 hover:text-red-600 text-xs border border-neutral-200"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      JPG, PNG ou WEBP. Taille max. 5 Mo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Logo de l'entreprise */}
              <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/50">
                <label className="block text-xs font-semibold text-neutral-800 mb-2">
                  Logo de l&apos;entreprise
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-200 flex items-center justify-center border border-neutral-300 shrink-0 relative">
                    {formData.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={formData.logoUrl}
                        alt="Aperçu logo"
                        className="max-h-12 max-w-12 object-contain"
                      />
                    ) : (
                      <ImageIcon className="w-7 h-7 text-neutral-400" />
                    )}
                    {isUploadingLogo && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-[#111111] text-white text-xs font-medium flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Téléverser un logo</span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/svg+xml"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, "logo");
                          }}
                        />
                      </label>
                      {formData.logoUrl && (
                        <button
                          type="button"
                          onClick={() => updateField("logoUrl", "")}
                          className="px-3 py-1.5 rounded-lg text-neutral-600 hover:text-red-600 text-xs border border-neutral-200"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Format PNG avec fond transparent recommandé.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: COORDONNÉES & RÉSEAUX */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="border-b border-neutral-100 pb-3">
                <h2 className="text-base font-semibold text-[#111111]">
                  3. Coordonnées & Réseaux
                </h2>
                <p className="text-xs text-neutral-500">
                  Renseignez vos points de contact et gérez la visibilité de chaque champ.
                </p>
              </div>

              {/* Téléphone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-neutral-700">
                      Numéro de téléphone
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleVisibility("phone")}
                      className="text-[10px] text-neutral-500 flex items-center gap-1"
                    >
                      {(formData.fieldVisibility as any)?.phone ? (
                        <Eye className="w-3 h-3 text-[#FF6B00]" />
                      ) : (
                        <EyeOff className="w-3 h-3 text-neutral-400" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-neutral-700">
                      Numéro WhatsApp
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleVisibility("whatsapp")}
                      className="text-[10px] text-neutral-500 flex items-center gap-1"
                    >
                      {(formData.fieldVisibility as any)?.whatsapp ? (
                        <Eye className="w-3 h-3 text-[#FF6B00]" />
                      ) : (
                        <EyeOff className="w-3 h-3 text-neutral-400" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <MessageCircle className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      value={formData.whatsapp || ""}
                      onChange={(e) => updateField("whatsapp", e.target.value)}
                      placeholder="+33612345678"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Site Web */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-neutral-700">
                      Adresse e-mail
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleVisibility("email")}
                      className="text-[10px] text-neutral-500 flex items-center gap-1"
                    >
                      {(formData.fieldVisibility as any)?.email ? (
                        <Eye className="w-3 h-3 text-[#FF6B00]" />
                      ) : (
                        <EyeOff className="w-3 h-3 text-neutral-400" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="contact@exemple.fr"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-neutral-700">
                      Site internet
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleVisibility("website")}
                      className="text-[10px] text-neutral-500 flex items-center gap-1"
                    >
                      {(formData.fieldVisibility as any)?.website ? (
                        <Eye className="w-3 h-3 text-[#FF6B00]" />
                      ) : (
                        <EyeOff className="w-3 h-3 text-neutral-400" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                    <input
                      type="url"
                      value={formData.website || ""}
                      onChange={(e) => updateField("website", e.target.value)}
                      placeholder="https://asuka-card.com"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Adresse physique */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-neutral-700">
                    Adresse physique
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleVisibility("address")}
                    className="text-[10px] text-neutral-500 flex items-center gap-1"
                  >
                    {(formData.fieldVisibility as any)?.address ? (
                      <Eye className="w-3 h-3 text-[#FF6B00]" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-neutral-400" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={formData.address || ""}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="14 Rue de Rivoli, 75001 Paris, France"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
                  />
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-xs font-semibold text-neutral-800">
                    Liens vers vos réseaux sociaux
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleVisibility("socials")}
                    className="text-[10px] text-neutral-500 flex items-center gap-1"
                  >
                    {(formData.fieldVisibility as any)?.socials ? (
                      <Eye className="w-3 h-3 text-[#FF6B00]" />
                    ) : (
                      <EyeOff className="w-3 h-3 text-neutral-400" />
                    )}
                  </button>
                </div>

                <div className="space-y-3">
                  <input
                    type="url"
                    value={(formData.socials as any)?.linkedin || ""}
                    onChange={(e) => updateSocial("linkedin", e.target.value)}
                    placeholder="LinkedIn (ex: https://linkedin.com/in/profil)"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                  <input
                    type="url"
                    value={(formData.socials as any)?.x || ""}
                    onChange={(e) => updateSocial("x", e.target.value)}
                    placeholder="X / Twitter (ex: https://x.com/pseudo)"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                  <input
                    type="url"
                    value={(formData.socials as any)?.instagram || ""}
                    onChange={(e) => updateSocial("instagram", e.target.value)}
                    placeholder="Instagram (ex: https://instagram.com/pseudo)"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                  <input
                    type="url"
                    value={(formData.socials as any)?.facebook || ""}
                    onChange={(e) => updateSocial("facebook", e.target.value)}
                    placeholder="Facebook (ex: https://facebook.com/page)"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                  <input
                    type="url"
                    value={(formData.socials as any)?.tiktok || ""}
                    onChange={(e) => updateSocial("tiktok", e.target.value)}
                    placeholder="TikTok (ex: https://tiktok.com/@pseudo)"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: STYLE & URL PUBLIQUE */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-neutral-100 pb-3">
                <h2 className="text-base font-semibold text-[#111111]">
                  4. Personnalisation & URL Publique
                </h2>
                <p className="text-xs text-neutral-500">
                  Choisissez la couleur dominante, le modèle et réservez votre identifiant unique.
                </p>
              </div>

              {/* Couleur dominante */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-2">
                  Couleur dominante
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "orange", name: "Orange Signature", hex: "#FF6B00" },
                    { id: "black", name: "Noir Élégant", hex: "#111111" },
                    { id: "white", name: "Blanc Pur", hex: "#FFFFFF" },
                  ].map((c) => {
                    const isSelected = formData.dominantColor === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => updateField("dominantColor", c.id as DominantColor)}
                        className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                          isSelected
                            ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/20 bg-neutral-50"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-neutral-300 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-xs font-medium text-neutral-800">
                          {c.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modèle de carte */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-2">
                  Modèle de présentation
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "premium", name: "Gamme Premium", desc: "Portrait immersif, noir pur & icônes minimalistes" },
                    { id: "professional", name: "Gamme Professional", desc: "Lignes épurées & clarté business" },
                    { id: "creative", name: "Gamme Creative", desc: "Style dynamique & fort impact visuel" },
                    { id: "modern", name: "Classique Moderne", desc: "Bandeau contrasté & boutons arrondis" },
                  ].map((tmpl) => {
                    const isSelected = formData.template === tmpl.id;
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => updateField("template", tmpl.id as CardTemplate)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/20 bg-[#FFF3EB]/40"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <span className="block text-xs font-semibold text-neutral-900">
                          {tmpl.name}
                        </span>
                        <span className="block text-[11px] text-neutral-500 mt-1">
                          {tmpl.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slug / Nom d'utilisateur */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-neutral-800">
                    Nom d&apos;utilisateur (URL personnalisée) <span className="text-[#FF6B00]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoSlug}
                    className="text-[11px] text-[#FF6B00] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Générer automatiquement</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-2.5 text-xs text-neutral-400 select-none">
                      asuka-card.com/
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.slug || ""}
                      onChange={(e) => {
                        const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
                        updateField("slug", val);
                      }}
                      placeholder="jean-dupont"
                      className="w-full pl-36 pr-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                    />
                  </div>
                </div>

                {/* Slug availability status */}
                <div className="mt-2 text-xs flex items-center gap-1.5">
                  {slugStatus === "checking" && (
                    <span className="text-neutral-500 flex items-center gap-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Vérification de disponibilité...
                    </span>
                  )}
                  {slugStatus === "available" && (
                    <span className="text-green-600 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {slugMessage || "Nom d'utilisateur disponible !"}
                    </span>
                  )}
                  {slugStatus === "unavailable" && (
                    <span className="text-red-600 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {slugMessage || "Nom d'utilisateur non disponible."}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation between steps */}
          <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-medium hover:bg-neutral-50 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Précédent</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-[#111111] text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Étape suivante</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending || slugStatus === "unavailable"}
                className="px-6 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{isEditing ? "Enregistrer les modifications" : "Publier ma carte"}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* RIGHT COLUMN: LIVE REAL-TIME PREVIEW */}
      <div className="lg:col-span-5 sticky top-24 space-y-4">
        {/* Preview Viewport Switcher */}
        <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-neutral-200 shadow-sm">
          <span className="text-xs font-semibold text-neutral-700">
            Prévisualisation en direct
          </span>
          <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
            <button
              type="button"
              onClick={() => setPreviewMode("mobile")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                previewMode === "mobile"
                  ? "bg-white text-neutral-900 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode("desktop")}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                previewMode === "desktop"
                  ? "bg-white text-neutral-900 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Plein format</span>
            </button>
          </div>
        </div>

        {/* Preview Frame */}
        <div className="flex justify-center">
          {previewMode === "mobile" ? (
            /* Realistic smartphone frame */
            <div className="w-[320px] sm:w-[350px] bg-neutral-900 p-3 rounded-[38px] shadow-xl border-4 border-neutral-800">
              <div className="w-full bg-neutral-100 rounded-[30px] overflow-hidden relative">
                {/* Speaker pill notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-900 rounded-full z-20" />
                <div className="pt-6 pb-2 px-1 max-h-[640px] overflow-y-auto">
                  <CardPreview card={formData} interactive={false} />
                </div>
              </div>
            </div>
          ) : (
            /* Desktop flat card frame */
            <div className="w-full max-w-md p-4 bg-neutral-100 rounded-2xl border border-neutral-200">
              <CardPreview card={formData} interactive={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
