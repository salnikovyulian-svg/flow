alter table work_flows
add column if not exists focus text not null default '';
