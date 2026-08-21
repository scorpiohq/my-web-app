-- Run in Supabase SQL Editor.
-- Abandoned-checkout emails: sent + opened timestamps (and Resend ids for matching).

alter table public.submissions
  add column if not exists abandoned_email_1_sent_at timestamptz;

alter table public.submissions
  add column if not exists abandoned_email_1_opened_at timestamptz;

alter table public.submissions
  add column if not exists abandoned_email_1_resend_id text;

alter table public.submissions
  add column if not exists abandoned_email_2_sent_at timestamptz;

alter table public.submissions
  add column if not exists abandoned_email_2_opened_at timestamptz;

alter table public.submissions
  add column if not exists abandoned_email_2_resend_id text;

comment on column public.submissions.abandoned_email_1_sent_at is
  'When unpaid checkout reminder email 1 was sent (~10 min after pending).';

comment on column public.submissions.abandoned_email_1_opened_at is
  'When email 1 was opened (Resend open tracking).';

comment on column public.submissions.abandoned_email_1_resend_id is
  'Resend email id for reminder email 1.';

comment on column public.submissions.abandoned_email_2_sent_at is
  'When unpaid checkout reminder email 2 was sent (~20 hours after email 1 open).';

comment on column public.submissions.abandoned_email_2_opened_at is
  'When email 2 was opened (Resend open tracking).';

comment on column public.submissions.abandoned_email_2_resend_id is
  'Resend email id for reminder email 2.';
