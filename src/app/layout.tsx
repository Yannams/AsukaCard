import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asuka Card - Cartes de visite digitales haut de gamme",
  description:
    "Créez, personnalisez et partagez vos cartes de visite numériques élégantes. Partage instantané par QR code, téléchargement direct vCard (.vcf) et URL personnalisée.",
  keywords: [
    "carte de visite digitale",
    "carte de visite numérique",
    "asuka card",
    "vcard",
    "qr code",
    "networking",
  ],
  authors: [{ name: "Asuka Card" }],
  openGraph: {
    title: "Asuka Card - Cartes de visite digitales haut de gamme",
    description:
      "Créez, personnalisez et partagez votre identité professionnelle en quelques clics avec une URL unique.",
    siteName: "Asuka Card",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${instrumentSerif.variable} ${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#111111]">
        {children}
      </body>
    </html>
  );
}
