"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { X, Copy, Check, Download, Share2, ExternalLink } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  fullName: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  slug,
  fullName,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const publicUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${slug}`
    : `https://asuka-card.com/${slug}`;

  useEffect(() => {
    if (!isOpen || !slug) return;
    QRCode.toDataURL(publicUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: "#111111",
        light: "#FFFFFF",
      },
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error("QR Code Error:", err);
      });
  }, [isOpen, slug, publicUrl]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Carte de visite digitale - ${fullName}`,
          text: `Retrouvez les coordonnées professionnelles de ${fullName} sur Asuka Card :`,
          url: publicUrl,
        });
      } catch {
        // user cancelled or unsupported
      }
    } else {
      handleCopy();
    }
  };

  const downloadQrCode = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `asuka-qrcode-${slug}.png`;
    link.href = qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div>
            <h3 className="text-base font-semibold text-[#111111]">
              Partager la carte
            </h3>
            <p className="text-xs text-neutral-500">
              {fullName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            aria-label="Fermer la boîte de dialogue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-5">
          {/* QR Code Canvas Display */}
          <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt={`QR Code pour ${fullName}`}
                className="w-48 h-48 rounded-lg shadow-sm"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-neutral-400 text-xs">
                Génération du QR Code...
              </div>
            )}
            <p className="mt-3 text-[11px] text-neutral-500 text-center">
              Scannez avec un appareil photo pour ouvrir la carte instantanément
            </p>
          </div>

          {/* Public Link Box */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">
              Lien direct personnalisé
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0 ${
                  copied
                    ? "bg-neutral-900 text-white"
                    : "bg-[#FF6B00] hover:bg-[#E55F00] text-white"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-neutral-100">
            <button
              onClick={downloadQrCode}
              disabled={!qrDataUrl}
              className="py-2.5 px-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-neutral-600" />
              <span>Télécharger QR Code</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="py-2.5 px-3 rounded-lg bg-[#111111] hover:bg-neutral-800 text-white text-xs font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-white" />
              <span>Partager sur mobile</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 text-center">
          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[#FF6B00] hover:underline"
          >
            <span>Ouvrir la page publique</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
