"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CreditCard,
  CheckCircle2,
  Store,
  ShieldCheck,
  Loader2,
  Nfc,
  Sparkles,
  Phone,
  Mail,
  User,
  ArrowRight,
  MapPin,
  ExternalLink,
} from "lucide-react";
import type { Card } from "@/lib/db";
import { CARD_PRODUCTS } from "@/lib/products";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableCards?: Card[];
  preselectedCard?: Card | null;
  initialColor?: string;
  onOrderSuccess?: () => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  availableCards = [],
  preselectedCard = null,
  onOrderSuccess,
}: OrderModalProps) {
  // Target card: priority to preselectedCard, then first availableCard
  const targetCard = preselectedCard || availableCards[0] || null;

  // Name engraved on card comes directly from profile
  const defaultName = targetCard
    ? `${targetCard.firstName || ""} ${targetCard.lastName || ""}`.trim()
    : "";

  const [customerName, setCustomerName] = useState(defaultName);
  const [customerPhone, setCustomerPhone] = useState(
    targetCard?.phone || targetCard?.whatsapp || ""
  );
  const [customerEmail, setCustomerEmail] = useState(targetCard?.email || "");
  const [notes, setNotes] = useState("");
  const [paymentChoice, setPaymentChoice] = useState<"FEDAPAY" | "CASH_ON_DELIVERY">("FEDAPAY");

  const [loading, setLoading] = useState(false);
  const [redirectingFedaPay, setRedirectingFedaPay] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  // Sync when card changes
  useEffect(() => {
    if (targetCard) {
      const name = `${targetCard.firstName || ""} ${targetCard.lastName || ""}`.trim();
      if (name && !customerName) setCustomerName(name);
      if ((targetCard.phone || targetCard.whatsapp) && !customerPhone) {
        setCustomerPhone(targetCard.phone || targetCard.whatsapp || "");
      }
      if (targetCard.email && !customerEmail) {
        setCustomerEmail(targetCard.email);
      }
    }
  }, [targetCard]);

  if (!isOpen) return null;

  const UNIT_PRICE = 15000;
  const quantity = 1;
  const totalAmount = UNIT_PRICE * quantity;

  const handleSubmitOrder = async (payWithFedaPay: boolean) => {
    if (!customerName.trim()) {
      setError("Veuillez indiquer votre nom complet.");
      return;
    }
    if (!customerPhone.trim()) {
      setError("Veuillez renseigner votre numéro de téléphone (WhatsApp / MoMo).");
      return;
    }
    if (!customerEmail.trim()) {
      setError("Veuillez renseigner votre adresse email.");
      return;
    }

    setLoading(true);
    setError(null);

    const chosenMethod = payWithFedaPay ? "FEDAPAY" : "CASH_ON_DELIVERY";

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: targetCard?.id || undefined,
          cardType: CARD_PRODUCTS[0]?.id || "PVC_CLASSIC",
          cardColor: "Noir Mat Obsidienne",
          customName: customerName,
          quantity: 1,
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress: "Retrait direct au Showroom Asuka Spirit (Cotonou) - https://maps.app.goo.gl/zSnn2Gv6ZJjiFuNG6",
          city: "Cotonou",
          country: "Bénin",
          notes: notes || undefined,
          paymentMethod: chosenMethod,
          autoConfirmPayment: false,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Échec de l'enregistrement de la commande");
      }

      setCreatedOrder(data.order);
      if (onOrderSuccess) onOrderSuccess();

      // If FedaPay checkout URL is returned, redirect customer smoothly
      if (payWithFedaPay && data.checkoutUrl) {
        setRedirectingFedaPay(true);
        window.location.href = data.checkoutUrl;
        return;
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la commande.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl sm:rounded-[32px] shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden border border-black/[0.08] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/[0.06] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
              Commander votre carte
            </h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              Carte connectée NFC officielle personnalisée
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-neutral-200 text-[#1d1d1f] flex items-center justify-center transition cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <span className="font-semibold">Attention :</span> {error}
            </div>
          )}

          {redirectingFedaPay && (
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-[#FF6B00] text-xs flex items-center justify-center gap-3 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-semibold">Redirection sécurisée vers FedaPay...</span>
            </div>
          )}

          {/* SUCCESS SCREEN */}
          {createdOrder ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#1d1d1f]">Commande confirmée !</h3>
                <p className="text-xs text-[#6e6e73]">
                  Numéro de commande :{" "}
                  <span className="font-mono font-bold text-[#1d1d1f]">
                    {createdOrder.orderNumber}
                  </span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5f5f7] text-left text-xs space-y-2 text-[#1d1d1f]">
                <div className="flex items-center gap-2 font-bold text-neutral-900">
                  <Store className="w-4 h-4 text-[#FF6B00]" />
                  <span>Retrait au Showroom Asuka Spirit</span>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Votre carte NFC sera gravée au nom de{" "}
                  <strong>{customerName}</strong> et disponible sous 24h à 48h.
                </p>
                <a
                  href="https://maps.app.goo.gl/zSnn2Gv6ZJjiFuNG6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B00] hover:underline pt-1"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Voir le showroom sur Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold transition cursor-pointer"
              >
                Fermer
              </button>
            </div>
          ) : (
            <>
              {/* VEDETTE : CARTE ASUKA NOIRE ÉPURÉE */}
              <div className="relative rounded-2xl p-5 bg-[#0c0c0d] text-white shadow-xl border border-white/10 overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between text-xs relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-neutral-400">
                      ASUKA CARD
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-medium">
                      NFC
                    </span>
                  </div>
                  <Nfc className="w-5 h-5 text-[#FF6B00]" />
                </div>

                <div className="mt-8 relative z-10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                    Gravure laser nominative
                  </span>
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5 truncate">
                    {customerName || "Nom du titulaire"}
                  </div>
                  {targetCard?.company && (
                    <div className="text-xs text-neutral-400 mt-0.5 truncate">
                      {targetCard.company}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 relative z-10">
                  <span>Noir Mat Soft-Touch • Puce NTAG216</span>
                  <span className="font-bold text-white text-sm">
                    {UNIT_PRICE.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
              </div>

              {/* INFORMATION RETRAIT SHOWROOM */}
              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.04] space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5">
                    <Store className="w-4 h-4" />
                  </div>
                  <div className="text-xs space-y-0.5 flex-1">
                    <div className="font-bold text-[#1d1d1f]">
                      Retrait direct au Showroom Asuka Spirit
                    </div>
                    <p className="text-[#6e6e73] leading-relaxed">
                      Cotonou, Bénin · Prête sous 24h à 48h
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/zSnn2Gv6ZJjiFuNG6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B00] hover:underline pt-0.5 pl-11"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Localiser le showroom sur Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </div>

              {/* FORMULAIRE DE CONTACT MINIMALISTE */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                    Nom complet (gravé sur la carte) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Richard Odjrado"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl bg-[#fbfbfd] border border-black/10 focus:border-[#FF6B00] focus:bg-white text-[#1d1d1f] outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                      Téléphone (WhatsApp / MoMo) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+229 97 00 00 00"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl bg-[#fbfbfd] border border-black/10 focus:border-[#FF6B00] focus:bg-white text-[#1d1d1f] outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] mb-1.5">
                      Email de confirmation *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="contact@exemple.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl bg-[#fbfbfd] border border-black/10 focus:border-[#FF6B00] focus:bg-white text-[#1d1d1f] outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION BOUTONS PAIEMENT */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => handleSubmitOrder(true)}
                  disabled={loading || redirectingFedaPay}
                  className="w-full py-3.5 px-6 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] text-white text-sm font-semibold shadow-md shadow-[#FF6B00]/25 transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CreditCard className="w-4 h-4" />
                  )}
                  <span>
                    {loading
                      ? "Traitement..."
                      : `Régler ${totalAmount.toLocaleString("fr-FR")} FCFA via FedaPay`}
                  </span>
                </button>

                <div className="flex items-center justify-center gap-3 text-[11px] text-[#86868b]">
                  <span>MTN MoMo</span>
                  <span>•</span>
                  <span>Moov Money</span>
                  <span>•</span>
                  <span>Celtiis</span>
                  <span>•</span>
                  <span>Wave</span>
                  <span>•</span>
                  <span>Cartes bancaires</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
