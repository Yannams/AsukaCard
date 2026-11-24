"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ShareModal from "@/components/ShareModal";
import ExportModal from "@/components/ExportModal";
import OrderModal from "@/components/OrderModal";
import type { Card } from "@/lib/db";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  ChevronDown,
  LogOut,
  CreditCard,
  QrCode,
  Sparkles,
  Loader2,
  Copy,
  Check,
  MoreHorizontal,
  ChevronRight,
  Radio,
  Building,
} from "lucide-react";

type DashboardCard = Card & { orders?: any[] };

export default function DashboardPage() {
  const router = useRouter();
  const [cards, setCards] = useState<DashboardCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCardDropdownOpen, setIsCardDropdownOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modals state
  const [shareCard, setShareCard] = useState<Card | null>(null);
  const [exportCard, setExportCard] = useState<Card | null>(null);
  const [cardToDelete, setCardToDelete] = useState<Card | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeActionSheetCard, setActiveActionSheetCard] = useState<DashboardCard | null>(null);
  const [orderModalCard, setOrderModalCard] = useState<DashboardCard | null>(null);

  const isCardPaid = (card: DashboardCard | null) => {
    if (!card) return false;
    if (card.slug === "richard-odjrado" || card.slug === "demo") return true;
    return Boolean(
      card.orders &&
        card.orders.some(
          (o: any) =>
            o.paymentStatus === "PAID" ||
            o.status === "CONFIRMED" ||
            o.status === "IN_PRODUCTION" ||
            o.status === "SHIPPED" ||
            o.status === "DELIVERED"
        )
    );
  };

  const carouselRef = useRef<HTMLDivElement>(null);

  const fetchCards = async () => {
    try {
      const res = await fetch("/api/cards");
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setCards(data.cards || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/login");
          return;
        }
        if (data.user.role === "ADMIN") {
          router.replace("/admin");
          return;
        }
        setCurrentUser(data.user);
        fetchCards();
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const handleCopyLink = async (card: Card) => {
    const url = `${window.location.origin}/${card.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(card.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  const confirmDelete = async () => {
    if (!cardToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/cards/${cardToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCards((prev) => prev.filter((c) => c.id !== cardToDelete.id));
        setCardToDelete(null);
        setActiveActionSheetCard(null);
        if (activeIndex >= cards.length - 1 && activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const elements = container.querySelectorAll<HTMLElement>("[data-card-item]");
    if (elements[index]) {
      elements[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const elements = container.querySelectorAll<HTMLElement>("[data-card-item]");
    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - elCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const activeCard = cards[activeIndex] || null;

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between overflow-x-hidden select-none">
      {/* Top Header - In Asuka Visual Language */}
      <header className="relative z-30 w-full max-w-md mx-auto px-5 pt-8 sm:pt-10 flex items-center justify-between">
        {/* Left: "Mes Cartes ˅" Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCardDropdownOpen(!isCardDropdownOpen)}
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white hover:text-neutral-200 transition active:scale-95"
          >
            <span>Mes Cartes</span>
            <ChevronDown
              className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                isCardDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCardDropdownOpen && cards.length > 0 && (
            <div className="absolute left-0 top-11 z-50 w-64 rounded-2xl bg-neutral-900 border border-neutral-800 p-2 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Vos profils ({cards.length})
              </div>
              {cards.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    scrollToCard(i);
                    setIsCardDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition ${
                    activeIndex === i ? "bg-neutral-800 text-[#FF6B00]" : "text-neutral-300 hover:bg-neutral-800"
                  }`}
                >
                  <span className="truncate">{c.firstName} {c.lastName}</span>
                  <span className="text-[10px] text-neutral-500 ml-2 shrink-0">/{c.slug}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Circle "+" Button & Profile Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Asuka Orange "+" Button */}
          <Link
            href="/create"
            className="w-10 h-10 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] active:scale-95 flex items-center justify-center text-white transition"
            title="Créer une nouvelle carte"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </Link>

          {/* User Profile Avatar with Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border border-neutral-700 bg-neutral-800 active:scale-95 transition flex items-center justify-center text-white font-bold text-xs"
              title="Mon compte"
            >
              {currentUser?.name
                ? currentUser.name.slice(0, 2).toUpperCase()
                : "AC"}
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl bg-neutral-900 border border-neutral-800 p-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-neutral-800">
                  <p className="text-xs font-bold text-white truncate">{currentUser?.name || "Utilisateur"}</p>
                  <p className="text-[11px] text-neutral-400 truncate">{currentUser?.email}</p>
                </div>

                <Link
                  href="/create"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-neutral-200 hover:bg-neutral-800 transition mt-1"
                >
                  <Plus className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Créer une carte</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-neutral-800 transition mt-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center py-4 w-full max-w-md mx-auto">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#FF6B00] animate-spin" />
            <p className="text-xs text-neutral-400">Chargement de votre carte...</p>
          </div>
        ) : cards.length === 0 ? (
          /* Empty state */
          <div className="px-5">
            <div className="relative w-full aspect-[9/14] max-h-[580px] rounded-[36px] border border-neutral-800 bg-neutral-900 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[#FF6B00] mb-5">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Créez votre Carte</h2>
              <p className="text-xs text-neutral-400 mt-2 mb-6 max-w-xs leading-relaxed">
                Rejoignez le nouveau standard de cartes de visite digitales & NFC professionnelles.
              </p>
              <Link
                href="/create"
                className="px-6 py-3.5 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold tracking-wide uppercase transition"
              >
                Créer ma première carte
              </Link>
            </div>
          </div>
        ) : (
          /* Asuka Card Carousel */
          <div className="w-full flex flex-col items-center">
            {/* The Horizontal Carousel with peek */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className={`w-full flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 py-3 scrollbar-none scroll-smooth items-center ${
                cards.length === 1 ? "justify-center" : ""
              }`}
            >
              {cards.map((card, index) => {
                const isSelected = activeIndex === index;
                const initials = `${(card.firstName?.[0] || "")}${(card.lastName?.[0] || "")}`.toUpperCase() || "AC";

                return (
                  <div
                    key={card.id}
                    data-card-item
                    onClick={() => setActiveActionSheetCard(card)}
                    className={`relative shrink-0 snap-center w-[84vw] max-w-[340px] aspect-[9/15] max-h-[560px] rounded-[36px] overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between border ${
                      isSelected
                        ? "scale-100 border-neutral-700 bg-black"
                        : "scale-[0.94] border-neutral-800 bg-black opacity-60 hover:opacity-80"
                    }`}
                  >
                    {/* Background Visual: EXACT MATCH with the digital card */}
                    {card.avatarUrl ? (
                      <div className="absolute inset-0 overflow-hidden bg-neutral-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={card.avatarUrl}
                          alt={`${card.firstName} ${card.lastName}`}
                          className="w-full h-full object-cover object-center filter brightness-[0.9]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
                        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/85 to-transparent" />
                      </div>
                    ) : (
                      /* Monogram initials (ex: YA) exactly like on the online digital card */
                      <div className="absolute inset-0 flex items-center justify-center bg-black select-none">
                        <span className="text-7xl sm:text-8xl font-light text-neutral-600 font-serif tracking-wider">
                          {initials}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Top Bar inside Card */}
                    <div className="relative z-10 p-5 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {isCardPaid(card) ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border border-neutral-800 text-white text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Active</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOrderModalCard(card);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border border-neutral-800 text-amber-400 hover:border-neutral-700 text-[11px] font-semibold transition cursor-pointer"
                            title="Carte en attente de paiement. Cliquez pour régler et activer."
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>En attente de paiement</span>
                          </button>
                        )}

                        {card.company && (
                          <div className="hidden xs:inline-flex sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black border border-neutral-800 text-neutral-300 text-[10px] font-medium truncate max-w-[120px]">
                            <Building className="w-2.5 h-2.5 text-neutral-400 shrink-0" />
                            <span className="truncate">{card.company}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveActionSheetCard(card);
                        }}
                        className="w-8 h-8 rounded-full bg-black border border-neutral-800 text-white flex items-center justify-center hover:bg-neutral-900 transition"
                      >
                        <MoreHorizontal className="w-4 h-4 text-neutral-300" />
                      </button>
                    </div>

                    {/* Center & Bottom: Visits indicator & Clean Typography */}
                    <div className="relative z-10 p-6 flex flex-col items-center text-center">
                      {/* Visits Bubble */}
                      <div className="mb-3 flex items-center justify-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border border-neutral-800 text-neutral-300 text-[11px] font-medium">
                          <Eye className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>{card.viewsCount || 0} visites</span>
                        </div>
                      </div>

                      {/* Name */}
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                        {card.firstName} {card.lastName}
                      </h2>

                      {/* Job Title / Role */}
                      {card.title && (
                        <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
                          {card.title}
                        </p>
                      )}

                      {/* Company / City / Slug */}
                      <p className="text-[11px] text-neutral-400 font-medium mt-0.5">
                        {card.company ? card.company : `asukacard.com/${card.slug}`}
                        {card.address ? ` • ${card.address.split(",")[0]}` : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            {cards.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToCard(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i ? "w-5 bg-[#FF6B00]" : "w-1.5 bg-neutral-700"
                    }`}
                    aria-label={`Carte ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Bottom Action Bar in Asuka Style */}
      {activeCard && (
        <footer className="relative z-20 w-full max-w-md mx-auto px-6 pb-6 pt-2">
          <div className="p-2 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-1">
            {/* Action 1: Partager (inactif si non payé) */}
            {isCardPaid(activeCard) ? (
              <button
                onClick={() => setShareCard(activeCard)}
                className="flex-1 py-2.5 px-3 rounded-full hover:bg-neutral-800 active:scale-95 text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#FF6B00]" />
                <span>Partager</span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="flex-1 py-2.5 px-3 rounded-full text-xs font-semibold text-neutral-500 opacity-35 flex items-center justify-center gap-1.5 cursor-not-allowed select-none"
                title="Partage inactif • Réglez la carte pour l'activer"
              >
                <QrCode className="w-4 h-4 text-neutral-500" />
                <span>Partager</span>
              </button>
            )}

            {/* Action 2: Prévisualiser (autorisé au propriétaire) */}
            <Link
              href={`/${activeCard.slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 px-3 rounded-full hover:bg-neutral-800 active:scale-95 text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 transition"
              title="Prévisualiser votre carte"
            >
              <Eye className="w-4 h-4 text-[#FF6B00]" />
              <span>Prévisualiser</span>
            </Link>

            {/* Action 3: Modifier ou Régler */}
            {!isCardPaid(activeCard) ? (
              <button
                onClick={() => setOrderModalCard(activeCard)}
                className="flex-1 py-2.5 px-3 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] active:scale-95 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Régler (15 000 F)</span>
              </button>
            ) : (
              <Link
                href={`/dashboard/cards/${activeCard.id}/edit`}
                className="flex-1 py-2.5 px-3 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] active:scale-95 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Modifier</span>
              </Link>
            )}
          </div>
        </footer>
      )}

      {/* Action Sheet Modal when tapping a card */}
      {activeActionSheetCard && (
        <div
          onClick={() => setActiveActionSheetCard(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-sm rounded-t-[36px] sm:rounded-3xl bg-neutral-900 border-t sm:border border-neutral-800 p-6 pb-8 sm:pb-6 flex flex-col gap-3 animate-in slide-in-from-bottom duration-200"
          >
            <div className="w-10 h-1 rounded-full bg-neutral-700 mx-auto -mt-2 mb-2 sm:hidden" />

            <div className="text-center pb-2">
              <h3 className="text-base font-bold text-white">
                {activeActionSheetCard.firstName} {activeActionSheetCard.lastName}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                /{activeActionSheetCard.slug} • {activeActionSheetCard.viewsCount || 0} visites
              </p>
            </div>

            {!isCardPaid(activeActionSheetCard) && (
              <button
                onClick={() => {
                  setOrderModalCard(activeActionSheetCard);
                  setActiveActionSheetCard(null);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold flex items-center justify-between transition cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-white" />
                  <span>Régler et Activer ma carte (15 000 FCFA)</span>
                </span>
                <ChevronRight className="w-4 h-4 text-white/80" />
              </button>
            )}

            <button
              onClick={() => {
                if (isCardPaid(activeActionSheetCard)) {
                  setShareCard(activeActionSheetCard);
                  setActiveActionSheetCard(null);
                }
              }}
              disabled={!isCardPaid(activeActionSheetCard)}
              className={`w-full py-3 px-4 rounded-2xl text-xs font-semibold flex items-center justify-between transition ${
                isCardPaid(activeActionSheetCard)
                  ? "bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-500 opacity-40 cursor-not-allowed"
              }`}
              title={!isCardPaid(activeActionSheetCard) ? "Paiement requis pour débloquer le partage" : undefined}
            >
              <span className="flex items-center gap-2">
                <QrCode className={`w-4 h-4 ${isCardPaid(activeActionSheetCard) ? "text-[#FF6B00]" : "text-neutral-500"}`} />
                <span>Partager & QR Code</span>
              </span>
              {!isCardPaid(activeActionSheetCard) ? (
                <span className="text-[10px] uppercase font-bold text-neutral-400">Paiement requis</span>
              ) : (
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              )}
            </button>

            <Link
              href={`/${activeActionSheetCard.slug}`}
              target="_blank"
              onClick={() => setActiveActionSheetCard(null)}
              className="w-full py-3 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-between transition"
            >
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#FF6B00]" />
                <span>Prévisualiser la carte</span>
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>

            <Link
              href={`/dashboard/cards/${activeActionSheetCard.id}/edit`}
              onClick={() => setActiveActionSheetCard(null)}
              className="w-full py-3 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-between transition"
            >
              <span className="flex items-center gap-2">
                <Edit className="w-4 h-4 text-emerald-400" />
                <span>Modifier les coordonnées</span>
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </Link>

            <button
              onClick={() => {
                if (isCardPaid(activeActionSheetCard)) {
                  handleCopyLink(activeActionSheetCard);
                }
              }}
              disabled={!isCardPaid(activeActionSheetCard)}
              className={`w-full py-3 px-4 rounded-2xl text-xs font-semibold flex items-center justify-between transition ${
                isCardPaid(activeActionSheetCard)
                  ? "bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-500 opacity-40 cursor-not-allowed"
              }`}
              title={!isCardPaid(activeActionSheetCard) ? "Paiement requis pour copier le lien" : undefined}
            >
              <span className="flex items-center gap-2">
                {copiedId === activeActionSheetCard.id ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className={`w-4 h-4 ${isCardPaid(activeActionSheetCard) ? "text-neutral-300" : "text-neutral-500"}`} />
                )}
                <span>{copiedId === activeActionSheetCard.id ? "Lien copié !" : "Copier le lien public"}</span>
              </span>
              {!isCardPaid(activeActionSheetCard) && (
                <span className="text-[10px] uppercase font-bold text-neutral-400">Paiement requis</span>
              )}
            </button>

            <button
              onClick={() => {
                setExportCard(activeActionSheetCard);
                setActiveActionSheetCard(null);
              }}
              className="w-full py-3 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-between transition"
            >
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-neutral-300" />
                Exporter en Image / PDF
              </span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              onClick={() => {
                setCardToDelete(activeActionSheetCard);
                setActiveActionSheetCard(null);
              }}
              className="w-full py-3 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-red-400 text-xs font-semibold flex items-center justify-between transition mt-1"
            >
              <span className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Supprimer la carte
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareCard && (
        <ShareModal
          isOpen={!!shareCard}
          onClose={() => setShareCard(null)}
          slug={shareCard.slug}
          fullName={`${shareCard.firstName} ${shareCard.lastName}`}
        />
      )}

      {/* Export Modal */}
      {exportCard && (
        <ExportModal
          isOpen={!!exportCard}
          onClose={() => setExportCard(null)}
          card={exportCard}
        />
      )}

      {/* Delete Confirmation Modal */}
      {cardToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-in fade-in duration-150">
          <div className="bg-neutral-900 rounded-3xl max-w-sm w-full p-6 border border-neutral-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800 text-red-400 border border-neutral-700 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">
                Supprimer cette carte ?
              </h3>
              <p className="text-xs text-neutral-400">
                Êtes-vous sûr de vouloir supprimer la carte de{" "}
                <span className="font-semibold text-white">
                  {cardToDelete.firstName} {cardToDelete.lastName}
                </span>{" "}
                ?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setCardToDelete(null)}
                disabled={isDeleting}
                className="py-2.5 px-4 rounded-xl border border-neutral-700 text-neutral-300 text-xs font-semibold hover:bg-neutral-800 transition"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                {isDeleting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>Supprimer</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order / Payment Modal */}
      {orderModalCard && (
        <OrderModal
          isOpen={!!orderModalCard}
          onClose={() => setOrderModalCard(null)}
          preselectedCard={orderModalCard}
          availableCards={[orderModalCard]}
          initialColor={orderModalCard.dominantColor === "white" ? "BLANC_PERLE" : "NOIR_MAT"}
          onOrderSuccess={() => {
            fetchCards();
            setOrderModalCard(null);
          }}
        />
      )}
    </div>
  );
}
