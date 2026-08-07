-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

alter table public.submissions
  add column if not exists review jsonb;

comment on column public.submissions.review is
  'User review after reading report: { rating: 1-5, comment: string, submitted_at: ISO timestamp }';
