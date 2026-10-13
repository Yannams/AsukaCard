import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Package,
  CreditCard,
  MapPin,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getOrderById } from "@/lib/db";
import { CARD_PRODUCTS, CARD_COLORS } from "@/lib/products";

interface ConfirmationPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string; ref?: string; simulated?: string }>;
}

export default async function OrderConfirmationPage({
  params,
  searchParams,
}: ConfirmationPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const order = await getOrderById(id);
  if (!order) {
    notFound();
  }

  const product = CARD_PRODUCTS.find((p) => p.id === order.cardType);
  const colorObj = CARD_COLORS.find(
    (c) => c.name === order.cardColor || c.shortName === order.cardColor || c.id === order.cardColor
  );

  const isPaid = order.paymentStatus === "PAID";
  const isPaymentFailed = query.payment === "declined" || query.payment === "error";

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfd] text-[#1d1d1f]">
      <Navbar theme="light" />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Top Status Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-100 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center space-y-3">
            {isPaid ? (
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
                <CheckCircle2 className="w-9 h-9" />
              </div>
            ) : isPaymentFailed ? (
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-amber-50">
                <ShieldCheck className="w-9 h-9" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center mx-auto ring-8 ring-[#FF6B00]/5">
                <Package className="w-9 h-9" />
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              {isPaid
                ? "Paiement Validé & Commande Confirmée !"
                : isPaymentFailed
                ? "Commande enregistrée (Paiement en attente)"
                : "Commande enregistrée avec succès"}
            </h1>

            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              Merci pour votre confiance. Votre carte NFC Asuka Card est désormais transmise à
              notre atelier de gravure à Cotonou.
            </p>

            <div className="inline-flex items-center gap-2 bg-neutral-100 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-neutral-800">
              <span>Référence :</span>
              <span className="text-[#FF6B00]">{order.orderNumber}</span>
            </div>
          </div>

          {/* Payment Banner */}
          {isPaid && (
            <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200/80 p-4 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-emerald-950">Règlement FedaPay sécurisé validé</p>
                  <p className="text-emerald-700 text-[11px]">
                    Réf transaction : {order.paymentRef || query.ref || "FEDAPAY-OK"}
                  </p>
                </div>
              </div>
              <span className="font-extrabold text-sm text-emerald-900">
                {order.totalAmount.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
          )}

          {/* Product Specifications & Color */}
          <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Spécifications de votre carte NFC
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-neutral-400">Modèle sélectionné :</span>
                <p className="font-bold text-neutral-900 text-sm">
                  {product?.name || order.cardType}
                </p>
                <p className="text-neutral-500 text-[11px]">{product?.material}</p>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-400">Couleur & Finition de la carte :</span>
                <div className="flex items-center gap-2 pt-0.5">
                  <span
                    className="w-4 h-4 rounded-full border border-neutral-300 shadow-xs shrink-0"
                    style={{ background: colorObj?.swatch || "#1c1c1e" }}
                  />
                  <p className="font-bold text-neutral-900 text-sm">
                    {order.cardColor || "Noir Mat Obsidienne"}
                  </p>
                </div>
                {colorObj?.description && (
                  <p className="text-neutral-500 text-[11px]">{colorObj.description}</p>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-neutral-400">Nom gravé / Titre imprimé :</span>
                <p className="font-bold text-neutral-900 text-sm">
                  {order.customName || order.customerName}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-400">Quantité & Montant :</span>
                <p className="font-bold text-neutral-900 text-sm">
                  {order.quantity} unité(s) · {order.totalAmount.toLocaleString("fr-FR")} FCFA
                </p>
              </div>
            </div>
          </div>

          {/* Delivery & Tracking */}
          <div className="rounded-2xl border border-neutral-200/80 p-5 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div className="flex items-center gap-2 font-bold text-neutral-800">
                <MapPin className="w-4 h-4 text-[#FF6B00]" />
                <span>Adresse de livraison (Bénin)</span>
              </div>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[10px]">
                Livraison Offerte
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-600">
              <div>
                <p className="font-bold text-neutral-900">{order.customerName}</p>
                <p>{order.shippingAddress}</p>
                <p>
                  {order.city}, {order.country}
                </p>
              </div>
              <div>
                <p>Téléphone : <span className="font-medium text-neutral-900">{order.customerPhone}</span></p>
                <p>Email : <span className="font-medium text-neutral-900">{order.customerEmail}</span></p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Délai de livraison estimé : 24h à 48h (Cotonou & environs)
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/dashboard"
              className="flex-1 py-3 px-5 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold text-center transition shadow-md active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Accéder à mon tableau de bord</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/22997000000?text=Bonjour,%20je%20souhaite%20suivre%20ma%20commande%20Asuka%20Card%20référence%20"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-2xl bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold text-center transition flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Assistance Atelier WhatsApp</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
