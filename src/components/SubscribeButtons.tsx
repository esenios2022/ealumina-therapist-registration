"use client";

import { useState } from "react";

export default function SubscribeButtons() {
  const [loading, setLoading] = useState<"stripe" | "mercadopago" | null>(null);

  async function startCheckout(provider: "stripe" | "mercadopago") {
    setLoading(provider);
    const res = await fetch(`/api/checkout/${provider}`, { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(null);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      <button
        onClick={() => startCheckout("mercadopago")}
        disabled={loading !== null}
        className="rounded-full bg-terra-gold px-6 py-2 font-semibold text-terra-dark disabled:opacity-60"
      >
        {loading === "mercadopago" ? "Redirigiendo..." : "Pagar con Mercado Pago"}
      </button>
      <button
        onClick={() => startCheckout("stripe")}
        disabled={loading !== null}
        className="rounded-full bg-terra px-6 py-2 font-semibold text-terra-sand disabled:opacity-60"
      >
        {loading === "stripe" ? "Redirigiendo..." : "Pagar con Stripe"}
      </button>
    </div>
  );
}
