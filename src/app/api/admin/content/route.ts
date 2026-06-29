import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { extractVimeoId } from "@/lib/vimeo";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const body = await request.json();
  const {
    title,
    description,
    type,
    category,
    duration_minutes,
    vimeo_id,
    audio_path,
    is_published,
    sort_order,
  } = body;

  const cleanVimeoId = vimeo_id ? extractVimeoId(vimeo_id) : null;

  const [item] = await sql`
    insert into content_items
      (title, description, type, category, duration_minutes, vimeo_id, audio_path, is_published, sort_order, created_by)
    values
      (${title}, ${description}, ${type}, ${category}, ${duration_minutes}, ${cleanVimeoId}, ${audio_path}, ${is_published}, ${sort_order}, ${admin.userId})
    returning id
  `;

  return NextResponse.json({ id: item.id });
}
