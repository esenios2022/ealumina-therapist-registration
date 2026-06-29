import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { extractVimeoId } from "@/lib/vimeo";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  const {
    title,
    description,
    title_pt,
    description_pt,
    type,
    category,
    duration_minutes,
    vimeo_id,
    audio_path,
    is_published,
    sort_order,
  } = body;

  const cleanVimeoId = vimeo_id ? extractVimeoId(vimeo_id) : null;

  await sql`
    update content_items set
      title = ${title},
      description = ${description},
      title_pt = ${title_pt},
      description_pt = ${description_pt},
      type = ${type},
      category = ${category},
      duration_minutes = ${duration_minutes},
      vimeo_id = ${cleanVimeoId},
      audio_path = ${audio_path},
      is_published = ${is_published},
      sort_order = ${sort_order},
      updated_at = now()
    where id = ${id}
  `;

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const { id } = await params;
  await sql`delete from content_items where id = ${id}`;

  return NextResponse.json({ ok: true });
}
