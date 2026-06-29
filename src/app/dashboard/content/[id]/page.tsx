import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import type { ContentItem } from "@/lib/types";
import VideoPlayer from "@/components/VideoPlayer";
import AudioPlayer from "@/components/AudioPlayer";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedContent } from "@/lib/i18n/content";

export const dynamic = "force-dynamic";

export default async function ContentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const locale = await getLocale();
  const t = getDictionary(locale);

  const [user] = await sql`
    select role, subscription_status from users where id = ${session.userId}
  `;
  const hasAccess = user?.role === "admin" || user?.subscription_status === "active";
  if (!hasAccess) redirect("/dashboard");

  const [item] = (await sql`
    select * from content_items where id = ${id} and is_published = true
  `) as ContentItem[];

  if (!item) notFound();

  const { title, description } = localizedContent(item, locale);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-terra-dark">{title}</h1>
      <p className="mt-1 text-sm uppercase tracking-wide text-terra-gold">{item.category}</p>
      {description && <p className="mt-3 text-terra-dark/80">{description}</p>}

      <div className="mt-6">
        {item.type === "video" && item.vimeo_id ? (
          <VideoPlayer vimeoId={item.vimeo_id} />
        ) : item.type === "audio" ? (
          <AudioPlayer contentId={item.id} locale={locale} />
        ) : (
          <p className="text-sm text-red-700">{t.contentDetail.noFile}</p>
        )}
      </div>
    </div>
  );
}
