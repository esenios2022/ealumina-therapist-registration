import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

const CARACTERISTICAS = [
  {
    title: "Meditaciones de 5 a 20 minutos",
    text: "Sesiones cortas para el día a día y procesos más largos cuando necesites algo más profundo.",
  },
  {
    title: "Comandos cuánticos",
    text: "Trabajo específico para la parte emocional: ansiedad, bloqueos, sostén en momentos difíciles.",
  },
  {
    title: "Limpieza energética",
    text: "Pensado especialmente para terapeutas: soltar lo que se absorbe en el consultorio entre sesión y sesión.",
  },
  {
    title: "Video o audio, como prefieras",
    text: "Mismo contenido en dos formatos — mirá el video o simplemente escuchá el audio.",
  },
  {
    title: "Un agente te recibe primero",
    text: "Antes de entrar a la biblioteca, una breve conversación para entender qué te trae hoy y guiarte a lo que necesitás en ese momento.",
  },
  {
    title: "Contenido protegido",
    text: "Los videos y audios no se pueden descargar ni compartir el link — es para tu uso personal dentro de la plataforma.",
  },
];

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
        <nav className="flex items-center gap-4">
          <Link href="/testimonios" className="px-2 text-sm font-medium hover:underline">
            Testimonios
          </Link>
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

      <section className="px-6 py-12 md:px-16">
        <h2 className="text-center text-2xl font-bold text-terra-dark">¿Qué vas a encontrar?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {CARACTERISTICAS.map((c) => (
            <div key={c.title} className="rounded-2xl bg-white/60 p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-terra-dark/80">{c.text}</p>
            </div>
          ))}
        </div>
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
        <h2 className="text-center text-2xl font-bold text-terra-dark">Suscripción mensual</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-terra-dark/70">
          Acceso completo a la biblioteca de meditaciones y audios, sin límite de reproducciones.
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-terra-dark p-8 text-center text-terra-sand">
            <h3 className="text-lg font-semibold">Uruguay</h3>
            <p className="mt-4 text-4xl font-bold">$555</p>
            <p className="text-terra-sand/70">pesos uruguayos / mes</p>
          </div>
          <div className="rounded-3xl bg-terra-dark p-8 text-center text-terra-sand">
            <h3 className="text-lg font-semibold">Brasil</h3>
            <p className="mt-4 text-4xl font-bold">R$44</p>
            <p className="text-terra-sand/70">reales / mes</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/signup"
            className="inline-block rounded-full bg-terra-gold px-8 py-3 font-semibold text-terra-dark hover:opacity-90"
          >
            Crear cuenta
          </Link>
          <WhatsAppButton />
        </div>
      </section>

      <footer className="flex flex-col items-center gap-2 px-6 py-8 text-center text-sm text-terra-dark/60 md:px-16">
        <Link href="/testimonios" className="hover:underline">
          Ver testimonios
        </Link>
        <span>© {new Date().getFullYear()} Terra Araras</span>
      </footer>
    </main>
  );
}
