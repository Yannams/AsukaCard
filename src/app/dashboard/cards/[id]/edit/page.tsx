import React from "react";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import CardForm from "@/components/CardForm";
import { getCardById } from "@/lib/db";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Modifier ma carte - Asuka Card",
};

export default async function EditCardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = await getCardById(id);

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-white">
      {/* En-tête minimal d'édition */}
      <header className="w-full max-w-md mx-auto px-4 pt-4 pb-1 flex items-center justify-between z-10">
        <BackButton label="Retour" fallbackHref="/dashboard" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          Édition Carte
        </span>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto px-2 sm:px-4 py-2 sm:py-4 flex flex-col items-center justify-center">
        <CardForm initialData={card} isEditing={true} />
      </main>

      <Footer />
    </div>
  );
}

