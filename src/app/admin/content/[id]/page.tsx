import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ContentItem } from "@/lib/types";
import ContentForm from "@/components/admin/ContentForm";

export default async function EditContentPage({
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
    .single<ContentItem>();

  if (!item) notFound();

  return (
    <div>
      <h1 className="text-xl font-bold text-terra-dark">Editar contenido</h1>
      <div className="mt-4">
        <ContentForm initial={item} />
      </div>
    </div>
  );
}
