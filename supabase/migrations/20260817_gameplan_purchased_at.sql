-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

alter table public.submissions
  add column if not exists gameplan_purchased_at timestamptz;

comment on column public.submissions.gameplan_purchased_at is
  'Set when the creator buys Gameplan. Null means they have not purchased it yet.';
