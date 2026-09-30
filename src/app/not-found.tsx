import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard, Search, ArrowLeft, Plus } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-[#111111]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF3EB] text-[#FF6B00] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
              Erreur 404
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#111111]">
              Carte ou page introuvable
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              L&apos;adresse demandée n&apos;existe pas ou cette carte de visite a été renommée ou désactivée par son propriétaire.
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
              <span>Créer ma propre carte</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-asuka-black.png"
              alt="Asuka Card"
              className="h-5 w-auto object-contain opacity-70"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
