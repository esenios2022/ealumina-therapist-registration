"use client";

import { useEffect, useState } from "react";

export default function AudioPlayer({ contentId }: { contentId: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/media/audio?contentId=${contentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el audio.");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setUrl(data.url);
      })
      .catch(() => {
        if (!cancelled) setError("No se pudo cargar el audio. Probá de nuevo.");
      });

    return () => {
      cancelled = true;
    };
  }, [contentId]);

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!url) return <p className="text-sm text-terra-dark/60">Cargando audio...</p>;

  return (
    <audio
      key={url}
      controls
      controlsList="nodownload"
      onContextMenu={(e) => e.preventDefault()}
      className="w-full"
      src={url}
    />
  );
}
