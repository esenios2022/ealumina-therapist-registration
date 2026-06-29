import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import LanguageToggle from "@/components/LanguageToggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const locale = await getLocale();
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen bg-terra-sand">
      <header className="flex items-center justify-between border-b border-terra/10 px-6 py-4 md:px-12">
        <Link href="/dashboard" className="text-lg font-semibold text-terra-dark">
          Terra Araras
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">
            {t.nav.library}
          </Link>
          <Link href="/dashboard/intake" className="hover:underline">
            {t.nav.talkToAgent}
          </Link>
          <Link href="/dashboard/testimonio" className="hover:underline">
            {t.nav.leaveTestimonial}
          </Link>
          {session.role === "admin" && (
            <Link href="/admin" className="hover:underline">
              {t.nav.admin}
            </Link>
          )}
          <LanguageToggle locale={locale} />
          <form action="/api/auth/signout" method="post">
            <button className="rounded-full bg-terra px-4 py-1.5 text-terra-sand hover:bg-terra-deep">
              {t.nav.logout}
            </button>
          </form>
        </nav>
      </header>
      <main className="px-6 py-8 md:px-12">{children}</main>
    </div>
  );
}
