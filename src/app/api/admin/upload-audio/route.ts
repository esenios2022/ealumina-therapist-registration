import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { uploadAudioFile, resolveAudioContentType } from "@/lib/blob";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado" }, { status: 403 });

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Falta el archivo" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await uploadAudioFile(key, buffer, resolveAudioContentType(file.name, file.type));

  return NextResponse.json({ path: key });
}
