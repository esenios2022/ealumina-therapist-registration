"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

function LoginForm({ t }: { t: Dictionary }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.error || t.auth.loginError);
      return;
    }

    router.push(searchParams.get("redirectTo") || "/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-terra-sand px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white/70 p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-terra-dark">{t.auth.loginTitle}</h1>
        <p className="mt-1 text-sm text-terra-dark/70">{t.auth.brand}</p>

        <label className="mt-6 block text-sm font-medium text-terra-dark">
          {t.auth.emailLabel}
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
        />

        <label className="mt-4 block text-sm font-medium text-terra-dark">
          {t.auth.passwordLabel}
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
        />

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-terra px-4 py-2 font-semibold text-terra-sand hover:bg-terra-deep disabled:opacity-60"
        >
          {loading ? t.auth.loginLoading : t.auth.loginButton}
        </button>

        <p className="mt-4 text-center text-sm text-terra-dark/70">
          {t.auth.noAccount}{" "}
          <Link href="/signup" className="font-medium underline">
            {t.auth.createOne}
          </Link>
        </p>
      </form>
    </main>
  );
}

export default function LoginPage() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const match = document.cookie.match(/locale=(es|pt)/);
    if (match) setLocale(match[1] as Locale);
  }, []);

  const t = getDictionary(locale);

  return (
    <Suspense>
      <LoginForm t={t} />
    </Suspense>
  );
}
