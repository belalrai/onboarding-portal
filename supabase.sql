create table candidates(id uuid primary key default gen_random_uuid(),name text,email text,position text,home text,stage text,token text unique,created_at timestamptz default now());
create table responses(candidate_id uuid references candidates on delete cascade,form_key text,data jsonb default '{}',status text default 'draft',note text,updated_at timestamptz default now(),primary key(candidate_id,form_key));
create table referees(candidate_id uuid references candidates on delete cascade,n int,name text,email text,token text unique,status text default 'sent',data jsonb,primary key(candidate_id,n));
alter table candidates enable row level security;alter table responses enable row level security;alter table referees enable row level security;
insert into storage.buckets (id,name,public,file_size_limit) values ('candidate-files','candidate-files',false,5242880) on conflict (id) do nothing;
