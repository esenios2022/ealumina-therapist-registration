"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DeleteContentButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("¿Borrar este contenido? No se puede deshacer.")) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from("content_items").delete().eq("id", id);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-700 hover:underline disabled:opacity-60"
    >
      Borrar
    </button>
  );
}
