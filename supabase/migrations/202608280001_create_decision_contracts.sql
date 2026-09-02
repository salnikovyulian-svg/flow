create extension if not exists pgcrypto;

create table decision_contracts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  decision text not null,
  reason text not null,
  success text not null,
  commitment_days integer not null,
  review_date date not null,
  actions jsonb not null,
  failure_reason text not null,
  status text not null default 'active',
  created_at timestamptz default now()
);
