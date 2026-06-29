"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TestimonialActions({
  id,
  isApproved,
}: {
  id: string;
  isApproved: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function setApproved(value: boolean) {
    setLoading(true);
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_approved: value }),
    });
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("¿Borrar este testimonio?")) return;
    setLoading(true);
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex gap-3 text-sm">
      {!isApproved && (
        <button
          onClick={() => setApproved(true)}
          disabled={loading}
          className="text-green-700 hover:underline disabled:opacity-60"
        >
          Aprobar
        </button>
      )}
      {isApproved && (
        <button
          onClick={() => setApproved(false)}
          disabled={loading}
          className="text-terra-dark hover:underline disabled:opacity-60"
        >
          Ocultar
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-700 hover:underline disabled:opacity-60"
      >
        Borrar
      </button>
    </div>
  );
}
