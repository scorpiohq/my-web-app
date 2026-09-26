-- Run in Supabase SQL Editor.
-- Email 3 + leave timestamp for the unpaid Blueprint sequence.

alter table public.submissions
  add column if not exists abandoned_left_at timestamptz;

alter table public.submissions
  add column if not exists checkout_started_at timestamptz;

alter table public.submissions
  add column if not exists abandoned_email_3_sent_at timestamptz;

alter table public.submissions
  add column if not exists abandoned_email_3_opened_at timestamptz;

alter table public.submissions
  add column if not exists abandoned_email_3_resend_id text;

comment on column public.submissions.abandoned_left_at is
  'When they left /building without paying. Email 1 sends ~15s later.';

comment on column public.submissions.checkout_started_at is
  'When they clicked UNLOCK / started Lemon. Paid users leave the reminder sequence; unpaid get email 1 after the fallback window.';

comment on column public.submissions.abandoned_email_3_sent_at is
  'When last-call email 3 was sent (7 days after email 2 open).';

comment on column public.submissions.abandoned_email_3_opened_at is
  'When email 3 was opened (Resend open tracking).';

comment on column public.submissions.abandoned_email_3_resend_id is
  'Resend email id for reminder email 3.';
