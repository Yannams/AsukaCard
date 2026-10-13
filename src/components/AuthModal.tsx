"use client";

import React, { useState } from "react";
import { X, Lock, Mail, User, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  title?: string;
  subtitle?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Connectez-vous pour finaliser votre commande",
  subtitle = "Vos informations de personnalisation sont sauvegardées en toute sécurité.",
}: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Email ou mot de passe incorrect.");
        }
        onSuccess(data.user);
        onClose();
      } else {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Impossible de créer le compte.");
        }
        onSuccess(data.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121214] border border-white/10 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] text-[11px] font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Espace Client Sécurisé</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
            <p className="text-xs text-neutral-400 mt-1">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setError(null);
            }}
            className={`flex-1 py-3 text-center transition ${
              tab === "login"
                ? "text-[#FF6B00] border-b-2 border-[#FF6B00] bg-white/[0.02]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Connexion
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setError(null);
            }}
            className={`flex-1 py-3 text-center transition ${
              tab === "register"
                ? "text-[#FF6B00] border-b-2 border-[#FF6B00] bg-white/[0.02]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Créer un compte
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs">
              {error}
            </div>
          )}

          {tab === "register" && (
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Nom complet
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Richard Odjrado"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#FF6B00] text-white placeholder:text-neutral-500 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="votre-email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#FF6B00] text-white placeholder:text-neutral-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#FF6B00] text-white placeholder:text-neutral-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/20 disabled:opacity-50 active:scale-98"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>{tab === "login" ? "Se connecter & Continuer" : "Créer mon compte & Continuer"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-neutral-500 pt-1">
            En continuant, vous acceptez les conditions de service Asuka Card.
          </p>
        </form>
      </div>
    </div>
  );
}
