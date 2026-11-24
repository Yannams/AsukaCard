"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  fallbackHref?: string;
  className?: string;
}

export default function BackButton({
  label = "Retour",
  fallbackHref = "/dashboard",
  className,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={
        className ||
        "inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors py-1.5 px-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800"
      }
    >
      <ChevronLeft className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}
