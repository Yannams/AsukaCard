"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Package,
  TrendingUp,
  Clock,
  Truck,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Edit,
  ExternalLink,
  ChevronRight,
  Shield,
  Loader2,
  RefreshCw,
  X,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  DollarSign,
  ArrowLeft,
  Trash2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalOrders: 0,
    totalRevenue: 0,
    pendingCount: 0,
    inProductionCount: 0,
    shippedCount: 0,
    deliveredCount: 0,
  });
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");

  // Selected Order for Edit / Shipping modal
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Edit fields for modal
  const [editStatus, setEditStatus] = useState("");
  const [editPaymentStatus, setEditPaymentStatus] = useState("");
  const [editTrackingNumber, setEditTrackingNumber] = useState("");
  const [editCarrier, setEditCarrier] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // Check auth
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/login");
          return;
        }
        if (data.user.role !== "ADMIN") {
          router.push("/dashboard");
          return;
        }
        setCurrentUser(data.user);
      })
      .catch(() => router.push("/login"))
      .finally(() => setAuthLoading(false));
  }, [router]);

  // Load orders & stats
  const loadData = async () => {
    setLoadingOrders(true);
    try {
      const [ordersRes, statsRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/stats"),
      ]);

      if (ordersRes.ok) {
        const oData = await ordersRes.json();
        setOrders(oData.orders || []);
      }
      if (statsRes.ok) {
        const sData = await statsRes.json();
        setStats(sData.stats || {});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser]);

  // Handle open modal
  const handleOpenOrderModal = (order: any) => {
    setSelectedOrder(order);
    setEditStatus(order.status);
    setEditPaymentStatus(order.paymentStatus);
    setEditTrackingNumber(order.trackingNumber || "");
    setEditCarrier(order.carrier || "DHL Express");
    setEditNotes(order.notes || "");
  };

  // Quick status update from table
  const handleQuickUpdate = async (orderId: string, updates: any) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, ...updates }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, ...updates } : o))
        );
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Modal full save
  const handleSaveModal = async () => {
    if (!selectedOrder) return;
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          status: editStatus,
          paymentStatus: editPaymentStatus,
          trackingNumber: editTrackingNumber,
          carrier: editCarrier,
          notes: editNotes,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setOrders((prev) =>
          prev.map((o) => (o.id === selectedOrder.id ? data.order : o))
        );
        setSelectedOrder(null);
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Search
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchNumber = o.orderNumber?.toLowerCase().includes(query);
        const matchName = o.customerName?.toLowerCase().includes(query);
        const matchEmail = o.customerEmail?.toLowerCase().includes(query);
        const matchPhone = o.customerPhone?.toLowerCase().includes(query);
        const matchEngrave = o.customName?.toLowerCase().includes(query);
        if (!matchNumber && !matchName && !matchEmail && !matchPhone && !matchEngrave) {
          return false;
        }
      }

      // Status
      if (statusFilter !== "ALL" && o.status !== statusFilter) {
        return false;
      }

      // Payment
      if (paymentFilter !== "ALL" && o.paymentStatus !== paymentFilter) {
        return false;
      }

      return true;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF6B00]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-neutral-100 pb-20">
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-30 bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                <span className="text-[#FF6B00]">ASUKA</span> CARD
              </span>
            </Link>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-[11px] font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Back-Office Administrateur</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-neutral-800 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à l'Espace Client</span>
            </Link>
            <button
              onClick={loadData}
              disabled={loadingOrders}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
              title="Rafraîchir les données"
            >
              <RefreshCw className={`w-4 h-4 ${loadingOrders ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Title & Overview */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Gestion des Commandes & Paiements
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Supervisez la fabrication des cartes NFC physiques, l'encaissement et les livraisons.
          </p>
        </div>

        {/* Bento Stats KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Revenue */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">CA Encaissé</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white">
              {Number(stats.totalRevenue || 0).toLocaleString("fr-FR")}{" "}
              <span className="text-xs font-semibold text-neutral-400">FCFA</span>
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">
              Paiements confirmés
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Commandes</span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white">{stats.totalOrders || 0}</div>
            <div className="text-[11px] text-neutral-400 mt-1">Volume global</div>
          </div>

          {/* Pending Treatment */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">En Attente</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-amber-400">{stats.pendingCount || 0}</div>
            <div className="text-[11px] text-amber-400/80 mt-1">À valider / programmer</div>
          </div>

          {/* In Production */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">En Production</span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-purple-400">{stats.inProductionCount || 0}</div>
            <div className="text-[11px] text-purple-400/80 mt-1">Gravure laser / puce NFC</div>
          </div>

          {/* Shipped & Delivered */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Expédiées / Livrées</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-indigo-400">
              {(stats.shippedCount || 0) + (stats.deliveredCount || 0)}
            </div>
            <div className="text-[11px] text-indigo-400/80 mt-1">En transit ou remises</div>
          </div>
        </div>

        {/* Orders Table Card */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
          {/* Controls Bar: Search & Status Filters */}
          <div className="p-5 border-b border-neutral-800 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-neutral-900/90">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher par N°, nom, email, téléphone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700/60 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6B00]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { label: "Toutes", val: "ALL" },
                { label: "En attente", val: "PENDING" },
                { label: "Confirmées", val: "CONFIRMED" },
                { label: "En production", val: "IN_PRODUCTION" },
                { label: "Expédiées", val: "SHIPPED" },
                { label: "Livrées", val: "DELIVERED" },
              ].map((tab) => (
                <button
                  key={tab.val}
                  onClick={() => setStatusFilter(tab.val)}
                  className={`px-3 py-1.5 rounded-xl font-medium transition ${
                    statusFilter === tab.val
                      ? "bg-[#FF6B00] text-white shadow-sm"
                      : "bg-neutral-800/60 text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              {/* Payment Filter dropdown */}
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                aria-label="Filtrer par statut de paiement"
                className="ml-2 text-xs px-3 py-1.5 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-300 focus:border-[#FF6B00] outline-none"
              >
                <option value="ALL">Paiement : Tous</option>
                <option value="PAID">Payé uniquement</option>
                <option value="UNPAID">Impayé / En attente</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950/60 text-neutral-400 border-b border-neutral-800 uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Commande</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Modèle & Gravure</th>
                  <th className="py-3.5 px-4">Profil Lié</th>
                  <th className="py-3.5 px-4">Montant</th>
                  <th className="py-3.5 px-4">Paiement</th>
                  <th className="py-3.5 px-4">Statut Logistique</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {loadingOrders ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-neutral-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#FF6B00]" />
                      Chargement des commandes...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-neutral-500">
                      Aucune commande trouvée selon vos filtres.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => {
                    const isPaid = ord.paymentStatus === "PAID";
                    return (
                      <tr
                        key={ord.id}
                        className="hover:bg-neutral-800/40 transition group"
                      >
                        {/* Order & Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-mono font-bold text-white">
                            {ord.orderNumber}
                          </div>
                          <div className="text-[11px] text-neutral-500">
                            {new Date(ord.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}{" "}
                            à{" "}
                            {new Date(ord.createdAt).toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>

                        {/* Customer */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">
                            {ord.customerName}
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            {ord.customerPhone}
                          </div>
                          <div className="text-[10px] text-neutral-500">
                            {ord.city}, {ord.country}
                          </div>
                        </td>

                        {/* Card Model */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-neutral-200">
                            {ord.cardType === "PVC_CLASSIC"
                              ? "PVC"
                              : ord.cardType === "METAL_MATTE_BLACK"
                              ? "Métal Noir Mat"
                              : ord.cardType === "METAL_GOLD"
                              ? "Métal Gold"
                              : "Bois Bambou"}{" "}
                            <span className="text-neutral-400 font-normal">
                              (×{ord.quantity})
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-400 mt-0.5">
                            Couleur : <span className="text-amber-400 font-semibold">{ord.cardColor || "Noir Mat"}</span>
                          </div>
                          {ord.customName && (
                            <div className="text-[11px] text-[#FF6B00] font-medium mt-0.5">
                              Gravure : "{ord.customName}"
                            </div>
                          )}
                        </td>

                        {/* Linked Card Profile */}
                        <td className="py-3.5 px-4">
                          {ord.card ? (
                            <Link
                              href={`/${ord.card.slug}`}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-[11px] text-neutral-300 hover:text-[#FF6B00] transition"
                            >
                              <span>/{ord.card.slug}</span>
                              <ExternalLink className="w-3 h-3 text-neutral-500" />
                            </Link>
                          ) : (
                            <span className="text-[11px] text-neutral-500 italic">
                              Non lié
                            </span>
                          )}
                        </td>

                        {/* Amount */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-bold text-white">
                            {Number(ord.totalAmount).toLocaleString("fr-FR")} FCFA
                          </div>
                          <div className="text-[10px] text-neutral-500 uppercase">
                            {ord.paymentMethod?.replace("_", " ")}
                          </div>
                        </td>

                        {/* Payment Status Dropdown / Quick Toggle */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleQuickUpdate(ord.id, {
                                paymentStatus: isPaid ? "UNPAID" : "PAID",
                              })
                            }
                            title="Cliquer pour basculer le paiement"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${
                              isPaid
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? "bg-emerald-400" : "bg-amber-400"}`} />
                            <span>{isPaid ? "Payé ✓" : "Impayé"}</span>
                          </button>
                        </td>

                        {/* Logistics Status Selector */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={ord.status}
                            aria-label="Modifier le statut logistique de la commande"
                            onChange={(e) =>
                              handleQuickUpdate(ord.id, { status: e.target.value })
                            }
                            className={`text-xs px-2.5 py-1 rounded-lg border font-semibold outline-none ${
                              ord.status === "DELIVERED"
                                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                : ord.status === "SHIPPED"
                                ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                                : ord.status === "IN_PRODUCTION"
                                ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                                : ord.status === "CONFIRMED"
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : "bg-neutral-800 border-neutral-700 text-neutral-300"
                            }`}
                          >
                            <option value="PENDING">En attente</option>
                            <option value="CONFIRMED">Confirmée</option>
                            <option value="IN_PRODUCTION">En production</option>
                            <option value="SHIPPED">Expédiée</option>
                            <option value="DELIVERED">Livrée</option>
                            <option value="CANCELLED">Annulée</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleOpenOrderModal(ord)}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition"
                          >
                            <Edit className="w-3 h-3 text-[#FF6B00]" />
                            <span>Traiter</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL: ADMIN ORDER DETAILS & SHIPPING PROCESSING */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Fiche Commande : {selectedOrder.orderNumber}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Client : {selectedOrder.customerName} ({selectedOrder.customerEmail})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
              {/* Product & Engraving Info */}
              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Caractéristiques de la commande
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-neutral-500">Modèle : </span>
                    <span className="font-bold text-white">
                      {selectedOrder.cardType} (Quantité: {selectedOrder.quantity})
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Couleur choisie : </span>
                    <span className="font-bold text-amber-400">
                      {selectedOrder.cardColor || "Noir Mat"}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Montant : </span>
                    <span className="font-bold text-[#FF6B00]">
                      {Number(selectedOrder.totalAmount).toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Moyen de paiement : </span>
                    <span className="font-bold text-white">
                      {selectedOrder.paymentMethod || "FEDAPAY"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-neutral-500">Gravure demandée : </span>
                    <span className="font-bold text-white text-sm bg-neutral-800 px-2 py-0.5 rounded">
                      {selectedOrder.customName || "Nom du client standard"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer & Shipping info */}
              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Destinataire & Adresse de Livraison
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-300">
                    <Mail className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex items-start gap-2 text-neutral-300">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 mt-0.5" />
                    <span>
                      {selectedOrder.shippingAddress}, {selectedOrder.city}, {selectedOrder.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Payment Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-300 mb-1.5">
                    Statut de la Commande
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-[#FF6B00]"
                  >
                    <option value="PENDING">En attente</option>
                    <option value="CONFIRMED">Confirmée (Attente atelier)</option>
                    <option value="IN_PRODUCTION">En cours de production (Gravure)</option>
                    <option value="SHIPPED">Expédiée (En transit)</option>
                    <option value="DELIVERED">Livrée au client</option>
                    <option value="CANCELLED">Annulée</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-300 mb-1.5">
                    Statut du Paiement
                  </label>
                  <select
                    value={editPaymentStatus}
                    onChange={(e) => setEditPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-[#FF6B00]"
                  >
                    <option value="UNPAID">Impayé / En attente</option>
                    <option value="PAID">Payé (Encaissé)</option>
                    <option value="REFUNDED">Remboursé</option>
                    <option value="FAILED">Échoué</option>
                  </select>
                </div>
              </div>

              {/* Shipping & Carrier Processing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-300 mb-1.5">
                    Transporteur / Livreur
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: DHL Express, Coursier Moto Cotonou..."
                    value={editCarrier}
                    onChange={(e) => setEditCarrier(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-300 mb-1.5">
                    Numéro de Suivi (Tracking)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: BJ-DHL-9023812"
                    value={editTrackingNumber}
                    onChange={(e) => setEditTrackingNumber(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div>
                <label className="block font-semibold text-neutral-300 mb-1.5">
                  Notes internes d'atelier ou remarques logistiques
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes de fabrication, consignes livreur..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-[#FF6B00] resize-none"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Fermer
              </button>

              <button
                type="button"
                disabled={isUpdating}
                onClick={handleSaveModal}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#FF6B00] hover:bg-[#E55F00] disabled:opacity-50 rounded-xl transition shadow-sm"
              >
                {isUpdating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                <span>Enregistrer les modifications</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
