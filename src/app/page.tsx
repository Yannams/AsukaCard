import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Nfc,
  Smartphone,
  Infinity as InfinityIcon,
  Sparkles,
  QrCode,
  Share2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalaxyHero from "@/components/GalaxyHero";
import HowItWorksInteractive from "@/components/HowItWorksInteractive";
import ColorOrder from "@/components/ColorOrder";
import FaqSection from "@/components/FaqSection";
import Reveal from "@/components/Reveal";
import { AnimatedLockCard } from "@/components/AnimatedLockCard";



export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbfd] text-[#1d1d1f] selection:bg-[#FF6B00] selection:text-white">
      <Navbar theme="dark" />

      {/* HERO SECTION STYLE APPLE PAY */}
      <GalaxyHero />

      {/* BENTO GRID INNOVATIONS */}
      <section className="bg-[#fbfbfd] py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
                Expérience sans couture
              </span>
              <h2 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                Pensée pour aller vite.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* CARTE 1 : TECHNOLOGIE NFC (col-span-2, DARK, CARTE BLANCHE + HAUT DE L'IPHONE SANS BORDURES NI CONTENEURS BIZARRES) */}
            <Reveal delay={0} className="md:col-span-2">
              <div className="relative flex min-h-[420px] lg:min-h-[440px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-black p-8 sm:p-10 text-[#f5f5f7] transition-transform duration-300 hover:-translate-y-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10">
                  <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wider uppercase text-[#86868b]">
                        Technologie NFC
                      </span>
                      <Nfc className="h-7 w-7 text-[#FF6B00]" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight">
                        Détection en 0,2 s.
                      </h3>
                      <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#a1a1a6]">
                        Un simple effleurement suffit. La puce intégrée transmet instantanément l&apos;adresse sécurisée de votre profil.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs text-[#FF9A4D] font-medium pt-2">
                      <span className="h-2 w-2 rounded-full bg-[#FF6B00] animate-pulse" />
                      <span>Sans contact instantané • Puce haute fréquence</span>
                    </div>
                  </div>

                  {/* VISUEL ÉPURÉ : IPHONE DIRECT ET CARTE BLANCHE ORIGINALE */}
                  <div className="lg:col-span-6 relative h-[280px] sm:h-[320px] -mb-10 -mr-6 sm:-mr-8 flex items-end justify-center pointer-events-none">
                    {/* Carte Asuka Blanche redressée (sans -12deg) et proportionnelle au téléphone */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/white-card-front.png"
                      alt="Carte Asuka Blanche sans contact"
                      className="absolute bottom-16 sm:bottom-20 left-2 sm:left-6 w-[200px] sm:w-[230px] drop-shadow-2xl z-10 transition-transform duration-500 hover:-translate-y-1"
                    />

                    {/* Haut de l'iPhone avec la notification NFC qui émerge du bas de la carte */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/iphone-nfc-notification.png"
                      alt="Notification NFC Safari sur iPhone"
                      className="relative z-20 w-[270px] sm:w-[300px] h-auto object-contain -mb-40 sm:-mb-44 drop-shadow-[0_-10px_30px_rgba(0,0,0,0.9)]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CARTE 2 : UNIVERSALITÉ (col-span-1, LIGHT, VRAIS HAUTS DE TÉLÉPHONES SANS CONTENEURS BIZARRES) */}
            <Reveal delay={70} className="md:col-span-1">
              <div className="relative flex min-h-[420px] lg:min-h-[440px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#f5f5f7] p-8 sm:p-10 text-[#1d1d1f] transition-transform duration-300 hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#6e6e73]">
                      Universalité
                    </span>
                    <Smartphone className="h-7 w-7 text-[#FF6B00]" strokeWidth={1.8} />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                      iOS & Android.
                    </h3>
                    <p className="mt-2 text-base text-[#6e6e73] leading-relaxed">
                      Fonctionne nativement sur des centaines de millions d&apos;appareils, sans application tierce.
                    </p>
                  </div>
                </div>

                {/* VISUEL ÉPURÉ : LES DEUX HAUTS DE SMARTPHONES ÉMERGEANT DU BAS */}
                <div className="relative h-[210px] -mb-10 -mx-6 flex items-end justify-center gap-3 overflow-hidden pointer-events-none">
                  {/* Smartphone 1 (iOS) */}
                  <div className="w-[130px] flex flex-col items-center -mb-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/iphone-nfc-notification.png"
                      alt="Haut iPhone iOS"
                      className="w-full h-auto object-cover object-top drop-shadow-xl"
                    />
                  </div>

                  {/* Smartphone 2 (Android) */}
                  <div className="w-[130px] flex flex-col items-center -mb-48 opacity-90">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/iphone-nfc-notification.png"
                      alt="Haut smartphone Android"
                      className="w-full h-auto object-cover object-top drop-shadow-xl brightness-95"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CARTE 3 : SECOURS GARANTI (col-span-1, LIGHT, VERSO CARTE SANS BORDURES NI BOÎTE BIZARRE) */}
            <Reveal delay={140} className="md:col-span-1">
              <div className="relative flex min-h-[420px] lg:min-h-[440px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-[#f5f5f7] p-8 sm:p-10 text-[#1d1d1f] transition-transform duration-300 hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#6e6e73]">
                      Secours garanti
                    </span>
                    <QrCode className="h-7 w-7 text-[#FF6B00]" strokeWidth={1.8} />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                      QR Code gravé.
                    </h3>
                    <p className="mt-2 text-base text-[#6e6e73] leading-relaxed">
                      Au verso, un QR Code haute définition prend le relais pour les appareils non équipés de NFC.
                    </p>
                  </div>
                </div>

                {/* VISUEL ÉPURÉ : CARTE NOIRE REDRESSÉE À LA VERTICALE SANS OMBRE GRISE DIFFUSE */}
                <div className="relative h-[190px] -mb-10 -mx-6 flex items-end justify-center overflow-hidden pointer-events-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/black-card-vertical-qr.png"
                    alt="Verso de la carte Asuka avec QR Code gravé"
                    className="w-[170px] sm:w-[185px] h-auto object-contain translate-y-10 sm:translate-y-12 -mb-14 transition-transform duration-500 hover:translate-y-8"
                  />
                </div>
              </div>
            </Reveal>

            {/* CARTE 4 : ÉCONOMIQUE & DURABLE (col-span-2, DARK, CARTE ASUKA BLANCHE PURE SANS BORDURES BIZARRES) */}
            <Reveal delay={210} className="md:col-span-2">
              <div className="relative flex min-h-[420px] lg:min-h-[440px] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-black p-8 sm:p-10 text-[#f5f5f7] transition-transform duration-300 hover:-translate-y-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10">
                  <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-wider uppercase text-[#86868b]">
                        Économique & Durable
                      </span>
                      <InfinityIcon className="h-7 w-7 text-[#FF6B00]" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight">
                        Une seule carte. Pour toujours.
                      </h3>
                      <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#a1a1a6]">
                        Fini les boîtes de 500 cartes papier jetées à chaque changement de poste. Mettez vos coordonnées à jour en ligne à volonté, sans frais.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs text-neutral-400 font-mono tracking-wider uppercase pt-2">
                      <span className="text-[#FF6B00]">✓</span>
                      <span>Zéro réimpression • Finition premium • À vie</span>
                    </div>
                  </div>

                  {/* VISUEL ÉPURÉ : CARTE BLANCHE PURE SANS BORDURES NI CONTENEURS */}
                  <div className="lg:col-span-6 relative h-[280px] sm:h-[320px] -mb-10 -mr-6 sm:-mr-8 flex items-end justify-end pointer-events-none">
                    {/* Carte Asuka Blanche avec son logo bien net qui déborde du bas-droit */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/white-card-front.png"
                      alt="Carte Asuka Blanche avec logo gravé"
                      className="w-[340px] sm:w-[390px] h-auto -rotate-6 translate-x-4 sm:translate-x-8 -mb-12 sm:-mb-14 drop-shadow-[0_25px_50px_rgba(255,255,255,0.12)] transition-transform duration-500 hover:rotate-0"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE : AMBIANCE SOMBRE APPLE PAY */}
      <section id="usages" className="bg-black py-24 sm:py-36 text-[#f5f5f7] isolate relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B00]">
              Facile comme bonjour
            </span>
            <h2 className="mt-3 text-4xl sm:text-6xl font-semibold leading-[1.06] tracking-[-0.035em]">
              Trois secondes.
              <br />
              <span className="text-[#86868b]">Zéro friction.</span>
            </h2>
          </Reveal>
          <Reveal delay={150} className="mt-16 sm:mt-20">
            <HowItWorksInteractive />
          </Reveal>
        </div>
      </section>

      {/* SÉCURITÉ ET CONFIDENTIALITÉ : GRANDE CARTE GRISE STYLE APPLE BENTO */}
      <section id="securite" className="bg-[#fbfbfd] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <AnimatedLockCard />
          </Reveal>
        </div>
      </section>

      {/* COULEURS ET COMMANDE PRODUIT */}
      <section id="commander" className="bg-[#fbfbfd] py-24 sm:py-36">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div id="modeles" />
            <ColorOrder />
          </Reveal>
        </div>
      </section>

      {/* BANNIÈRE PASSEZ AU SANS CONTACT */}
      <section className="bg-black py-20 sm:py-28 text-center text-white">
        <Reveal className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.035em] leading-[1.08]">
            Prêt à faire passer votre networking{" "}
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF9A4D] to-[#FFB347] bg-clip-text text-transparent">
              dans une nouvelle dimension ?
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-xl text-[#a1a1a6] max-w-xl mx-auto">
            Commandez votre carte dès aujourd&apos;hui et commencez à partager vos coordonnées avec style.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/commander"
              className="rounded-full bg-[#FF6B00] px-8 py-3.5 text-base font-medium text-white transition hover:bg-[#E55F00] active:scale-95 shadow-lg shadow-[#FF6B00]/20"
            >
              Commander maintenant
            </Link>
            <Link
              href="/richard-odjrado"
              className="group inline-flex items-center rounded-full bg-white/10 px-7 py-3.5 text-base font-medium text-white transition hover:bg-white/15"
            >
              Voir un profil démo
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FAQ SECTION STYLE APPLE */}
      <FaqSection />

      {/* FOOTER OFFICIEL APPLE STYLE */}
      <Footer />
    </div>
  );
}
