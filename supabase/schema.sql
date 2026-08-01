-- Run this once in the Supabase SQL editor for your project.
-- See README "Database setup" for the full setup walkthrough.

create table if not exists bookings (
  id uuid primary key,
  booking_reference text unique not null,
  status text not null,
  service_type text not null,
  city text,
  customer_email text,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null
);

create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_created_at_idx on bookings (created_at desc);

-- Row Level Security: only the service role (used server-side by the app's
-- API routes) may read/write. No anonymous or authenticated-user access.
alter table bookings enable row level security;
