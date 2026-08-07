-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

alter table public.submissions
  add column if not exists review jsonb,
  add column if not exists report_json jsonb,
  add column if not exists report_status text default 'pending';

comment on column public.submissions.review is
  'User review: { rating: 1-5, comment: string, submitted_at: ISO timestamp }';

comment on column public.submissions.report_json is
  'AI-generated report payload (Stage 2 output + metadata)';

comment on column public.submissions.report_status is
  'pending | generating | ready | failed';
