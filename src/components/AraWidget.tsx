"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IntakeMessage } from "@/lib/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import AraFlyer from "@/components/AraFlyer";

function randomSpot() {
  return {
    top: 8 + Math.random() * 68, // vh, keeps clear of footer
    left: 2 + Math.random() * 24, // vw — solo el lado izquierdo, lejos de los dialogos
  };
}

export default function AraWidget({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(() => pathname === "/dashboard");
  const [view, setView] = useState<"menu" | "chat">("menu");
  const [messages, setMessages] = useState<IntakeMessage[]>([
    { role: "assistant", content: t.intake.greeting },
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(() => randomSpot());

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => setPos(randomSpot()), 7000);
    return () => clearInterval(interval);
  }, [isOpen]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setView("chat");

    const userMessage: IntakeMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text, locale }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error");

      setSessionId(data.sessionId);
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t.intake.error }]);
    } finally {
      setLoading(false);
    }
  }

  function sendForm(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 flex max-h-[70vh] w-[22rem] flex-col overflow-hidden rounded-3xl bg-terra-dark shadow-2xl sm:right-6">
          <div className="flex items-center justify-between px-5 pt-5">
            <div>
              <h2 className="font-serif text-xl font-semibold text-terra-sand">
                {t.intake.title}
              </h2>
              {view === "menu" && (
                <p className="mt-1 text-sm text-terra-sand/70">{t.intake.subtitle}</p>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar"
              className="text-terra-sand/60 hover:text-terra-sand"
            >
              ✕
            </button>
          </div>

          {view === "menu" ? (
            <div className="flex flex-1 flex-col items-center overflow-y-auto px-5 pb-5">
              <AraFlyer className="mt-2 h-28 w-48 rounded-3xl border-2 border-terra/40" />

              <div className="mt-5 w-full space-y-2">
                {t.intake.quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => send(reply)}
                    className="w-full rounded-xl bg-white/95 px-4 py-3 text-left text-sm font-medium text-terra-dark hover:bg-white"
                  >
                    {reply}
                  </button>
                ))}
                <Link
                  href="/dashboard/biblioteca"
                  className="block w-full rounded-xl bg-white/10 px-4 py-3 text-center text-sm font-medium text-terra-sand hover:bg-white/20"
                >
                  {t.intake.goToLibrary}
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 space-y-3 overflow-y-auto px-5 py-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      m.role === "user"
                        ? "ml-auto bg-terra text-terra-sand"
                        : "bg-white/95 text-terra-dark"
                    }`}
                  >
                    {m.content}
                  </div>
                ))}
                {loading && <p className="text-xs text-terra-sand/50">{t.intake.typing}</p>}
                <div ref={bottomRef} />
              </div>
              <div className="px-5 pb-2">
                <Link
                  href="/dashboard/biblioteca"
                  className="text-xs font-medium text-terra-sand/70 hover:underline"
                >
                  {t.intake.goToLibrary}
                </Link>
              </div>
              <form onSubmit={sendForm} className="flex gap-2 p-4 pt-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.intake.placeholder}
                  className="flex-1 rounded-full border border-terra-sand/20 bg-white/10 px-4 py-2 text-sm text-terra-sand placeholder:text-terra-sand/40"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-terra px-4 py-2 text-sm font-semibold text-terra-sand disabled:opacity-60"
                >
                  {t.intake.send}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Ara"
        style={
          isOpen
            ? undefined
            : {
                top: `${pos.top}vh`,
                left: `${pos.left}vw`,
                transition: "top 3.5s ease-in-out, left 3.5s ease-in-out",
              }
        }
        className={`fixed z-50 drop-shadow-xl ${isOpen ? "bottom-5 left-5" : ""}`}
      >
        <AraFlyer className="h-16 w-28 animate-ara-float rounded-full" />
      </button>
    </>
  );
}
