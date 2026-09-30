import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardForm from "@/components/CardForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCardById } from "@/lib/db";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Modifier ma carte de visite — Asuka Card",
};

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = getCardById(id);

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-[#111111]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour au tableau de bord</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            Modifier votre carte ({card.firstName} {card.lastName})
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Mettez à jour vos coordonnées ou votre style. Les changements s&apos;appliqueront immédiatement sur votre page publique.
          </p>
        </div>

        {/* Card Form with initial data */}
        <CardForm initialData={card} isEditing={true} />
      </main>

      <Footer />
    </div>
  );
}
