-- Run in Supabase SQL Editor if this is not applied automatically.
-- Unguessable public report URLs. Internal `id` stays for Lemon Squeezy / generation.

alter table public.submissions
  add column if not exists public_id uuid;

update public.submissions
set public_id = gen_random_uuid()
where public_id is null;

alter table public.submissions
  alter column public_id set default gen_random_uuid();

alter table public.submissions
  alter column public_id set not null;

create unique index if not exists submissions_public_id_uidx
  on public.submissions (public_id);

comment on column public.submissions.public_id is
  'Public access token used in /report/[id] and related URLs. Not the sequential primary key.';
