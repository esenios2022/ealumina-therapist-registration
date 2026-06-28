import { createClient } from "@/lib/supabase/server";
import type { ContentItem, Profile } from "@/lib/types";
import SubscribeButtons from "@/components/SubscribeButtons";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single<Profile>();

  const isActive = profile?.role === "admin" || profile?.subscription_status === "active";

  if (!isActive) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-white/70 p-8 text-center">
        <h1 className="text-xl font-bold text-terra-dark">Tu suscripción no está activa</h1>
        <p className="mt-2 text-terra-dark/70">
          Activá tu suscripción mensual para acceder a la biblioteca de meditaciones y audios.
        </p>
        <SubscribeButtons />
      </div>
    );
  }

  const { data: items } = await supabase
    .from("content_items")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .returns<ContentItem[]>();

  const videos = items?.filter((i) => i.type === "video") ?? [];
  const audios = items?.filter((i) => i.type === "audio") ?? [];

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-bold text-terra-dark">Videos</h2>
        <ContentGrid items={videos} />
      </section>
      <section>
        <h2 className="text-xl font-bold text-terra-dark">Audios</h2>
        <ContentGrid items={audios} />
      </section>
    </div>
  );
}

function ContentGrid({ items }: { items: ContentItem[] }) {
  if (items.length === 0) {
    return <p className="mt-3 text-sm text-terra-dark/60">Todavía no hay contenido acá.</p>;
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/dashboard/content/${item.id}`}
          className="rounded-2xl bg-white/70 p-5 shadow-sm hover:shadow-md"
        >
          <h3 className="font-semibold text-terra-dark">{item.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-wide text-terra-gold">
            {item.category}
          </p>
          {item.description && (
            <p className="mt-2 text-sm text-terra-dark/70 line-clamp-2">{item.description}</p>
          )}
          {item.duration_minutes && (
            <p className="mt-3 text-xs text-terra-dark/50">{item.duration_minutes} min</p>
          )}
        </Link>
      ))}
    </div>
  );
}
