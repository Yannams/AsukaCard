import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import CardForm from "@/components/CardForm";

export const metadata = {
  title: "Créer une carte - Asuka Card",
  description: "Personnalisez directement votre carte Asuka Card.",
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
      {/* En-tête minimal avec bouton retour vers la page précédente */}
      <header className="w-full max-w-md mx-auto px-4 pt-4 pb-1 flex items-center justify-between z-10">
        <BackButton label="Retour" fallbackHref="/dashboard" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
          Asuka Card Studio
        </span>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto px-2 sm:px-4 py-2 sm:py-4 flex flex-col items-center justify-center">
        <CardForm initialData={dominantColor ? { dominantColor } : undefined} />
      </main>

      <Footer />
    </div>
  );
}

