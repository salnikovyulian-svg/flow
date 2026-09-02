create table if not exists work_flows (
  id uuid primary key default gen_random_uuid(),

  user_id text not null,

  location text not null,
  custom_location text,

  start_time text not null,
  duration_minutes integer not null,

  ritual jsonb not null,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
