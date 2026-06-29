import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE_NAME, LOCALE_HEADER_NAME, type Locale } from "@/lib/i18n/config";

export async function getLocale(): Promise<Locale> {
  const headerStore = await headers();
  const headerLocale = headerStore.get(LOCALE_HEADER_NAME);
  if (headerLocale === "es" || headerLocale === "pt") return headerLocale;

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return cookieLocale === "pt" ? "pt" : "es";
}
