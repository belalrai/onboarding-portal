-- Only if you already ran the first supabase.sql
alter table candidates add column if not exists position text;alter table candidates add column if not exists home text;alter table candidates add column if not exists stage text;
alter table responses add column if not exists updated_at timestamptz default now();
