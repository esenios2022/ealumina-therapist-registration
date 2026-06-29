import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { content } = await request.json();
  if (!content || typeof content !== "string" || !content.trim()) {
    return NextResponse.json({ error: "Falta el contenido del testimonio" }, { status: 400 });
  }

  const [existing] = await sql`
    select id from testimonials where user_id = ${session.userId}
  `;

  if (existing) {
    await sql`
      update testimonials set content = ${content.trim()}, is_approved = false
      where id = ${existing.id}
    `;
  } else {
    await sql`
      insert into testimonials (user_id, content) values (${session.userId}, ${content.trim()})
    `;
  }

  return NextResponse.json({ ok: true });
}
