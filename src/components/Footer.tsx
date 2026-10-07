"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, FileText, Lock, X } from "lucide-react";

export default function Footer() {
  const [modalContent, setModalContent] = useState<null | { title: string; content: string }>(null);

  const openPrivacy = () => {
    setModalContent({
      title: "Engagement de confidentialité",
      content: `Chez Asuka Card, la protection de vos données personnelles est au cœur de notre conception.

1. Collecte minimale : Seules les données professionnelles que vous choisissez d'afficher sur votre carte (nom, poste, société, coordonnées, photo) sont stockées.
2. Aucune revente : Vos données ne sont jamais vendues, louées ni transmises à des tiers publicitaires.
3. Chiffrement : Toutes les communications entre votre carte, votre profil web et nos serveurs sont protégées par chiffrement HTTPS/TLS moderne.
4. Contrôle total : Vous pouvez à tout moment modifier, désactiver ou supprimer définitivement vos cartes et informations depuis votre espace membre.
5. Conformité RGPD : Le traitement de vos données est strictement conforme aux exigences européennes.`,
    });
  };

  const openTerms = () => {
    setModalContent({
      title: "Conditions générales de service",
      content: `Bienvenue sur Asuka Card.

1. Objet : Asuka Card propose des cartes de visite physiques équipées de puces sans contact NFC, associées à un profil numérique interactif en ligne.
2. Achat unique : L'acquisition d'une carte donne un accès pérenne et sans abonnement à la plateforme d'édition de profil.
3. Responsabilité : L'utilisateur s'engage à n'utiliser que des informations exactes et dont il détient les droits.
4. Garantie matérielle : Les cartes physiques sont testées rigoureusement avant expédition et bénéficient d'une garantie de conformité.
5. Disponibilité : Nous assurons un taux de disponibilité optimal pour l'hébergement de votre fiche contact en ligne.`,
    });
  };

  return (
    <footer className="bg-[#f5f5f7] text-[#6e6e73] text-xs border-t border-[#d2d2d7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Footnotes style Apple */}
        <div className="space-y-2 pb-8 border-b border-[#d2d2d7] text-[11px] leading-relaxed">
          <p>
            1. La technologie NFC sans contact est prise en charge nativement sur tous les iPhone (iPhone XS et modèles ultérieurs sous iOS 13 ou version ultérieure) ainsi que sur la plupart des appareils Android compatibles.
          </p>
          <p>
            2. Aucun téléchargement d&apos;application ni création de compte n&apos;est nécessaire pour la personne qui reçoit vos coordonnées.
          </p>
          <p>
            3. Paiement en une seule fois. Aucun abonnement mensuel ou annuel n&apos;est requis pour conserver votre fiche de contact active.
          </p>
        </div>

        {/* Directory columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[#d2d2d7]">
          <div>
            <h4 className="text-[#1d1d1f] font-semibold text-xs mb-3">Produit</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#commander" className="hover:text-[#1d1d1f] hover:underline transition-colors">
                  Commander une carte
                </Link>
              </li>
              <li>
                <Link href="#usages" className="hover:text-[#1d1d1f] hover:underline transition-colors">
                  Fonctionnement NFC
                </Link>
              </li>
              <li>
                <Link href="#modeles" className="hover:text-[#1d1d1f] hover:underline transition-colors">
                  Finitions Noir & Blanc
                </Link>
              </li>
              <li>
                <Link href="/richard-odjrado" className="hover:text-[#1d1d1f] hover:underline transition-colors">
                  Exemple en direct
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#1d1d1f] font-semibold text-xs mb-3">Compte client</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/dashboard" className="hover:text-[#1d1d1f] hover:underline transition-colors">
                  Gérer mes cartes
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#1d1d1f] hover:underline transition-colors">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-[#1d1d1f] hover:underline transition-colors">
                  Créer un profil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#1d1d1f] font-semibold text-xs mb-3">Valeurs Asuka</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-[#1d1d1f] font-medium">Zéro déchet papier</span>
              </li>
              <li>
                <span className="text-[#1d1d1f] font-medium">Confidentialité par défaut</span>
              </li>
              <li>
                <span className="text-[#1d1d1f] font-medium">vCard 3.0 universelle</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#1d1d1f] font-semibold text-xs mb-3">Sécurité & Légal</h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={openPrivacy}
                  className="hover:text-[#1d1d1f] hover:underline text-left transition-colors"
                >
                  Engagement de confidentialité
                </button>
              </li>
              <li>
                <button
                  onClick={openTerms}
                  className="hover:text-[#1d1d1f] hover:underline text-left transition-colors"
                >
                  Conditions d&apos;utilisation
                </button>
              </li>
              <li className="flex items-center gap-1.5 pt-1 text-[#1d1d1f]">
                <Lock className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Connexion sécurisée SSL</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px]">
          <p>Copyright © {new Date().getFullYear()} Asuka Card Inc. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#6e6e73]">
            <button onClick={openPrivacy} className="hover:text-[#1d1d1f] hover:underline">
              Confidentialité
            </button>
            <span>|</span>
            <button onClick={openTerms} className="hover:text-[#1d1d1f] hover:underline">
              Conditions générales
            </button>
            <span>|</span>
            <Link href="#faq" className="hover:text-[#1d1d1f] hover:underline">
              Assistance & FAQ
            </Link>
            <span>|</span>
            <span>France / Bénin / International</span>
          </div>
        </div>
      </div>

      {/* Modal légal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white text-[#1d1d1f] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-black/[0.08] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.08] mb-4">
              <h3 className="font-semibold text-lg text-[#1d1d1f]">{modalContent.title}</h3>
              <button
                onClick={() => setModalContent(null)}
                className="p-1.5 rounded-full text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/5"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm text-[#6e6e73] space-y-3 whitespace-pre-line max-h-80 overflow-y-auto leading-relaxed pr-2">
              {modalContent.content}
            </div>
            <div className="mt-6 pt-4 border-t border-black/[0.08] flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-5 py-2 text-xs font-medium bg-[#1d1d1f] hover:bg-black text-white rounded-full transition-colors"
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
