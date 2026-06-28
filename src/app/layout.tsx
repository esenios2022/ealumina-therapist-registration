import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terra Araras",
  description: "Meditaciones y sanación energética guiadas, en video y audio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-terra-sand text-terra-dark antialiased">{children}</body>
    </html>
  );
}
