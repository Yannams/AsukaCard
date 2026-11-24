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
        {/* Top Status Card - Apple Store Inspired */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-3">
            {isPaid ? (
              <div className="w-14 h-14 rounded-full border border-emerald-500/30 bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 stroke-[2]" />
              </div>
            ) : isPaymentFailed ? (
              <div className="w-14 h-14 rounded-full border border-amber-500/30 bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7 stroke-[2]" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full border border-neutral-300 bg-neutral-100 text-neutral-700 flex items-center justify-center mx-auto">
                <Package className="w-7 h-7 stroke-[2]" />
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
              {isPaid
                ? "Votre commande est confirmée."
                : isPaymentFailed
                ? "Commande enregistrée (paiement en attente)"
                : "Commande reçue"}
            </h1>

            <p className="text-sm text-[#86868b] max-w-md mx-auto leading-relaxed">
              Merci pour votre confiance. Votre carte NFC Asuka Card est en cours de façonnage laser.
              Vous recevrez un message WhatsApp dès qu’elle sera prête pour le retrait.
            </p>

            <p className="text-xs text-[#86868b] pt-1">
              Numéro de commande{" "}
              <span className="font-mono font-semibold text-[#1d1d1f]">{order.orderNumber}</span>
            </p>
          </div>

          {/* Payment Receipt Row - Minimalist Apple Style */}
          {isPaid && (
            <div className="rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-4 sm:p-5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">Paiement sécurisé validé</p>
                  <p className="text-neutral-500 text-[11px] font-mono">
                    FedaPay · Réf. {order.paymentRef || query.ref || "FEDAPAY-OK"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold text-base sm:text-lg text-neutral-900">
                  {order.totalAmount.toLocaleString("fr-FR")} FCFA
                </span>
                <p className="text-[11px] text-emerald-600 font-medium">Réglé avec succès</p>
              </div>
            </div>
          )}

          {/* Product Specifications & Color */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Spécifications de la carte
              </h2>
              <span className="text-xs font-medium text-neutral-500">
                {order.quantity} unité{order.quantity > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-neutral-400">Modèle sélectionné</span>
                <p className="font-semibold text-neutral-900 text-sm">
                  {product?.name || order.cardType}
                </p>
                <p className="text-neutral-500 text-[11px]">{product?.material}</p>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-400">Couleur & Finition</span>
                <div className="flex items-center gap-2 pt-0.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-neutral-300 shrink-0"
                    style={{ background: colorObj?.swatch || "#1c1c1e" }}
                  />
                  <p className="font-semibold text-neutral-900 text-sm">
                    {order.cardColor || "Noir Mat Obsidienne"}
                  </p>
                </div>
                {colorObj?.description && (
                  <p className="text-neutral-500 text-[11px]">{colorObj.description}</p>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-neutral-400">Nom gravé au laser</span>
                <p className="font-semibold text-neutral-900 text-sm">
                  {order.customName || order.customerName}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-400">Montant total</span>
                <p className="font-semibold text-neutral-900 text-sm">
                  {order.totalAmount.toLocaleString("fr-FR")} FCFA
                </p>
              </div>
            </div>
          </div>

          {/* Point de retrait au Showroom (Apple Store Pick-up style) */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2 font-semibold text-neutral-900 text-sm">
                <MapPin className="w-4 h-4 text-neutral-700" />
                <span>Retrait au Showroom Asuka Spirit</span>
              </div>
              <span className="font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full text-[11px]">
                Prête sous 24h à 48h
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-neutral-700">
              <div className="space-y-2">
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">
                    Showroom Asuka Spirit
                  </p>
                  <p className="text-neutral-500 text-xs">
                    Cotonou, Bénin
                  </p>
                </div>

                <a
                  href="https://maps.app.goo.gl/zSnn2Gv6ZJjiFuNG6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066cc] hover:underline pt-1"
                >
                  <span>Afficher l'itinéraire sur Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-1 text-neutral-600 text-xs">
                <p>
                  Titulaire : <span className="font-semibold text-neutral-900">{order.customerName}</span>
                </p>
                <p>
                  Téléphone : <span className="font-medium text-neutral-900">{order.customerPhone}</span>
                </p>
                <p>
                  Email : <span className="font-medium text-neutral-900">{order.customerEmail}</span>
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 text-[11px] text-neutral-600 leading-relaxed">
              <strong className="text-neutral-900">Modalités de retrait :</strong> Notre équipe vous contactera directement par WhatsApp au <strong>{order.customerPhone}</strong> dès que votre gravure laser sera terminée. Présentez simplement votre numéro de commande <strong>{order.orderNumber}</strong> lors de votre passage.
            </div>
          </div>

          {/* Navigation Actions - Soft Apple Style */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/dashboard"
              className="flex-1 py-3.5 px-6 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-medium text-center transition active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Voir mes cartes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/22901000000?text=Bonjour,%20je%20souhaite%20suivre%20ma%20commande%20Asuka%20Card%20référence%20"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-full bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-medium text-center transition active:scale-98 flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-neutral-600" />
              <span>Assistance Atelier WhatsApp</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
