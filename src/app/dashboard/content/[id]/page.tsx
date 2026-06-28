import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ContentItem } from "@/lib/types";
import VideoPlayer from "@/components/VideoPlayer";
import AudioPlayer from "@/components/AudioPlayer";

export default async function ContentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: item } = await supabase
    .from("content_items")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single<ContentItem>();

  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-terra-dark">{item.title}</h1>
      <p className="mt-1 text-sm uppercase tracking-wide text-terra-gold">{item.category}</p>
      {item.description && <p className="mt-3 text-terra-dark/80">{item.description}</p>}

      <div className="mt-6">
        {item.type === "video" && item.vimeo_id ? (
          <VideoPlayer vimeoId={item.vimeo_id} />
        ) : item.type === "audio" ? (
          <AudioPlayer contentId={item.id} />
        ) : (
          <p className="text-sm text-red-700">Este contenido todavía no tiene archivo cargado.</p>
        )}
      </div>
    </div>
  );
}
