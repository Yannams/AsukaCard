"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CreditCard,
  CheckCircle2,
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
  const [cardSide, setCardSide] = useState<"back" | "front">("back");

  const existingPendingOrder = (targetCard as any)?.orders?.find(
    (o: any) => o.paymentStatus !== "PAID" && o.status === "PENDING"
  );

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
      const isRetryingPending = Boolean(existingPendingOrder && payWithFedaPay);
      const res = await fetch(
        isRetryingPending ? `/api/orders/${existingPendingOrder.id}` : "/api/orders",
        {
          method: isRetryingPending ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isRetryingPending
              ? {
                  action: "pay",
                  paymentMethod: chosenMethod,
                  customerName,
                  customerEmail,
                  customerPhone,
                  customName: customerName,
                  notes: notes || undefined,
                }
              : {
                  cardId: targetCard?.id || undefined,
                  cardType: CARD_PRODUCTS[0]?.id || "PVC_CLASSIC",
                  cardColor: "Noir Mat Obsidienne",
                  customName: customerName,
                  quantity: 1,
                  customerName,
                  customerEmail,
                  customerPhone,
                  shippingAddress:
                    "Retrait direct au Showroom Asuka Spirit (Cotonou) - https://maps.app.goo.gl/zSnn2Gv6ZJjiFuNG6",
                  city: "Cotonou",
                  country: "Bénin",
                  notes: notes || undefined,
                  paymentMethod: chosenMethod,
                  autoConfirmPayment: false,
                }
          ),
        }
      );

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl sm:rounded-[32px] w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden border border-neutral-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/[0.06] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f]">
              Commander votre carte physique
            </h2>
            <p className="text-xs text-[#6e6e73] mt-0.5">
              Carte connectée NFC officielle Asuka Card gravée à votre nom
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
          {existingPendingOrder && !createdOrder && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
              Relance du paiement en attente pour la commande{" "}
              <span className="font-mono font-bold">{existingPendingOrder.orderNumber}</span>{" "}
              (aucun doublon ne sera créé).
            </div>
          )}
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <span className="font-semibold">Attention :</span> {error}
            </div>
          )}

          {redirectingFedaPay && (
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-[#FF6B00] text-xs flex items-center justify-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-semibold">Redirection sécurisée vers FedaPay...</span>
            </div>
          )}

          {/* SUCCESS SCREEN */}
          {createdOrder ? (
            <div className="py-4 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
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

              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-neutral-200 text-left text-xs space-y-3 text-[#1d1d1f]">
                <p className="text-neutral-700 leading-relaxed">
                  Votre carte NFC personnalisée est en cours de gravure au nom de{" "}
                  <strong>{customerName}</strong>. Vous serez contacté au <strong>{customerPhone}</strong> dès qu&apos;elle sera prête.
                </p>

                <div className="pt-2 border-t border-neutral-200 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                    <MapPin className="w-4 h-4 text-[#FF6B00]" />
                    <span>Lieu de retrait : Showroom Asuka Spirit</span>
                  </div>
                  <p className="text-neutral-500 text-[11px]">
                    Cotonou, Bénin · Prête sous 24h à 48h
                  </p>
                  <a
                    href="https://maps.app.goo.gl/zSnn2Gv6ZJjiFuNG6"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF6B00] hover:underline pt-0.5"
                  >
                    <span>Localiser le Showroom sur Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
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
              {/* VEDETTE : VRAIE CARTE PHYSIQUE ASUKA CARD (RATIO CRÉDIT EXACT) */}
              <div className="space-y-2">
                <div
                  onClick={() => setCardSide(cardSide === "back" ? "front" : "back")}
                  className="relative w-full aspect-[1.586/1] rounded-2xl sm:rounded-[24px] bg-[#141416] border border-neutral-800 p-5 sm:p-7 flex items-center justify-between text-white overflow-hidden select-none cursor-pointer group transition-all"
                  title="Cliquez pour retourner la carte (Recto / Verso)"
                >
                  {cardSide === "back" ? (
                    /* Verso Officiel : Puce QR dorée + Nom gravé + Contactless Wave */
                    <>
                      {/* Puce microchip dorée QR Code officielle */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/asuka-gold-chip.png"
                        alt="Puce QR Dorée Asuka"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain shrink-0"
                      />

                      {/* Typographie nominative gravée au laser */}
                      <div className="flex-1 px-4 sm:px-6 min-w-0">
                        <div className="text-lg sm:text-2xl font-bold tracking-tight text-white truncate leading-tight">
                          {customerName || "Nom du titulaire"}
                        </div>
                        <div className="text-xs sm:text-sm text-neutral-400 font-medium mt-1 truncate">
                          {targetCard?.title
                            ? `${targetCard.title}${targetCard.company ? ` chez ${targetCard.company}` : ""}`
                            : targetCard?.company || "Membre Asuka Card"}
                        </div>
                      </div>

                      {/* Symbole officiel NFC sans contact */}
                      <div className="shrink-0 flex items-center justify-center pl-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/asuka-nfc-wave.png"
                          alt="Symbole NFC sans contact"
                          className="w-5 h-9 sm:w-6 sm:h-11 object-contain opacity-75"
                        />
                      </div>
                    </>
                  ) : (
                    /* Recto Officiel : ASUKA Card + Pique Asuka */
                    <div className="w-full h-full flex items-center justify-center relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/black-card-front-straight.png"
                        alt="Recto Asuka Card"
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  )}

                  {/* Bouton retournement discret en bas à droite */}
                  <div className="absolute bottom-2.5 right-3 text-[10px] font-medium text-neutral-500 group-hover:text-neutral-300 transition flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full">
                    <span>{cardSide === "back" ? "Voir recto" : "Voir verso"}</span>
                  </div>
                </div>

                {/* Spécifications & Prix sous la carte */}
                <div className="flex items-center justify-between px-1 text-xs text-[#6e6e73]">
                  <span className="font-medium">
                    Finition Noir Mat Soft-Touch • Puce NTAG216
                  </span>
                  <span className="font-bold text-[#1d1d1f] text-sm">
                    {UNIT_PRICE.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
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
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleSubmitOrder(true)}
                  disabled={loading || redirectingFedaPay}
                  className="w-full py-3.5 px-6 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] text-white text-sm font-semibold transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
