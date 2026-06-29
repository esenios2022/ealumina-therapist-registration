import Link from "next/link";
import { sql } from "@/lib/db";
import type { Testimonial } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function TestimoniosPage() {
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
        ← Volver
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-terra-dark">Testimonios</h1>
      <p className="mt-2 max-w-2xl text-terra-dark/70">
        Lo que cuentan quienes ya usan Terra Araras.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonios.map((t) => (
          <blockquote key={t.id} className="rounded-2xl bg-white/60 p-6 text-terra-dark shadow-sm">
            <p className="text-terra-dark/80">"{t.content}"</p>
            <footer className="mt-4 text-sm font-semibold">— {t.full_name ?? "Usuario"}</footer>
          </blockquote>
        ))}
        {testimonios.length === 0 && (
          <p className="text-sm text-terra-dark/60">Todavía no hay testimonios publicados.</p>
        )}
      </div>
    </main>
  );
}
