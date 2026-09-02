alter table deep_work_sessions
add column if not exists insight text;

alter table deep_work_sessions
add column if not exists friction text;

alter table deep_work_sessions
add column if not exists distraction text;

alter table deep_work_sessions
add column if not exists next_step text;
