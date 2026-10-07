"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Mon interlocuteur doit-il installer une application ?",
      a: "Non, absolument aucune application n'est requise. Lorsqu'il approche son smartphone ou scanne le QR code, votre profil s'ouvre directement dans son navigateur web par défaut (Safari, Chrome). Il n'a plus qu'à toucher « Enregistrer le contact ».",
    },
    {
      q: "Quels smartphones sont compatibles avec la carte Asuka ?",
      a: "Tous les iPhone récents (à partir de l'iPhone XS sous iOS 13+) et l'immense majorité des smartphones Android sont équipés d'un lecteur NFC actif par défaut. Pour les modèles plus anciens, le QR code gravé au verso garantit une compatibilité à 100%.",
    },
    {
      q: "Que se passe-t-il si je change de numéro, d'email ou de poste ?",
      a: "Vous vous connectez à votre espace Asuka Card depuis votre navigateur et modifiez vos informations en quelques secondes. La mise à jour est instantanée pour toutes les personnes qui approchent ou scannent votre carte.",
    },
    {
      q: "La carte a-t-elle besoin d'une batterie ou d'être rechargée ?",
      a: "Jamais. La puce NFC intégrée fonctionne par induction électromagnétique passive émise par le smartphone. Votre carte ne s'épuise pas et reste toujours prête à l'emploi.",
    },
    {
      q: "Y a-t-il un abonnement mensuel obligatoire ?",
      a: "Non. Votre carte physique et l'hébergement de votre profil digital sont acquis à vie lors de votre commande unique. Zéro mensualité, zéro frais caché.",
    },
    {
      q: "Mes données personnelles sont-elles protégées ?",
      a: "Totalement. Nous respectons rigoureusement les normes de confidentialité et le RGPD. Vos coordonnées ne sont ni vendues ni tracées, et vous gardez la maîtrise absolue de ce que vous partagez.",
    },
  ];

  return (
    <section id="faq" className="bg-[#fbfbfd] py-24 sm:py-36 border-t border-black/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
            Questions fréquentes.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6e6e73]">
            Tout ce que vous souhaitez savoir sur la technologie et l&apos;utilisation d&apos;Asuka Card.
          </p>
        </div>

        <div className="divide-y divide-[#d2d2d7]">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-6 sm:py-7">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-medium tracking-tight text-[#1d1d1f] group-hover:text-[#FF6B00] transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-[#e5e5ea]" : "group-hover:bg-[#e5e5ea]"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base text-[#6e6e73] leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
