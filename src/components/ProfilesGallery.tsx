"use client";

import React from "react";
import Link from "next/link";
import CardPreview from "./CardPreview";
import { Card } from "@/lib/db";
import { ArrowUpRight } from "lucide-react";

interface ProfilesGalleryProps {
  demoCards: Card[];
}

export default function ProfilesGallery({ demoCards }: ProfilesGalleryProps) {
  if (!demoCards || demoCards.length === 0) return null;

  return (
    <section id="modeles" className="py-24 sm:py-32 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-neutral-400 block">
            Démonstrations Réelles
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Découvrez les profils digitaux.
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Chaque membre dispose d&apos;une interface responsive soignée, optimisée pour un chargement instantané lors du scan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoCards.map((c) => (
            <div key={c.id} className="space-y-4">
              <div className="flex items-center justify-between px-2 text-xs">
                <span className="font-semibold text-neutral-200">
                  {c.firstName} {c.lastName} ({c.company})
                </span>
                <Link
                  href={`/${c.slug}`}
                  className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  <span>Voir la page live</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-900/60 p-2">
                <CardPreview card={c} interactive={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
