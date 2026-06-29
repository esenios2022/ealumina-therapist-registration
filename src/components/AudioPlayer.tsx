"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default function AudioPlayer({
  contentId,
  locale,
}: {
  contentId: string;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/media/audio?contentId=${contentId}`)
      .then((res) => {
        if (!res.ok) throw new Error(t.audioPlayer.loadError);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setUrl(data.url);
      })
      .catch(() => {
        if (!cancelled) setError(t.audioPlayer.loadError);
      });

    return () => {
      cancelled = true;
    };
  }, [contentId, t.audioPlayer.loadError]);

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!url) return <p className="text-sm text-terra-dark/60">{t.audioPlayer.loading}</p>;

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
