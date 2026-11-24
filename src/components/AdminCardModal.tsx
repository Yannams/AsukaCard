"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Shield,
  Crown,
  Building,
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  RefreshCw,
  Check,
  AlertCircle,
  Eye,
  Layers,
  Palette,
} from "lucide-react";
import CardPreview from "@/components/CardPreview";
import { CardTemplate, DominantColor } from "@/lib/db";

interface AdminCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCard?: any | null;
  users: any[];
  currentAdminUserId?: string;
  onSaved: () => void;
}

const TEMPLATE_OPTIONS: {
  id: CardTemplate;
  name: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  description: string;
}[] = [
  {
    id: "executive",
    name: "🏛️ Ministériel / Exécutif",
    subtitle: "Modèle Officiel de l'État & Grands Dirigeants",
    badge: "EXCLUSIF BACKOFFICE",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    description:
      "Design régalien sombre haute distinction conçu pour les Ministres, Présidents d'institutions et Directeurs Généraux. Intègre les badges d'État et le logo institutionnel en bannière.",
  },
  {
    id: "premium",
    name: "👑 Premium Prestige",
    subtitle: "Finition Soft-Touch & Noir Profond",
    badge: "Populaire",
    badgeColor: "bg-neutral-800 text-neutral-300 border-neutral-700",
    description: "Élégance sobre et minimaliste pour dirigeants d'entreprises, fondateurs et investisseurs.",
  },
  {
    id: "modern",
    name: "⚡ Moderne Dynamique",
    subtitle: "Signature Orange & Noir Asuka",
    badge: "Tech & Innovation",
    badgeColor: "bg-[#FF6B00]/15 text-[#FF6B00] border-[#FF6B00]/30",
    description: "Contraste affirmé orange signature, boutons d'action rapides et profil dynamique.",
  },
  {
    id: "apple_invitation",
    name: "🍏 Apple Invitation",
    subtitle: "Style Invitation Cupertinienne",
    description: "Format carte d'invitation Apple épuré, typographie soignée et fond clair subtil.",
  },
  {
    id: "minimalist",
    name: "⚪ Minimaliste",
    subtitle: "Monochrome & Lignes Épurées",
    description: "Sobriété maximale, idéal pour les profils axés sur l'efficacité directe.",
  },
  {
    id: "creative",
    name: "🎨 Créatif Contemporain",
    subtitle: "Design Artistique & Couleurs",
    description: "Nuances contemporaines avec dégradé subtil pour personnalités publiques et créateurs.",
  },
];

export default function AdminCardModal({
  isOpen,
  onClose,
  initialCard,
  users,
  currentAdminUserId,
  onSaved,
}: AdminCardModalProps) {
  const isEditing = Boolean(initialCard?.id);

  const [formData, setFormData] = useState({
    slug: "",
    firstName: "",
    lastName: "",
    title: "",
    company: "",
    logoUrl: "",
    avatarUrl: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    address: "",
    bio: "",
    dominantColor: "black" as DominantColor,
    template: "executive" as CardTemplate,
    userId: "",
    socials: {
      linkedin: "",
      x: "",
      instagram: "",
      facebook: "",
      youtube: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"template" | "identity" | "contact" | "media">("template");

  // Generate secure 8-character token
  const generateSlug = () => {
    const chars = "abcdefghjkmnpqrstuvwxyz23456789";
    let res = "";
    for (let i = 0; i < 8; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, slug: res }));
  };

  useEffect(() => {
    if (initialCard) {
      setFormData({
        slug: initialCard.slug || "",
        firstName: initialCard.firstName || "",
        lastName: initialCard.lastName || "",
        title: initialCard.title || "",
        company: initialCard.company || "",
        logoUrl: initialCard.logoUrl || "",
        avatarUrl: initialCard.avatarUrl || "",
        phone: initialCard.phone || "",
        whatsapp: initialCard.whatsapp || "",
        email: initialCard.email || "",
        website: initialCard.website || "",
        address: initialCard.address || "",
        bio: initialCard.bio || "",
        dominantColor: (initialCard.dominantColor || "black") as DominantColor,
        template: (initialCard.template || "executive") as CardTemplate,
        userId: initialCard.userId || currentAdminUserId || "",
        socials: {
          linkedin: initialCard.socials?.linkedin || "",
          x: initialCard.socials?.x || "",
          instagram: initialCard.socials?.instagram || "",
          facebook: initialCard.socials?.facebook || "",
          youtube: initialCard.socials?.youtube || "",
        },
      });
    } else {
      // Default new card
      const chars = "abcdefghjkmnpqrstuvwxyz23456789";
      let autoSlug = "";
      for (let i = 0; i < 8; i++) {
        autoSlug += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      setFormData({
        slug: autoSlug,
        firstName: "",
        lastName: "",
        title: "Ministre",
        company: "Ministère du Cadre de Vie et des Transports",
        logoUrl: "/images/logo-benin-cadre-de-vie.png",
        avatarUrl: "",
        phone: "+229 ",
        whatsapp: "+229 ",
        email: "",
        website: "https://www.cadredevie.gouv.bj",
        address: "Cotonou - Bénin",
        bio: "Ministre en charge du Cadre de Vie, des Transports et du Développement Durable - République du Bénin.",
        dominantColor: "black",
        template: "executive",
        userId: currentAdminUserId || (users[0]?.id || ""),
        socials: {
          linkedin: "",
          x: "",
          instagram: "",
          facebook: "",
          youtube: "",
        },
      });
    }
    setError(null);
  }, [initialCard, currentAdminUserId, users, isOpen]);

  // Quick preset: Ministre Georges ALÉ
  const loadMinisterPreset = () => {
    setFormData((prev) => ({
      ...prev,
      slug: prev.slug || "ga9m3x7w",
      firstName: "Georges",
      lastName: "ALÉ",
      title: "Ministre",
      company: "Ministère du Cadre de Vie et des Transports",
      logoUrl: "/images/logo-benin-cadre-de-vie.png",
      avatarUrl: "/images/georges-ale.jpg",
      phone: "+229 01 98 99 89 77",
      whatsapp: "+2290198998977",
      email: "georges.ale@gouv.bj",
      website: "https://www.cadredevie.gouv.bj",
      address: "Cotonou - Bénin",
      bio: "Ministre du Cadre de Vie et des Transports, en charge du Développement Durable - République du Bénin.",
      dominantColor: "black",
      template: "executive",
      socials: {
        ...prev.socials,
        linkedin: "https://www.linkedin.com/in/georges-al%C3%A9-5a78a726/",
      },
    }));
  };

  // Quick preset: CEO Richard ODJRADO
  const loadCeoPreset = () => {
    setFormData((prev) => ({
      ...prev,
      slug: prev.slug || "rk8m4x29",
      firstName: "Richard",
      lastName: "Odjrado",
      title: "Fondateur & CEO",
      company: "AS WORLD TECH",
      logoUrl: "",
      avatarUrl: "/images/richard-odjrado.jpg",
      phone: "+229 97 00 00 00",
      whatsapp: "+22997000000",
      email: "rodjrado-ceo@asworld.tech",
      website: "https://asukaspirit.com",
      address: "Cotonou, Bénin - Paris, France",
      bio: "Entrepreneur & Innovateur Tech. Fondateur & CEO d'AS WORLD TECH, conceptrice des marques ASUKA SPIRIT et Asuka Card.",
      dominantColor: "black",
      template: "executive",
      socials: {
        ...prev.socials,
        linkedin: "https://www.linkedin.com/in/richard-g-odjrado-660a08179/",
        instagram: "https://www.instagram.com/richardodjrado",
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        throw new Error("Le prénom et le nom sont obligatoires.");
      }

      const url = isEditing ? `/api/admin/cards/${initialCard.id}` : `/api/admin/cards`;
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de l'enregistrement.");
      }

      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-6xl bg-[#121215] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B00] to-amber-500 flex items-center justify-center text-white shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {isEditing ? "Modifier la Carte VIP / Ministre" : "Créer une Carte (Ministre / VIP)"}
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase">
                  Back-Office
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Application des templates d'État et profils exclusifs réservés à l'administration.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Presets Buttons */}
            {!isEditing && (
              <div className="hidden sm:flex items-center gap-1.5 mr-2">
                <button
                  type="button"
                  onClick={loadMinisterPreset}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-300 border border-neutral-700 transition"
                  title="Charger l'exemple type Ministre Georges ALÉ"
                >
                  🏛️ Ex. Ministre (G. Alé)
                </button>
                <button
                  type="button"
                  onClick={loadCeoPreset}
                  className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-300 border border-neutral-700 transition"
                  title="Charger l'exemple type CEO Richard Odjrado"
                >
                  ⚡ Ex. CEO (R. Odjrado)
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split view (Form on Left, Live Preview on Right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
          {/* LEFT: FORM (7 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 space-y-6">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Navigation Tabs in Form */}
            <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("template")}
                className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition ${
                  activeTab === "template"
                    ? "bg-[#FF6B00] text-white shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                1. Template & Finition
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("identity")}
                className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition ${
                  activeTab === "identity"
                    ? "bg-[#FF6B00] text-white shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                2. Identité & Titre
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("contact")}
                className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition ${
                  activeTab === "contact"
                    ? "bg-[#FF6B00] text-white shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                3. Coordonnées
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("media")}
                className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition ${
                  activeTab === "media"
                    ? "bg-[#FF6B00] text-white shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                4. Médias & Token
              </button>
            </div>

            {/* TAB 1: TEMPLATES & COLORS */}
            {activeTab === "template" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Choix du Modèle Graphique (Exclusivité Back-Office)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TEMPLATE_OPTIONS.map((tmpl) => {
                      const isSelected = formData.template === tmpl.id;
                      return (
                        <div
                          key={tmpl.id}
                          onClick={() => setFormData({ ...formData, template: tmpl.id })}
                          className={`cursor-pointer p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? "bg-neutral-800/90 border-[#FF6B00] shadow-md ring-1 ring-[#FF6B00]"
                              : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-white">{tmpl.name}</span>
                            {tmpl.badge && (
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tmpl.badgeColor}`}
                              >
                                {tmpl.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 line-clamp-2">{tmpl.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dominant Color */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Teinte Dominante du Thème
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "black", label: "Noir Obsidienne", color: "bg-[#111111] border-neutral-700" },
                      { id: "orange", label: "Orange Signature", color: "bg-[#FF6B00] border-orange-500" },
                      { id: "white", label: "Blanc Céramique", color: "bg-neutral-100 text-black border-neutral-300" },
                    ].map((col) => {
                      const isSelected = formData.dominantColor === col.id;
                      return (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, dominantColor: col.id as DominantColor })}
                          className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition ${
                            isSelected
                              ? "border-[#FF6B00] bg-neutral-800 text-white ring-1 ring-[#FF6B00]"
                              : "border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white"
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full border ${col.color}`} />
                          <span>{col.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Assigned User Account */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Rattachement Utilisateur (Compte Titulaire)
                  </label>
                  <select
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00]"
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name || u.email} ({u.email}) — {u.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* TAB 2: IDENTITY */}
            {activeTab === "identity" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Prénom *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Ex: Georges"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Nom de famille *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Ex: ALÉ"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Titre / Fonction Officielle</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Ministre, Ambassadeur, CEO"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Ministère / Institution / Entreprise
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ex: Ministère du Cadre de Vie et des Transports"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Biographie & Déclaration Officielle
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Courte présentation de la fonction officielle..."
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: CONTACT DETAILS */}
            {activeTab === "contact" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Téléphone Direct</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+229 01 98 99 89 77"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">WhatsApp Officiel</label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+2290198998977"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Officiel</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="georges.ale@gouv.bj"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Site Web Officiel / Portail</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://www.cadredevie.gouv.bj"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Adresse Officielle</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Cotonou - Bénin"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Profil LinkedIn</label>
                  <input
                    type="url"
                    value={formData.socials.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: { ...formData.socials, linkedin: e.target.value },
                      })
                    }
                    placeholder="https://www.linkedin.com/in/georges-al%C3%A9-5a78a726/"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: MEDIA & NFC TOKEN */}
            {activeTab === "media" && (
              <div className="space-y-4">
                {/* Token / Slug */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-neutral-300">
                      Token NFC / Identifiant URL Dynamique *
                    </label>
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="text-[11px] font-semibold text-[#FF6B00] hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Générer token aléatoire
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500 bg-neutral-900 border border-neutral-800 px-3 py-2.5 rounded-xl shrink-0">
                      asukacard.com/
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                        })
                      }
                      placeholder="ga9m3x7w"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    C'est l'URL programmée dans la puce NFC et le QR code de la carte. Ex: <code>ga9m3x7w</code> ou <code>rk8m4x29</code>.
                  </p>
                </div>

                {/* Photo / Avatar */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    URL Photo de Profil / Portrait
                  </label>
                  <input
                    type="text"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    placeholder="/images/georges-ale.jpg ou URL HTTPS"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                  <div className="flex gap-2 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatarUrl: "/images/georges-ale.jpg" })}
                      className="text-[10px] px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                    >
                      Photo G. Alé
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, avatarUrl: "/images/richard-odjrado.jpg" })}
                      className="text-[10px] px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                    >
                      Photo R. Odjrado
                    </button>
                  </div>
                </div>

                {/* Institution Logo */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Logo Institutionnel / Armoiries (Bannière Supérieure)
                  </label>
                  <input
                    type="text"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    placeholder="/images/logo-benin-cadre-de-vie.png ou URL HTTPS"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                  <div className="flex gap-2 mt-1.5">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, logoUrl: "/images/logo-benin-cadre-de-vie.png" })}
                      className="text-[10px] px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded"
                    >
                      Armoiries Ministère Bénin
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, logoUrl: "" })}
                      className="text-[10px] px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 rounded"
                    >
                      Aucun logo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Submit & Actions bar */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white transition"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold transition shadow-md active:scale-95 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>{isEditing ? "Mettre à jour la carte" : "Créer et Publier la Carte"}</span>
              </button>
            </div>
          </form>

          {/* RIGHT: LIVE PREVIEW (5 cols) */}
          <div className="lg:col-span-5 p-6 bg-neutral-950/60 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#FF6B00]" />
                Aperçu en direct (Temps Réel)
              </span>
              <span className="text-[11px] font-semibold text-neutral-500 uppercase">
                {formData.template}
              </span>
            </div>

            <div className="w-full max-w-sm transform scale-90 sm:scale-100 transition-all origin-top">
              <CardPreview
                card={{
                  ...formData,
                  id: "preview_card",
                  viewsCount: 207,
                  contactClicks: 60,
                } as any}
                interactive={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
