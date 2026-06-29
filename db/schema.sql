-- Terra Araras: esquema para Neon (Postgres)
-- Sin RLS: la autorización se controla en el código de la app (ver src/lib/auth).

create extension if not exists pgcrypto;

create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  subscription_status text not null default 'inactive'
    check (subscription_status in ('inactive', 'active', 'past_due', 'canceled')),
  created_at timestamptz not null default now()
);

create table content_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  title_pt text,
  description_pt text,
  type text not null check (type in ('video', 'audio')),
  category text not null default 'meditacion',
  duration_minutes int,
  vimeo_id text,
  audio_path text,
  thumbnail_url text,
  is_published boolean not null default false,
  sort_order int not null default 0,
  created_by uuid references users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table intake_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  messages jsonb not null default '[]'::jsonb,
  summary text,
  status text not null default 'active' check (status in ('active', 'completed')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  provider text not null check (provider in ('stripe', 'mercadopago')),
  provider_customer_id text,
  provider_subscription_id text,
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users (id) on delete cascade,
  content text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index subscriptions_provider_subscription_id_key
  on subscriptions (provider_subscription_id);
create index subscriptions_user_id_idx on subscriptions (user_id);
create index content_items_published_idx on content_items (is_published, sort_order);
create index intake_sessions_user_id_idx on intake_sessions (user_id);
create index testimonials_approved_idx on testimonials (is_approved, created_at);
create index testimonials_user_id_idx on testimonials (user_id);
