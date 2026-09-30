"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreditCard, Shield, FileText, Lock, X } from "lucide-react";

export default function Footer() {
  const [modalContent, setModalContent] = useState<null | { title: string; content: string }>(null);

  const openPrivacy = () => {
    setModalContent({
      title: "Politique de confidentialité",
      content: `Chez Asuka Card, la protection de vos données personnelles est primordiale.

1. Collecte des données : Nous collectons uniquement les informations que vous décidez de renseigner sur votre carte (nom, fonction, société, coordonnées, photo) ainsi que les données techniques nécessaires au fonctionnement de la session.
2. Utilisation : Vos données servent exclusivement à composer votre carte de visite numérique et à générer votre page publique ainsi que votre fichier vCard (.vcf).
3. Partage : Aucune donnée n'est cédée ni commercialisée à des tiers.
4. Contrôle : Vous restez maître de vos informations et pouvez à tout moment modifier ou supprimer votre carte depuis votre tableau de bord.
5. Hébergement : Vos données sont traitées de manière sécurisée et stockées selon les standards de l'art.`,
    });
  };

  const openTerms = () => {
    setModalContent({
      title: "Conditions d'utilisation",
      content: `Bienvenue sur Asuka Card.

1. Objet : Asuka Card est un service de création, personnalisation et diffusion de cartes de visite digitales professionnelles.
2. Responsabilité : L'utilisateur s'engage à ne publier que des informations véridiques lui appartenant ou pour lesquelles il dispose des droits requis.
3. Disponibilité : Nous nous efforçons d'assurer une disponibilité continue de la plateforme et de vos cartes publiques.
4. Propriété intellectuelle : L'ensemble de la marque Asuka Card, de ses interfaces et de son identité visuelle est protégé.
5. Résiliation : Tout utilisateur peut à tout moment supprimer ses cartes et son compte en quelques clics.`,
    });
  };

  return (
    <footer className="bg-[#111111] text-neutral-400 border-t border-neutral-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-asuka-white.png"
                alt="Asuka Card"
                className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-neutral-400 text-xs leading-relaxed">
              La plateforme moderne et premium pour créer, personnaliser et partager des cartes de visite numériques élégantes.
            </p>
            <p className="text-neutral-500 text-xs">
              Conçu pour les professionnels exigeants.
            </p>
          </div>

          {/* Links 1: Produit */}
          <div>
            <h4 className="text-white font-medium text-sm mb-3">Produit</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/create" className="hover:text-white transition-colors">
                  Créer ma carte
                </Link>
              </li>
              <li>
                <Link href="/jean-dupont" className="hover:text-white transition-colors">
                  Voir un exemple live
                </Link>
              </li>
              <li>
                <Link href="/#modeles" className="hover:text-white transition-colors">
                  Modèles disponibles
                </Link>
              </li>
              <li>
                <Link href="/#avantages" className="hover:text-white transition-colors">
                  Avantages & QR Code
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2: Espace membre */}
          <div>
            <h4 className="text-white font-medium text-sm mb-3">Espace membre</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Créer un compte
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 3: Légal */}
          <div>
            <h4 className="text-white font-medium text-sm mb-3">Légal & Sécurité</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={openPrivacy}
                  className="flex items-center gap-1.5 hover:text-white transition-colors text-left"
                >
                  <Shield className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Politique de confidentialité</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openTerms}
                  className="flex items-center gap-1.5 hover:text-white transition-colors text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Conditions d&apos;utilisation</span>
                </button>
              </li>
              <li className="flex items-center gap-1.5 text-neutral-500">
                <Lock className="w-3.5 h-3.5" />
                <span>Sécurisé SSL / vCard 3.0</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Asuka Card. Tous droits réservés.</p>
          <p>Identité visuelle Orange, Noir & Blanc — 100% en Français.</p>
        </div>
      </div>

      {/* Modal légal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white text-neutral-900 rounded-xl max-w-lg w-full p-6 shadow-xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
              <h3 className="font-semibold text-lg text-[#111111]">{modalContent.title}</h3>
              <button
                onClick={() => setModalContent(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm text-neutral-600 space-y-3 whitespace-pre-line max-h-80 overflow-y-auto leading-relaxed pr-2">
              {modalContent.content}
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 text-sm font-medium bg-[#111111] hover:bg-neutral-800 text-white rounded-lg transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
