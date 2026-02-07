-- Profiles table: extends auth.users with role, points, location
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'donor' check (role in ('donor', 'volunteer', 'admin')),
  location text,
  points integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Everyone can read all profiles
create policy "profiles_select_all" on public.profiles for select using (true);
-- Users can insert their own profile
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
-- Users can update their own profile
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- Donations table
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  item_type text not null check (item_type in ('food', 'clothes', 'essentials')),
  quantity integer not null default 1,
  location text not null,
  description text,
  status text not null default 'pending' check (status in ('pending', 'assigned', 'in_progress', 'completed')),
  donor_id uuid not null references auth.users(id) on delete cascade,
  volunteer_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.donations enable row level security;

-- Everyone authenticated can read all donations
create policy "donations_select_all" on public.donations for select using (auth.uid() is not null);
-- Donors can insert their own donations
create policy "donations_insert_own" on public.donations for insert with check (auth.uid() = donor_id);
-- Donors can update their own donations, volunteers can update assigned ones, admins can update any
create policy "donations_update" on public.donations for update using (
  auth.uid() = donor_id
  or auth.uid() = volunteer_id
  or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Auto-create profile on user signup via trigger
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, location)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'role', 'donor'),
    coalesce(new.raw_user_meta_data ->> 'location', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
