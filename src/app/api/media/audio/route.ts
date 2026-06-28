import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const contentId = request.nextUrl.searchParams.get("contentId");
  if (!contentId) {
    return NextResponse.json({ error: "Falta contentId" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, subscription_status")
    .eq("id", user.id)
    .single();

  const hasAccess = profile?.role === "admin" || profile?.subscription_status === "active";
  if (!hasAccess) {
    return NextResponse.json({ error: "Suscripción inactiva" }, { status: 403 });
  }

  const { data: content } = await supabase
    .from("content_items")
    .select("audio_path, type, is_published")
    .eq("id", contentId)
    .single();

  if (!content || content.type !== "audio" || !content.audio_path) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  const service = createServiceRoleClient();
  const { data: signed, error } = await service.storage
    .from("audio")
    .createSignedUrl(content.audio_path, 60);

  if (error || !signed) {
    return NextResponse.json({ error: "No se pudo generar el link" }, { status: 500 });
  }

  return NextResponse.json({ url: signed.signedUrl });
}
