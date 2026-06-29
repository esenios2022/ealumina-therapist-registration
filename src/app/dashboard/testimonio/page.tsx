"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default function TestimonioPage() {
  const [locale, setLocale] = useState<Locale>("es");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "saved" | "error">("idle");

  useEffect(() => {
    const match = document.cookie.match(/locale=(es|pt)/);
    if (match) setLocale(match[1] as Locale);
  }, []);

  const t = getDictionary(locale);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    setStatus(res.ok ? "saved" : "error");
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-xl font-bold text-terra-dark">{t.testimonialForm.title}</h1>
      <p className="mt-2 text-sm text-terra-dark/70">{t.testimonialForm.subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-6 rounded-2xl bg-white/70 p-6">
        <textarea
          required
          minLength={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          placeholder={t.testimonialForm.placeholder}
          className="w-full rounded-lg border border-terra/30 px-3 py-2"
        />

        {status === "saved" && (
          <p className="mt-3 text-sm text-green-700">{t.testimonialForm.saved}</p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-700">{t.testimonialForm.error}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-4 rounded-full bg-terra px-6 py-2 font-semibold text-terra-sand disabled:opacity-60"
        >
          {status === "loading" ? t.testimonialForm.sending : t.testimonialForm.submit}
        </button>
      </form>
    </div>
  );
}
