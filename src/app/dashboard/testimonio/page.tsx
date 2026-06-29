"use client";

import { useEffect, useState } from "react";

export default function TestimonioPage() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "saved" | "error">("idle");

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
      <h1 className="text-xl font-bold text-terra-dark">Dejá tu testimonio</h1>
      <p className="mt-2 text-sm text-terra-dark/70">
        Contá tu experiencia con Terra Araras. Lo revisamos antes de publicarlo en la página
        pública de testimonios.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 rounded-2xl bg-white/70 p-6">
        <textarea
          required
          minLength={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          placeholder="Escribí tu testimonio..."
          className="w-full rounded-lg border border-terra/30 px-3 py-2"
        />

        {status === "saved" && (
          <p className="mt-3 text-sm text-green-700">
            ¡Gracias! Tu testimonio quedó pendiente de aprobación.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-700">No se pudo guardar, probá de nuevo.</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-4 rounded-full bg-terra px-6 py-2 font-semibold text-terra-sand disabled:opacity-60"
        >
          {status === "loading" ? "Enviando..." : "Enviar testimonio"}
        </button>
      </form>
    </div>
  );
}
