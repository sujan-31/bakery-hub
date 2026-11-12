-- ========================================================
-- 🎂 Bakery Hub: Supabase Cloud Database Table Schema
-- Run this in your Supabase SQL Editor (Takes 5 seconds!)
-- ========================================================

-- 1. Create the orders table
create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  delivery_type text not null default 'pickup',
  delivery_address text,
  pickup_date text not null,
  pickup_time text not null,
  special_instructions text,
  items jsonb not null,
  subtotal numeric not null default 0,
  tax numeric not null default 0,
  total_amount numeric not null default 0,
  status text not null default 'pending',
  is_paid boolean default false,
  payment_method text default 'card_online',
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security (RLS)
alter table public.orders enable row level security;

-- 3. Allow public ordering & status updates for your bakery app
create policy "Allow all read" on public.orders for select using (true);
create policy "Allow all insert" on public.orders for insert with check (true);
create policy "Allow all update" on public.orders for update using (true);

-- 4. Turn on Real-time so your Admin Dashboard live-refreshes when a phone orders!
alter publication supabase_realtime add table public.orders;
