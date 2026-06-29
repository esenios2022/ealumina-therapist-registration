import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/jwt";
import { LOCALE_COOKIE_NAME, type Locale } from "@/lib/i18n/config";

const PROTECTED_PREFIXES = ["/dashboard", "/admin"];
const ADMIN_PREFIX = "/admin";

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale === "es" || cookieLocale === "pt") return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  return acceptLanguage.toLowerCase().startsWith("pt") ? "pt" : "es";
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hadLocaleCookie = Boolean(request.cookies.get(LOCALE_COOKIE_NAME)?.value);
  const locale = detectLocale(request);

  const isProtected = PROTECTED_PREFIXES.some((p) => path.startsWith(p));
  if (!isProtected) {
    const response = NextResponse.next();
    if (!hadLocaleCookie) {
      response.cookies.set(LOCALE_COOKIE_NAME, locale, { maxAge: 60 * 60 * 24 * 365 });
    }
    return response;
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", path);
    return NextResponse.redirect(url);
  }

  if (path.startsWith(ADMIN_PREFIX) && session.role !== "admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  if (!hadLocaleCookie) {
    response.cookies.set(LOCALE_COOKIE_NAME, locale, { maxAge: 60 * 60 * 24 * 365 });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
