import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-terra-sand">
      <header className="flex items-center justify-between border-b border-terra/10 px-6 py-4 md:px-12">
        <Link href="/admin" className="text-lg font-semibold text-terra-dark">
          Terra Araras · Admin
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Ver como usuario
          </Link>
          <form action="/api/auth/signout" method="post">
            <button className="rounded-full bg-terra px-4 py-1.5 text-terra-sand hover:bg-terra-dark">
              Salir
            </button>
          </form>
        </nav>
      </header>
      <main className="px-6 py-8 md:px-12">{children}</main>
    </div>
  );
}
