import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CardForm from "@/components/CardForm";

export const metadata = {
  title: "Créer mon invitation Apple - Asuka Card",
  description: "Personnalisez directement votre invitation Apple en temps réel.",
};

interface CreateCardPageProps {
  searchParams: Promise<{ couleur?: string; color?: string }>;
}

export default async function CreateCardPage({ searchParams }: CreateCardPageProps) {
  const params = await searchParams;
  const rawColor = (params?.couleur || params?.color || "").toLowerCase();
  const dominantColor =
    rawColor === "white" || rawColor === "blanc"
      ? "white"
      : rawColor === "orange"
      ? "orange"
      : "black";

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-white">
      <Navbar />

      <main className="flex-1 w-full max-w-md mx-auto px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center justify-center">
        <CardForm initialData={dominantColor ? { dominantColor } : undefined} />
      </main>

      <Footer />
    </div>
  );
}
