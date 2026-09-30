import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCardBySlug } from "@/lib/db";
import PublicCardClient from "@/components/PublicCardClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getCardBySlug(slug);

  if (!card) {
    return {
      title: "Carte non trouvée — Asuka Card",
      description: "Cette carte de visite digitale n'existe pas ou a été supprimée.",
    };
  }

  const fullName = `${card.firstName} ${card.lastName}`.trim();
  const titleText = `${fullName}${card.title ? ` — ${card.title}` : ""}${card.company ? ` | ${card.company}` : ""} — Asuka Card`;
  const descText = card.bio || `Retrouvez les coordonnées et le profil de ${fullName} sur Asuka Card.`;

  return {
    title: titleText,
    description: descText,
    openGraph: {
      title: titleText,
      description: descText,
      url: `https://asuka-card.com/${card.slug}`,
      siteName: "Asuka Card",
      images: card.avatarUrl ? [{ url: card.avatarUrl }] : [],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descText,
      images: card.avatarUrl ? [card.avatarUrl] : [],
    },
  };
}

export default async function PublicCardPage({ params }: PageProps) {
  const { slug } = await params;
  const card = getCardBySlug(slug);

  if (!card) {
    notFound();
  }

  return <PublicCardClient card={card} />;
}
