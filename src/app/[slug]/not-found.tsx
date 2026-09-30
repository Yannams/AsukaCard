import React from "react";
import Link from "next/link";
import { CreditCard, Search, ArrowLeft, Plus } from "lucide-react";

export default function SlugNotFound() {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-between py-8 px-4 sm:px-6 text-[#111111]">
      <div className="max-w-md w-full mx-auto flex items-center justify-between pb-4">
        <Link
          href="/"
          className="flex items-center gap-2 group text-neutral-600 hover:text-[#111111] transition-colors text-xs font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Accueil</span>
        </Link>
        <Link href="/" className="group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-asuka-black.png"
            alt="Asuka Card"
            className="h-6 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center my-6">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF3EB] text-[#FF6B00] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
              Profil Introuvable
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#111111]">
              Cette carte n&apos;existe pas
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Le nom d&apos;utilisateur demandé n&apos;est pas attribué ou la carte de visite a été désactivée.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </Link>

            <Link
              href="/create"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Créer cette URL</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
            <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
            <span>Asuka Card — Identité digitale</span>
          </div>
        </div>
      </main>

      <footer className="max-w-md w-full mx-auto text-center pt-4 text-xs text-neutral-400">
        © {new Date().getFullYear()} Asuka Card
      </footer>
    </div>
  );
}
