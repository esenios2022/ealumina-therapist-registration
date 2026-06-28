-- Terra Araras: esquema inicial
-- Perfiles, contenido (videos/audios), sesiones de intake con IA y suscripciones.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles: un registro por usuario de auth.users
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  subscription_status text not null default 'inactive'
    check (subscription_status in ('inactive', 'active', 'past_due', 'canceled')),
  created_at timestamptz not null default now()
);

-- crea el profile automáticamente cuando alguien se registra en auth.users
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- content_items: videos y audios de la biblioteca
-- ---------------------------------------------------------------------------
create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text not null check (type in ('video', 'audio')),
  category text not null default 'meditacion',
  duration_minutes int,
  vimeo_id text,
  audio_path text,
  thumbnail_url text,
  is_published boolean not null default false,
  sort_order int not null default 0,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- intake_sessions: conversación del agente de IA al ingresar
-- ---------------------------------------------------------------------------
create table public.intake_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  messages jsonb not null default '[]'::jsonb,
  summary text,
  status text not null default 'active' check (status in ('active', 'completed')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

-- ---------------------------------------------------------------------------
-- subscriptions: estado de pago en Stripe / Mercado Pago
-- ---------------------------------------------------------------------------
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  provider text not null check (provider in ('stripe', 'mercadopago')),
  provider_customer_id text,
  provider_subscription_id text,
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index subscriptions_provider_subscription_id_key
  on public.subscriptions (provider_subscription_id);
create index subscriptions_user_id_idx on public.subscriptions (user_id);
create index content_items_published_idx on public.content_items (is_published, sort_order);
create index intake_sessions_user_id_idx on public.intake_sessions (user_id);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.content_items enable row level security;
alter table public.intake_sessions enable row level security;
alter table public.subscriptions enable row level security;

create function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- profiles
create policy "profiles: leer el propio o admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles: actualizar el propio o admin"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

-- content_items: lectura para suscriptores activos o admin; escritura solo admin
create policy "content_items: leer si suscripcion activa o admin"
  on public.content_items for select
  using (
    public.is_admin()
    or (
      is_published = true
      and exists (
        select 1 from public.profiles
        where id = auth.uid() and subscription_status = 'active'
      )
    )
  );

create policy "content_items: solo admin escribe"
  on public.content_items for all
  using (public.is_admin())
  with check (public.is_admin());

-- intake_sessions
create policy "intake_sessions: el propio usuario o admin"
  on public.intake_sessions for select
  using (auth.uid() = user_id or public.is_admin());

create policy "intake_sessions: crear las propias"
  on public.intake_sessions for insert
  with check (auth.uid() = user_id);

create policy "intake_sessions: actualizar las propias"
  on public.intake_sessions for update
  using (auth.uid() = user_id or public.is_admin());

-- subscriptions: solo lectura para el propio usuario / admin; las escrituras las hacen los webhooks con service role
create policy "subscriptions: leer las propias o admin"
  on public.subscriptions for select
  using (auth.uid() = user_id or public.is_admin());

-- ---------------------------------------------------------------------------
-- storage: bucket privado "audio" para las sesiones de audio
-- el acceso real se hace con URLs firmadas generadas por el servidor (service role)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('audio', 'audio', false)
on conflict (id) do nothing;

create policy "audio: solo admin sube/edita/borra"
  on storage.objects for all
  using (bucket_id = 'audio' and public.is_admin())
  with check (bucket_id = 'audio' and public.is_admin());
