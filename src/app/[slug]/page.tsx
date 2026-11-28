import React from "react";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, LogIn, ArrowLeft } from "lucide-react";
import { getCardBySlug } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import PublicCardClient from "@/components/PublicCardClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = slug.replace(/\.vcf$/i, "");
  const card = await getCardBySlug(cleanSlug);

  if (!card) {
    return {
      title: "Carte non trouvée - Asuka Card",
      description: "Cette carte de visite digitale n'existe pas ou a été supprimée.",
    };
  }

  const fullName = `${card.firstName} ${card.lastName}`.trim();
  const titleText = `${fullName}${card.title ? ` - ${card.title}` : ""}${card.company ? ` | ${card.company}` : ""} - Asuka Card`;
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

  if (slug.toLowerCase() === "richard-odjrado" || slug.toLowerCase() === "demo" || slug.toLowerCase() === "jean-dupont") {
    redirect("/exemple");
  }

  if (slug.endsWith(".vcf")) {
    redirect(`/api/vcard/${slug}`);
  }

  const card = await getCardBySlug(slug);

  if (!card) {
    notFound();
  }

  // Vérification de l'état de règlement
  const isPaid =
    (card as any).orders?.some(
      (o: any) => o.paymentStatus === "PAID" || o.status === "DELIVERED" || o.status === "SHIPPED"
    ) ||
    card.userId === "usr_admin" ||
    card.userId.startsWith("usr_admin_") ||
    (card as any).user?.role === "ADMIN";

  const currentUser = await getCurrentUser();
  const isOwner = !!currentUser && (currentUser.userId === card.userId || currentUser.role === "ADMIN");

  // Si la carte n'est pas encore payée
  if (!isPaid) {
    // Si ce n'est PAS le propriétaire : la carte est inaccessible au public
    if (!isOwner) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mx-auto text-[#FF6B00]">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-neutral-400">
                ASUKA CARD
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Carte non activée
              </h1>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                La carte de <strong className="text-white">{card.firstName} {card.lastName}</strong> est actuellement en attente d&apos;activation et de règlement.
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2.5">
              <Link
                href="/login"
                className="w-full py-3 px-4 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Vous êtes le propriétaire ? Se connecter</span>
              </Link>
              <Link
                href="/"
                className="w-full py-2.5 px-4 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour à l&apos;accueil</span>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // Le propriétaire a accès au mode prévisualisation privée
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <header className="sticky top-0 z-50 bg-[#FF6B00] text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>Mode Prévisualisation • Carte en attente de paiement (inaccessible au public)</span>
          </div>
          <Link
            href="/dashboard"
            className="px-3 py-1 rounded-full bg-black text-white hover:bg-neutral-900 text-[11px] font-bold transition shrink-0 ml-3"
          >
            Régler / Tableau de bord
          </Link>
        </header>

        <div className="flex-1">
          <PublicCardClient card={card} isPreviewMode={true} />
        </div>
      </div>
    );
  }

  return <PublicCardClient card={card} isPreviewMode={false} />;
}
