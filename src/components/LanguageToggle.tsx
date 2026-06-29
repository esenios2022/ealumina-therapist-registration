"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";

export default function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function switchTo(next: Locale) {
    if (next === locale || loading) return;
    setLoading(true);
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-terra/30 p-0.5 text-xs font-semibold">
      <button
        onClick={() => switchTo("es")}
        className={`rounded-full px-2 py-1 ${locale === "es" ? "bg-terra text-terra-sand" : "text-terra-dark/60"}`}
      >
        ES
      </button>
      <button
        onClick={() => switchTo("pt")}
        className={`rounded-full px-2 py-1 ${locale === "pt" ? "bg-terra text-terra-sand" : "text-terra-dark/60"}`}
      >
        PT
      </button>
    </div>
  );
}
