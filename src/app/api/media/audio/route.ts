import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { getAudioStream, resolveAudioContentType } from "@/lib/blob";

export async function GET(request: NextRequest) {
  const contentId = request.nextUrl.searchParams.get("contentId");
  if (!contentId) {
    return NextResponse.json({ error: "Falta contentId" }, { status: 400 });
  }

  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const [user] = await sql`
    select role, subscription_status from users where id = ${session.userId}
  `;

  const hasAccess = user?.role === "admin" || user?.subscription_status === "active";
  if (!hasAccess) {
    return NextResponse.json({ error: "Suscripción inactiva" }, { status: 403 });
  }

  const [content] = await sql`
    select audio_path, type from content_items where id = ${contentId}
  `;

  if (!content || content.type !== "audio" || !content.audio_path) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const result = await getAudioStream(content.audio_path);
  if (!result || result.statusCode !== 200) {
    return NextResponse.json({ error: "No se pudo cargar el audio" }, { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": resolveAudioContentType(content.audio_path, result.blob.contentType),
      "Cache-Control": "private, no-store",
      "Content-Disposition": "inline",
    },
  });
}
