-- users table (automatically managed by Supabase Auth)
-- trades table
create table trades (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users,
  symbol text,
  action text,
  price numeric,
  confidence numeric,
  created_at timestamptz default now()
);
alter table trades enable row level security;

create policy "User can read own trades"
  on trades for select
  using (auth.uid() = user_id);

create policy "User can insert trades"
  on trades for insert
  with check (auth.uid() = user_id);
