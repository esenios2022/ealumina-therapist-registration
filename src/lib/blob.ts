import { put, get } from "@vercel/blob";

const EXTENSION_CONTENT_TYPES: Record<string, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  m4a: "audio/mp4",
  ogg: "audio/ogg",
  aac: "audio/aac",
};

export function resolveAudioContentType(filename: string, declaredType?: string | null): string {
  if (declaredType && declaredType !== "application/octet-stream") return declaredType;
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_CONTENT_TYPES[ext] ?? "audio/mpeg";
}

export async function uploadAudioFile(pathname: string, body: Buffer, contentType: string) {
  await put(pathname, body, { access: "private", contentType, addRandomSuffix: false });
}

export async function getAudioStream(pathname: string) {
  return get(pathname, { access: "private" });
}
