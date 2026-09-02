create extension if not exists pgcrypto;

create table if not exists weekly_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  week_start date,
  week_end date,
  wins text not null default '',
  failures text not null default '',
  causes text not null default '',
  self_deception text not null default '',
  keep_doing text not null default '',
  stop_doing text not null default '',
  start_doing text not null default '',
  next_improvement text not null default '',
  main_focus text not null default '',
  first_action text not null default '',
  created_at timestamptz not null default now()
);

alter table weekly_reviews
  add column if not exists week_start date,
  add column if not exists week_end date,
  add column if not exists wins text not null default '',
  add column if not exists failures text not null default '',
  add column if not exists causes text not null default '',
  add column if not exists self_deception text not null default '',
  add column if not exists keep_doing text not null default '',
  add column if not exists stop_doing text not null default '',
  add column if not exists start_doing text not null default '',
  add column if not exists next_improvement text not null default '',
  add column if not exists main_focus text not null default '',
  add column if not exists first_action text not null default '',
  add column if not exists created_at timestamptz not null default now();

create unique index if not exists
  weekly_reviews_user_week_start_unique
  on weekly_reviews (user_id, week_start)
  where week_start is not null;

create index if not exists
  weekly_reviews_user_created_at_idx
  on weekly_reviews (user_id, created_at desc);
