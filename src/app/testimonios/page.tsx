import Link from "next/link";
import { sql } from "@/lib/db";
import type { Testimonial } from "@/lib/types";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export default async function TestimoniosPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);

  const testimonios = (await sql`
    select t.id, t.content, t.created_at, u.full_name
    from testimonials t
    join users u on u.id = t.user_id
    where t.is_approved = true
    order by t.created_at desc
  `) as Testimonial[];

  return (
    <main className="px-6 py-16 md:px-16">
      <Link href="/" className="text-sm font-medium hover:underline">
        {t.testimoniosPage.back}
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-terra-dark">{t.testimoniosPage.title}</h1>
      <p className="mt-2 max-w-2xl text-terra-dark/70">{t.testimoniosPage.subtitle}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonios.map((item) => (
          <blockquote
            key={item.id}
            className="rounded-2xl bg-white/60 p-6 text-terra-dark shadow-sm"
          >
            <p className="text-terra-dark/80">"{item.content}"</p>
            <footer className="mt-4 text-sm font-semibold">
              — {item.full_name ?? t.testimoniosPage.fallbackName}
            </footer>
          </blockquote>
        ))}
        {testimonios.length === 0 && (
          <p className="text-sm text-terra-dark/60">{t.testimoniosPage.empty}</p>
        )}
      </div>
    </main>
  );
}
