export type ContentType = "video" | "audio";

export interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  type: ContentType;
  category: string;
  duration_minutes: number | null;
  vimeo_id: string | null;
  audio_path: string | null;
  thumbnail_url: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: "user" | "admin";
  subscription_status: "inactive" | "active" | "past_due" | "canceled";
}

export interface IntakeMessage {
  role: "user" | "assistant";
  content: string;
}
