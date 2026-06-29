import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { getLocale } from "@/lib/i18n/get-locale";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Terra Araras",
  description: "Meditaciones y sanación energética guiadas, en video y audio.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="bg-terra-sand font-sans text-terra-dark antialiased">{children}</body>
    </html>
  );
}
