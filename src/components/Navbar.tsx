"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, LogOut, Plus, Shield } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface NavbarProps {
  theme?: "light" | "dark";
}

export default function Navbar({ theme = "light" }: NavbarProps) {
  const isDark = theme === "dark";
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch {
      // ignore
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");
  const isFunnelPage =
    isDashboard ||
    pathname?.startsWith("/commander") ||
    pathname?.startsWith("/orders") ||
    pathname?.startsWith("/create");

  return (
    <>
    <header
      className={`sticky top-0 z-40 transition-colors backdrop-blur-xl ${
        isDark
          ? "bg-black/60 text-white"
          : "bg-[rgba(255,255,255,0.82)] border-b border-black/[0.08] text-[#1d1d1f]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-14">
          {/* Brand Logo / Sub-brand */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={isDark ? "/images/logo-asuka-white.png" : "/images/logo-asuka-black.png"}
                alt="Asuka Card"
                className="h-5 sm:h-5.5 w-auto object-contain transition-opacity group-hover:opacity-80"
              />
            </Link>
            {isDashboard && (
              <span className="hidden sm:inline-flex items-center text-[11px] font-semibold text-neutral-400 tracking-wide uppercase px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10">
                {pathname?.startsWith("/admin") ? "Console Admin" : "Espace Client"}
              </span>
            )}
          </div>

          {/* Desktop Navigation - masquée sur les tableaux de bord et le tunnel de commande */}
          {!isFunnelPage && (
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0">
              <Link
                href="/#usages"
                className={`text-xs tracking-tight transition-colors ${
                  isDark ? "text-neutral-400 hover:text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                Comment ça marche
              </Link>
              <Link
                href="/#modeles"
                className={`text-xs tracking-tight transition-colors ${
                  isDark ? "text-neutral-400 hover:text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                Finitions
              </Link>
              <Link
                href="/#securite"
                className={`text-xs tracking-tight transition-colors ${
                  isDark ? "text-neutral-400 hover:text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                Sécurité
              </Link>
              <Link
                href="/#faq"
                className={`text-xs tracking-tight transition-colors ${
                  isDark ? "text-neutral-400 hover:text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                Questions
              </Link>
              <Link
                href="/exemple"
                className={`text-xs tracking-tight transition-colors ${
                  isDark ? "text-neutral-400 hover:text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                Exemple live
              </Link>
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {user.role === "ADMIN" ? (
                  <>
                    <Link
                      href="/admin"
                      className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full border border-orange-500/40 bg-[#FF6B00]/10 text-[#FF6B00] hover:bg-[#FF6B00]/20 transition shadow-xs"
                      title="Console d'administration des commandes et paiements"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Console Admin</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                        isDark
                          ? "text-neutral-400 hover:text-white border-neutral-700 bg-neutral-900/60"
                          : "text-neutral-600 hover:text-black border-neutral-200 bg-white"
                      }`}
                      title="Se déconnecter"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Déconnexion</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link
                      href="/dashboard"
                      className={`text-xs font-medium tracking-tight transition-colors ${
                        isDark
                          ? "text-neutral-300 hover:text-white"
                          : "text-[#1d1d1f] hover:text-[#6e6e73]"
                      }`}
                    >
                      Mes cartes
                    </Link>
                    <Link
                      href="/create"
                      className="flex items-center gap-1 text-xs font-medium text-white bg-[#FF6B00] hover:bg-[#E55F00] px-3.5 py-1.5 rounded-full transition-all shadow-sm active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Créer</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={`p-1.5 rounded-full transition-colors ${
                        isDark
                          ? "text-neutral-400 hover:text-white hover:bg-neutral-800"
                          : "text-neutral-500 hover:text-black hover:bg-neutral-100"
                      }`}
                      title="Se déconnecter"
                      aria-label="Se déconnecter"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors ${
                    isDark
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-[#1d1d1f] hover:text-[#FF6B00] hover:bg-black/5"
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  href="/commander"
                  className="text-xs font-medium text-white bg-[#FF6B00] hover:bg-[#E55F00] px-4 py-1.5 rounded-full transition-all shadow-sm active:scale-95"
                >
                  Commander
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none ${
                isDark
                  ? "text-neutral-300 hover:text-white"
                  : "text-neutral-700 hover:text-black"
              }`}
              aria-label="Ouvrir le menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-2 pb-5 space-y-2.5 backdrop-blur-2xl ${
            isDark ? "bg-[rgba(22,22,23,0.95)] border-white/10" : "bg-[rgba(255,255,255,0.96)] border-black/[0.08]"
          }`}
        >
          {!isFunnelPage && (
            <>
              <Link
                href="/#usages"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  isDark ? "text-neutral-300 hover:bg-white/5" : "text-neutral-700 hover:bg-black/5"
                }`}
              >
                Comment ça marche
              </Link>
              <Link
                href="/#modeles"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  isDark ? "text-neutral-300 hover:bg-white/5" : "text-neutral-700 hover:bg-black/5"
                }`}
              >
                Finitions
              </Link>
              <Link
                href="/#securite"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  isDark ? "text-neutral-300 hover:bg-white/5" : "text-neutral-700 hover:bg-black/5"
                }`}
              >
                Sécurité & Confidentialité
              </Link>
              <Link
                href="/#faq"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  isDark ? "text-neutral-300 hover:bg-white/5" : "text-neutral-700 hover:bg-black/5"
                }`}
              >
                Questions fréquentes
              </Link>
              <Link
                href="/exemple"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm ${
                  isDark ? "text-neutral-300 hover:bg-white/5" : "text-neutral-700 hover:bg-black/5"
                }`}
              >
                Exemple live
              </Link>
            </>
          )}
          <div className={`space-y-2 ${!isFunnelPage ? `pt-3 border-t ${isDark ? "border-white/10" : "border-black/[0.08]"}` : ""}`}>
            {user ? (
              user.role === "ADMIN" ? (
                <>
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm font-bold bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30"
                  >
                    Console Administrateur
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#6e6e73]"
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isDark ? "text-white hover:bg-white/5" : "text-[#1d1d1f] hover:bg-black/5"
                    }`}
                  >
                    Mes cartes
                  </Link>
                  <Link
                    href="/create"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center px-3 py-2.5 rounded-full text-sm font-medium text-white bg-[#FF6B00]"
                  >
                    Créer une carte
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#6e6e73]"
                  >
                    Se déconnecter
                  </button>
                </>
              )
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/commander"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-4 py-2.5 rounded-full text-sm font-medium text-white bg-[#FF6B00]"
                >
                  Commander ma carte
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-center px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    isDark
                      ? "text-white bg-white/10 hover:bg-white/15"
                      : "text-[#1d1d1f] bg-black/5 hover:bg-black/10"
                  }`}
                >
                  Connexion Espace Client
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
    </>
  );
}
