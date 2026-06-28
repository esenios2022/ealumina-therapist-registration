"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-terra-sand px-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-terra-dark">Revisá tu email</h1>
          <p className="mt-2 text-terra-dark/80">
            Te enviamos un link de confirmación para activar tu cuenta.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-terra-sand px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white/70 p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-terra-dark">Crear cuenta</h1>
        <p className="mt-1 text-sm text-terra-dark/70">Terra Araras</p>

        <label className="mt-6 block text-sm font-medium text-terra-dark">Nombre</label>
        <input
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
        />

        <label className="mt-4 block text-sm font-medium text-terra-dark">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
        />

        <label className="mt-4 block text-sm font-medium text-terra-dark">Contraseña</label>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-terra/30 px-3 py-2"
        />

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-terra px-4 py-2 font-semibold text-terra-sand hover:bg-terra-dark disabled:opacity-60"
        >
          {loading ? "Creando..." : "Crear cuenta"}
        </button>

        <p className="mt-4 text-center text-sm text-terra-dark/70">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="font-medium underline">
            Iniciá sesión
          </Link>
        </p>
      </form>
    </main>
  );
}
