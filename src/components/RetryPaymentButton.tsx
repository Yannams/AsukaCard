"use client";

import React, { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

interface RetryPaymentButtonProps {
  orderId: string;
  amount: number;
}

export default function RetryPaymentButton({ orderId, amount }: RetryPaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pay", paymentMethod: "FEDAPAY" }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Impossible de relancer le paiement.");
      }
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      window.location.reload();
    } catch (err: any) {
      setError(err?.message || "Erreur lors de la relance du paiement.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {error && (
        <p className="text-xs text-red-600 font-medium text-center">{error}</p>
      )}
      <button
        type="button"
        onClick={handleRetry}
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-full bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs sm:text-sm font-semibold transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CreditCard className="w-4 h-4" />
        )}
        <span>
          {loading
            ? "Redirection vers FedaPay..."
            : `Relancer le paiement (${amount.toLocaleString("fr-FR")} FCFA)`}
        </span>
      </button>
    </div>
  );
}
