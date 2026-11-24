"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Loader2, Info } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const isFromCreate = redirectParam?.includes("/create");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Email ou mot de passe incorrect.");
      }

      if (redirectParam) {
        router.push(redirectParam);
      } else if (data.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || "Impossible de se connecter.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Brand Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-asuka-white.png"
            alt="Asuka Card"
            className="h-9 w-auto mx-auto object-contain"
          />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-white mt-4">
          Connexion
        </h1>
        {isFromCreate && (
          <div className="mt-3 p-3.5 rounded-2xl bg-[#FF6B00] text-white text-xs font-medium flex items-center justify-center gap-2.5 text-center leading-relaxed">
            <Info className="w-4 h-4 shrink-0 text-white" />
            <span>Votre carte est sauvegardée. Connectez-vous pour finaliser votre commande.</span>
          </div>
        )}
      </div>

      {/* Form Container */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Adresse e-mail
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-[#FF6B00] text-sm text-white placeholder:text-neutral-600 outline-none transition"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-[#FF6B00] text-sm text-white placeholder:text-neutral-600 outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E55F00] text-white text-xs font-bold transition flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>Se connecter</span>
            )}
          </button>
        </form>

        {/* Simple Link */}
        <div className="text-center pt-5 mt-4 border-t border-neutral-800 text-xs text-neutral-400">
          Pas encore de compte ?{" "}
          <Link
            href={redirectParam ? `/register?redirect=${encodeURIComponent(redirectParam)}` : "/register"}
            className="font-semibold text-[#FF6B00] hover:underline ml-1"
          >
            Inscrivez-vous
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-black text-white px-4 py-12 select-none">
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF6B00]" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
