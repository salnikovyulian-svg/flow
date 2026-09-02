create table if not exists deep_work_sessions (
  id uuid primary key default gen_random_uuid(),

  user_id text not null,

  decision_id uuid,

  started_at timestamptz not null,
  finished_at timestamptz,

  duration_minutes integer not null default 0,

  created_at timestamptz default now()
);
