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
