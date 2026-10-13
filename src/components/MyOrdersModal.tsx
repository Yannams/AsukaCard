"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Package,
  Clock,
  Truck,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Loader2,
  ExternalLink,
  Smartphone,
  ShieldAlert,
} from "lucide-react";

interface MyOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewOrderClick?: () => void;
}

export default function MyOrdersModal({ isOpen, onClose, onNewOrderClick }: MyOrdersModalProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingOrderId, setPayingOrderId] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const handlePayOrder = async (orderId: string) => {
    setPayingOrderId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pay", paymentMethod: "FEDAPAY" }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPayingOrderId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-neutral-100 animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 rounded-full bg-neutral-300 mx-auto mt-3 -mb-1 sm:hidden shrink-0" />
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                Mes Commandes de Cartes Physiques
              </h2>
              <p className="text-xs text-neutral-500">
                Suivi de la gravure, des paiements et de l'expédition
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-200/60 text-neutral-400 hover:text-neutral-700 transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Orders */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {loading ? (
            <div className="py-16 text-center text-neutral-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF6B00]" />
              <p className="text-xs">Chargement de vos commandes...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-neutral-800">
                Vous n'avez pas encore de commande
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Commandez votre première carte NFC physique (PVC, Métal ou Bois) pour l'associer à votre profil.
              </p>
              {onNewOrderClick && (
                <button
                  onClick={() => {
                    onClose();
                    onNewOrderClick();
                  }}
                  className="mt-2 px-4 py-2 text-xs font-bold text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded-xl shadow-sm transition"
                >
                  Commander maintenant
                </button>
              )}
            </div>
          ) : (
            orders.map((ord) => {
              const isPaid = ord.paymentStatus === "PAID";
              return (
                <div
                  key={ord.id}
                  className="rounded-2xl border border-neutral-200 p-4.5 bg-white hover:border-neutral-300 transition space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-neutral-900">
                        {ord.orderNumber}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        • {new Date(ord.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Payment Status Badge */}
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          isPaid
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {isPaid ? "Payé" : "Paiement en attente"}
                      </span>

                      {/* Fulfillment Status Badge */}
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          ord.status === "DELIVERED"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : ord.status === "SHIPPED"
                            ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                            : ord.status === "IN_PRODUCTION"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        {ord.status === "DELIVERED"
                          ? "Livrée"
                          : ord.status === "SHIPPED"
                          ? "Expédiée"
                          : ord.status === "IN_PRODUCTION"
                          ? "En fabrication"
                          : ord.status === "CONFIRMED"
                          ? "Confirmée"
                          : "En attente"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="text-neutral-400 text-[11px]">Modèle commandé</div>
                      <div className="font-bold text-neutral-800 mt-0.5">
                        {ord.cardType === "PVC_CLASSIC"
                          ? "Carte NFC PVC Édition Noire"
                          : ord.cardType === "METAL_MATTE_BLACK"
                          ? "Carte Métal Noir Mat Prestige"
                          : ord.cardType === "METAL_GOLD"
                          ? "Carte Métal Dorée Gold Mirror"
                          : "Carte Bois Éco-Responsable"}{" "}
                        (×{ord.quantity})
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-neutral-600">
                        <span className="text-neutral-400">Couleur :</span>
                        <span className="font-semibold text-neutral-800 bg-neutral-100 px-1.5 py-0.5 rounded text-[10px]">
                          {ord.cardColor || "Noir Mat"}
                        </span>
                      </div>
                      {ord.customName && (
                        <div className="text-neutral-500 text-[11px] mt-0.5">
                          Gravure : <span className="font-medium text-neutral-700">{ord.customName}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-neutral-400 text-[11px]">Livraison à</div>
                      <div className="font-medium text-neutral-800 mt-0.5">
                        {ord.customerName}
                      </div>
                      <div className="text-neutral-500 text-[11px]">
                        {ord.shippingAddress}, {ord.city}
                      </div>
                      {ord.trackingNumber && (
                        <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-indigo-600">
                          <Truck className="w-3.5 h-3.5" />
                          <span>
                            Suivi: {ord.carrier ? `${ord.carrier} - ` : ""}
                            {ord.trackingNumber}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col md:items-end justify-between">
                      <div>
                        <div className="text-neutral-400 text-[11px]">Montant total</div>
                        <div className="font-extrabold text-sm text-[#FF6B00] mt-0.5">
                          {Number(ord.totalAmount).toLocaleString("fr-FR")} FCFA
                        </div>
                      </div>

                      {!isPaid && (
                        <button
                          onClick={() => handlePayOrder(ord.id)}
                          disabled={payingOrderId === ord.id}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#FF6B00] hover:bg-[#E55F00] rounded-xl shadow-xs transition active:scale-95"
                          title="Payer en ligne via FedaPay (Mobile Money ou Carte)"
                        >
                          {payingOrderId === ord.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Smartphone className="w-3.5 h-3.5" />
                          )}
                          <span>Payer via FedaPay</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
