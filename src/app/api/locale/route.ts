import { NextResponse } from "next/server";
import { LOCALE_COOKIE_NAME } from "@/lib/i18n/config";

export async function POST(request: Request) {
  const { locale } = await request.json();
  if (locale !== "es" && locale !== "pt") {
    return NextResponse.json({ error: "Locale inválido" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(LOCALE_COOKIE_NAME, locale, { maxAge: 60 * 60 * 24 * 365 });
  return response;
}
