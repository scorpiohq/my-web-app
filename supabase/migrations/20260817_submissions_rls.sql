-- Run in Supabase SQL Editor (Dashboard → SQL → New query)
-- Locks the submissions table so the public/anon key cannot read or write rows.
-- The Next.js app uses SUPABASE_SECRET_KEY (service role), which bypasses RLS.

alter table public.submissions enable row level security;

-- Intentionally no policies for anon or authenticated.
-- That means: browser/public key → no access.
-- Server secret key → full access (unchanged).
