"use client";

import { useState, useRef, useEffect } from "react";
import type { IntakeMessage } from "@/lib/types";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export default function IntakePage() {
  const [locale, setLocale] = useState<Locale>("es");
  const [ready, setReady] = useState(false);
  const [messages, setMessages] = useState<IntakeMessage[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const match = document.cookie.match(/locale=(es|pt)/);
    const detected: Locale = match ? (match[1] as Locale) : "es";
    setLocale(detected);
    setMessages([{ role: "assistant", content: getDictionary(detected).intake.greeting }]);
    setReady(true);
  }, []);

  const t = getDictionary(locale);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: IntakeMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: userMessage.content, locale }),
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

  if (!ready) return null;

  return (
    <div className="mx-auto flex h-[70vh] max-w-2xl flex-col rounded-2xl bg-white/70 shadow-sm">
      <div className="flex-1 space-y-3 overflow-y-auto p-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
              m.role === "user"
                ? "ml-auto bg-terra text-terra-sand"
                : "bg-terra-sand text-terra-dark"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <p className="text-xs text-terra-dark/50">{t.intake.typing}</p>}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 border-t border-terra/10 p-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.intake.placeholder}
          className="flex-1 rounded-full border border-terra/30 px-4 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-terra px-5 py-2 text-sm font-semibold text-terra-sand disabled:opacity-60"
        >
          {t.intake.send}
        </button>
      </form>
    </div>
  );
}
