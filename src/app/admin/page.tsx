import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { ContentItem, Profile } from "@/lib/types";
import DeleteContentButton from "@/components/admin/DeleteContentButton";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("content_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<ContentItem[]>();

  const { data: subscribers } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Profile[]>();

  const activeCount = subscribers?.filter((s) => s.subscription_status === "active").length ?? 0;

  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-terra-dark">Contenido</h1>
          <Link
            href="/admin/content/new"
            className="rounded-full bg-terra-gold px-5 py-2 text-sm font-semibold text-terra-dark"
          >
            + Nuevo contenido
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl bg-white/70">
          <table className="w-full text-left text-sm">
            <thead className="bg-terra/10 text-terra-dark">
              <tr>
                <th className="px-4 py-2">Título</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Categoría</th>
                <th className="px-4 py-2">Publicado</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => (
                <tr key={item.id} className="border-t border-terra/10">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">{item.is_published ? "Sí" : "No"}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/content/${item.id}`}
                        className="text-sm text-terra-dark hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteContentButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {(!items || items.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-terra-dark/60">
                    Todavía no agregaste contenido.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-terra-dark">
          Suscriptores ({activeCount} activos de {subscribers?.length ?? 0})
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl bg-white/70">
          <table className="w-full text-left text-sm">
            <thead className="bg-terra/10 text-terra-dark">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Estado</th>
                <th className="px-4 py-2">Rol</th>
              </tr>
            </thead>
            <tbody>
              {subscribers?.map((s) => (
                <tr key={s.id} className="border-t border-terra/10">
                  <td className="px-4 py-2">{s.full_name ?? "—"}</td>
                  <td className="px-4 py-2">{s.email}</td>
                  <td className="px-4 py-2">{s.subscription_status}</td>
                  <td className="px-4 py-2">{s.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
