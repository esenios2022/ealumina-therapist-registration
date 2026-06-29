"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContentItem, ContentType } from "@/lib/types";

export default function ContentForm({ initial }: { initial?: ContentItem }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [type, setType] = useState<ContentType>(initial?.type ?? "video");
  const [category, setCategory] = useState(initial?.category ?? "meditacion");
  const [durationMinutes, setDurationMinutes] = useState(
    initial?.duration_minutes?.toString() ?? ""
  );
  const [vimeoId, setVimeoId] = useState(initial?.vimeo_id ?? "");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPublished, setIsPublished] = useState(initial?.is_published ?? false);
  const [sortOrder, setSortOrder] = useState(initial?.sort_order?.toString() ?? "0");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    let audioPath = initial?.audio_path ?? null;

    try {
      if (type === "audio" && audioFile) {
        const uploadData = new FormData();
        uploadData.set("file", audioFile);
        const uploadRes = await fetch("/api/admin/upload-audio", {
          method: "POST",
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadJson.error || "No se pudo subir el audio.");
        audioPath = uploadJson.path;
      }

      const payload = {
        title,
        description: description || null,
        type,
        category,
        duration_minutes: durationMinutes ? Number(durationMinutes) : null,
        vimeo_id: type === "video" ? vimeoId || null : null,
        audio_path: type === "audio" ? audioPath : null,
        is_published: isPublished,
        sort_order: Number(sortOrder) || 0,
      };

      const res = await fetch(initial ? `/api/admin/content/${initial.id}` : "/api/admin/content", {
        method: initial ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar.");

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-2xl bg-white/70 p-6">
      <div>
        <label className="block text-sm font-medium text-terra-dark">Título</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-terra-dark">Descripción</label>
        <textarea
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-terra-dark">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ContentType)}
            className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
          >
            <option value="video">Video</option>
            <option value="audio">Audio</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-terra-dark">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
          >
            <option value="meditacion">Meditación / comando cuántico</option>
            <option value="limpieza_energetica">Limpieza energética</option>
            <option value="tratamiento_profundo">Tratamiento profundo</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-terra-dark">Duración (min)</label>
          <input
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-terra-dark">Orden</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
          />
        </div>
      </div>

      {type === "video" ? (
        <div>
          <label className="block text-sm font-medium text-terra-dark">ID de Vimeo</label>
          <input
            value={vimeoId ?? ""}
            onChange={(e) => setVimeoId(e.target.value)}
            placeholder="Pegá el link de Vimeo o solo el ID (ej: 824804226)"
            className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-terra-dark">Archivo de audio</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
            className="mt-1 w-full text-sm"
          />
          {initial?.audio_path && !audioFile && (
            <p className="mt-1 text-xs text-terra-dark/50">Ya hay un archivo cargado.</p>
          )}
        </div>
      )}

      <label className="flex items-center gap-2 text-sm font-medium text-terra-dark">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        Publicado (visible para suscriptores)
      </label>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-terra px-6 py-2 font-semibold text-terra-sand disabled:opacity-60"
      >
        {saving ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
