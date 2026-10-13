import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ColorOrder from "@/components/ColorOrder";

export const metadata = {
  title: "Choisir la couleur de votre carte - Asuka Card",
  description: "Sélectionnez votre finition Asuka Card : Noir mat obsidienne ou Blanc perle céramique.",
};

export default function CommanderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbfd] text-[#1d1d1f] selection:bg-[#FF6B00] selection:text-white">
      <Navbar theme="light" />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex flex-col justify-center">
        <ColorOrder />
      </main>

      <Footer />
    </div>
  );
}
