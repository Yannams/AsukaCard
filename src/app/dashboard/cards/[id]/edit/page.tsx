import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardForm from "@/components/CardForm";
import { getCardById } from "@/lib/db";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Modifier mon invitation - Asuka Card",
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
      <Navbar />

      <main className="flex-1 w-full max-w-md mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        <CardForm initialData={card} isEditing={true} />
      </main>

      <Footer />
    </div>
  );
}
