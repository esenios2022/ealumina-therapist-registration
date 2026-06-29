import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { getAnthropic, INTAKE_MODEL, getIntakeSystemPrompt } from "@/lib/anthropic";
import type { IntakeMessage } from "@/lib/types";

export async function POST(request: NextRequest) {
  const { sessionId, message, locale } = await request.json();

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Falta el mensaje" }, { status: 400 });
  }

  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  let currentSessionId = sessionId as string | undefined;
  let history: IntakeMessage[] = [];

  if (currentSessionId) {
    const [existing] = await sql`
      select messages from intake_sessions
      where id = ${currentSessionId} and user_id = ${session.userId}
    `;
    history = (existing?.messages as IntakeMessage[]) ?? [];
  } else {
    const [created] = await sql`
      insert into intake_sessions (user_id, messages) values (${session.userId}, '[]'::jsonb)
      returning id
    `;
    currentSessionId = created.id;
  }

  const updatedHistory: IntakeMessage[] = [...history, { role: "user", content: message }];

  const completion = await getAnthropic().messages.create({
    model: INTAKE_MODEL,
    max_tokens: 400,
    system: getIntakeSystemPrompt(locale === "pt" ? "pt" : "es"),
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

  await sql`
    update intake_sessions set messages = ${JSON.stringify(finalHistory)}::jsonb
    where id = ${currentSessionId} and user_id = ${session.userId}
  `;

  return NextResponse.json({ sessionId: currentSessionId, reply: assistantText });
}
