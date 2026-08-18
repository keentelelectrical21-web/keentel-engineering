-- Keentel Engineering initial Supabase schema.
-- Run this migration in a fresh Supabase project's SQL editor or with the Supabase CLI.
-- Do not store any credential values in this file.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null default '',
  phone text not null,
  email text not null,
  service text not null default '',
  message text not null default '',
  source text not null default 'contact-page',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'homepage',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_settings (
  id integer primary key check (id = 1),
  claude_api_key text,
  proactive_message text,
  proactive_delay_seconds integer not null default 30,
  updated_at timestamptz not null default now()
);

insert into public.chat_settings (id) values (1) on conflict (id) do nothing;

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  current_page text,
  mode text not null default 'ai' check (mode in ('ai', 'human')),
  claimed_by text,
  claimed_at timestamptz,
  human_requested_at timestamptz,
  message_count integer not null default 0,
  intent_score text not null default 'low',
  topics text[] not null default '{}',
  project_size text,
  project_location text,
  summary text,
  created_at timestamptz not null default now(),
  last_activity_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null check (role in ('visitor', 'ai', 'agent')),
  agent_name text,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_leads (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null unique references public.chat_sessions(id) on delete cascade,
  name text,
  email text,
  phone text,
  project_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists newsletter_subscribers_status_idx on public.newsletter_subscribers (status);
create index if not exists chat_sessions_last_activity_idx on public.chat_sessions (last_activity_at desc);
create index if not exists chat_messages_session_created_idx on public.chat_messages (session_id, created_at);

-- Contact and newsletter writes are server-side only. Keep RLS enabled and do not
-- create anon policies for these tables.
alter table public.leads enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.chat_settings enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.chat_leads enable row level security;

-- The present chat widget reads chat rows directly with the anon key. Do not add
-- broad anon policies here: move those reads to authenticated API routes or add a
-- visitor-session authorization design before enabling the public chat widget.

alter publication supabase_realtime add table public.chat_sessions;
alter publication supabase_realtime add table public.chat_messages;
