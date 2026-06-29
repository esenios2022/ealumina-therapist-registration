import { getSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  const locale = await getLocale();
  const t = getDictionary(locale);

  const [user] = await sql`
    select role, subscription_status from users where id = ${session!.userId}
  `;

  const isActive = user?.role === "admin" || user?.subscription_status === "active";

  if (!isActive) {
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-white/70 p-8 text-center">
        <h1 className="text-xl font-bold text-terra-dark">{t.dashboard.inactiveTitle}</h1>
        <p className="mt-2 text-terra-dark/70">{t.dashboard.inactiveText}</p>
        <p className="mt-1 text-sm text-terra-dark/60">{t.dashboard.priceLine}</p>
        <div className="mt-6">
          <WhatsAppButton locale={locale} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <h1 className="text-2xl font-bold text-terra-dark">{t.dashboard.welcomeTitle}</h1>
      <p className="mt-3 text-terra-dark/70">{t.dashboard.welcomeText}</p>
    </div>
  );
}
