"use client";

import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { X, Image as ImageIcon, FileText, Download, Loader2 } from "lucide-react";
import CardPreview from "./CardPreview";
import { Card } from "@/lib/db";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: Card;
}

export default function ExportModal({
  isOpen,
  onClose,
  card,
}: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<"png" | "pdf" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleExportPng = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    setExportType("png");
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `asuka-card-${card.slug}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export PNG Error:", err);
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExportPdf = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    setExportType("pdf");
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 25;
      const printWidth = pdfWidth - margin * 2;
      const printHeight = (imgProps.height * printWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", margin, 20, printWidth, printHeight);
      pdf.save(`asuka-card-${card.slug}.pdf`);
    } catch (err) {
      console.error("Export PDF Error:", err);
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200 relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 shrink-0">
          <div>
            <h3 className="text-base font-semibold text-[#111111]">
              Télécharger ma carte
            </h3>
            <p className="text-xs text-neutral-500">
              Exportez votre carte Asuka Card en haute résolution.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Render Container */}
        <div className="py-4 overflow-y-auto flex-1 flex justify-center bg-neutral-100 rounded-xl my-4 p-4 border border-neutral-200">
          <div ref={cardRef} className="w-full max-w-sm">
            <CardPreview card={card} interactive={false} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-100 shrink-0">
          <button
            onClick={handleExportPng}
            disabled={isExporting}
            className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-[#111111] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isExporting && exportType === "png" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ImageIcon className="w-4 h-4" />
            )}
            <span>Télécharger en Image (PNG)</span>
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="py-2.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isExporting && exportType === "pdf" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            <span>Télécharger en PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
