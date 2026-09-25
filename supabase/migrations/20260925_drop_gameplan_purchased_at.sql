-- Gameplan is no longer a product. Drop the unused column.

alter table public.submissions
  drop column if exists gameplan_purchased_at;
