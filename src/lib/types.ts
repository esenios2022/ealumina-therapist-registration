export type ContentType = "video" | "audio";

export interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  title_pt: string | null;
  description_pt: string | null;
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

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: "user" | "admin";
  subscription_status: "inactive" | "active" | "past_due" | "canceled";
  created_at: string;
}

export interface IntakeMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Testimonial {
  id: string;
  user_id: string;
  content: string;
  is_approved: boolean;
  created_at: string;
  full_name?: string | null;
}
