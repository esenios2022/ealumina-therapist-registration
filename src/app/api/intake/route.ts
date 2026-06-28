import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAnthropic, INTAKE_MODEL, INTAKE_SYSTEM_PROMPT } from "@/lib/anthropic";
import type { IntakeMessage } from "@/lib/types";

export async function POST(request: NextRequest) {
  const { sessionId, message } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Falta el mensaje" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  let currentSessionId = sessionId as string | undefined;
  let history: IntakeMessage[] = [];

  if (currentSessionId) {
    const { data: existing } = await supabase
      .from("intake_sessions")
      .select("messages")
      .eq("id", currentSessionId)
      .eq("user_id", user.id)
      .single();
    history = (existing?.messages as IntakeMessage[]) ?? [];
  } else {
    const { data: created, error } = await supabase
      .from("intake_sessions")
      .insert({ user_id: user.id, messages: [] })
      .select("id")
      .single();
    if (error || !created) {
      return NextResponse.json({ error: "No se pudo crear la sesión" }, { status: 500 });
    }
    currentSessionId = created.id;
  }

  const updatedHistory: IntakeMessage[] = [...history, { role: "user", content: message }];

  const completion = await getAnthropic().messages.create({
    model: INTAKE_MODEL,
    max_tokens: 400,
    system: INTAKE_SYSTEM_PROMPT,
    messages: updatedHistory.map((m) => ({ role: m.role, content: m.content })),
  });

  const assistantText = completion.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  const finalHistory: IntakeMessage[] = [
    ...updatedHistory,
    { role: "assistant", content: assistantText },
  ];

  await supabase
    .from("intake_sessions")
    .update({ messages: finalHistory })
    .eq("id", currentSessionId)
    .eq("user_id", user.id);

  return NextResponse.json({ sessionId: currentSessionId, reply: assistantText });
}
