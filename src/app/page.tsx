import Link from "next/link";

const BENEFICIOS = [
  {
    title: "Para terapeutas",
    text: "Limpiá tu energía entre sesiones y liberá las cargas que absorbés del consultorio.",
  },
  {
    title: "Para pacientes",
    text: "Acceso guiado por tu terapeuta para sostenerte entre encuentros, cuando lo necesites.",
  },
  {
    title: "Para la comunidad",
    text: "Meditaciones y comandos cuánticos para quienes vienen trabajando en frecuencia con nosotros.",
  },
];

export default function LandingPage() {
  return (
    <main>
      <header className="flex items-center justify-between px-6 py-6 md:px-16">
        <span className="text-xl font-semibold tracking-wide">Terra Araras</span>
        <nav className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium hover:underline">
            Iniciar sesión
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-terra px-5 py-2 text-sm font-medium text-terra-sand hover:bg-terra-dark"
          >
            Crear cuenta
          </Link>
        </nav>
      </header>

      <section className="px-6 py-16 text-center md:px-16">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Meditaciones y limpiezas energéticas guiadas, cuando las necesites
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-terra-dark/80">
          Videos y audios grabados con comandos cuánticos para trabajar la parte emocional,
          además de procesos más profundos para situaciones puntuales. Antes de empezar, un
          agente te va a preguntar qué te trae hoy hasta acá.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-block rounded-full bg-terra-gold px-8 py-3 text-base font-semibold text-terra-dark hover:opacity-90"
        >
          Empezar ahora
        </Link>
      </section>

      <section className="grid gap-6 px-6 py-12 md:grid-cols-3 md:px-16">
        {BENEFICIOS.map((b) => (
          <div key={b.title} className="rounded-2xl bg-white/60 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm text-terra-dark/80">{b.text}</p>
          </div>
        ))}
      </section>

      <section className="px-6 py-16 md:px-16" id="precios">
        <div className="mx-auto max-w-md rounded-3xl bg-terra-dark p-8 text-terra-sand text-center">
          <h2 className="text-2xl font-bold">Suscripción mensual</h2>
          <p className="mt-2 text-terra-sand/80">
            Acceso completo a la biblioteca de meditaciones y audios, sin límite de
            reproducciones.
          </p>
          <p className="mt-6 text-4xl font-bold">$ ---/mes</p>
          <Link
            href="/signup"
            className="mt-6 inline-block w-full rounded-full bg-terra-gold px-6 py-3 font-semibold text-terra-dark hover:opacity-90"
          >
            Suscribirme
          </Link>
          <p className="mt-3 text-xs text-terra-sand/60">
            Pagá con tarjeta (Mercado Pago) o Stripe internacional.
          </p>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-sm text-terra-dark/60 md:px-16">
        © {new Date().getFullYear()} Terra Araras
      </footer>
    </main>
  );
}
