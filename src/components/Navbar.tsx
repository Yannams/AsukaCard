"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { CreditCard, Menu, X, User as UserIcon, LogOut, Plus } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
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

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        isDark
          ? "bg-black text-white"
          : "bg-white/95 border-b border-neutral-200 text-[#111111] backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isDark ? "/images/logo-asuka-white.png" : "/images/logo-asuka-black.png"}
              alt="Asuka Card"
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#usages"
              className={`text-sm font-medium transition-colors ${
                isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-[#111111]"
              }`}
            >
              Usages
            </Link>
            <Link
              href="/#modeles"
              className={`text-sm font-medium transition-colors ${
                isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-[#111111]"
              }`}
            >
              Modèles
            </Link>
            <Link
              href="/jean-dupont"
              className={`text-sm font-medium transition-colors ${
                isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-[#111111]"
              }`}
            >
              Exemple live
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border transition-colors ${
                    isDark
                      ? "text-neutral-200 hover:text-white border-neutral-700 hover:border-neutral-500 bg-neutral-900/60"
                      : "text-neutral-700 hover:text-[#111111] border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <UserIcon className="w-4 h-4 text-neutral-400" />
                  <span>{user.name}</span>
                </Link>
                <Link
                  href="/create"
                  className="flex items-center gap-1.5 text-sm font-medium text-white bg-[#FF6B00] hover:bg-[#E55F00] px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle carte</span>
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark
                      ? "text-neutral-400 hover:text-white hover:bg-neutral-800"
                      : "text-neutral-500 hover:text-[#111111] hover:bg-neutral-100"
                  }`}
                  title="Se déconnecter"
                  aria-label="Se déconnecter"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-colors ${
                    isDark
                      ? "text-neutral-300 hover:text-white hover:bg-neutral-800"
                      : "text-neutral-700 hover:text-[#111111] hover:bg-neutral-100"
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  href="/create"
                  className="text-sm font-medium text-white bg-[#FF6B00] hover:bg-[#E55F00] px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Créer ma carte
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
                  ? "text-neutral-300 hover:text-white hover:bg-neutral-800"
                  : "text-neutral-600 hover:text-[#111111] hover:bg-neutral-100"
              }`}
              aria-label="Ouvrir le menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-2 pb-4 space-y-3 ${
            isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"
          }`}
        >
          <Link
            href="/#usages"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isDark ? "text-neutral-300 hover:bg-neutral-800" : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            Usages
          </Link>
          <Link
            href="/#modeles"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isDark ? "text-neutral-300 hover:bg-neutral-800" : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            Modèles
          </Link>
          <Link
            href="/jean-dupont"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isDark ? "text-neutral-300 hover:bg-neutral-800" : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            Exemple live
          </Link>
          <div className={`pt-2 border-t space-y-2 ${isDark ? "border-neutral-800" : "border-neutral-100"}`}>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isDark ? "text-white bg-neutral-800" : "text-neutral-900 bg-neutral-100"
                  }`}
                >
                  Tableau de bord ({user.name})
                </Link>
                <Link
                  href="/create"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-3 py-2 rounded-md text-base font-medium text-white bg-[#FF6B00]"
                >
                  Créer une carte
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    isDark ? "text-neutral-400 hover:text-white" : "text-neutral-600 hover:text-[#111111]"
                  }`}
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-center px-3 py-2 rounded-md text-base font-medium border ${
                    isDark
                      ? "text-neutral-200 border-neutral-700 hover:bg-neutral-800"
                      : "text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  href="/create"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center px-3 py-2 rounded-md text-base font-medium text-white bg-[#FF6B00]"
                >
                  Créer ma carte
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
