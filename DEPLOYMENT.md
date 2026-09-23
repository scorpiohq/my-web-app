# Deployment Guide — Your Blueprint

This guide covers deploying to Vercel (recommended), connecting Lemon Squeezy, Supabase, and switching to your custom domain when ready.

## 1. Supabase schema

Run in **Supabase → SQL Editor**:

```sql
alter table public.submissions
  add column if not exists review jsonb,
  add column if not exists report_json jsonb,
  add column if not exists report_status text default 'pending';
```

Migration files live in [`supabase/migrations/`](supabase/migrations/).

## 2. Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo.
3. Deploy once (env vars can be added after).
4. Copy your deployment URL, e.g. `https://your-blueprint.vercel.app`.

## 3. Environment variables (Vercel → Project → Settings → Environment Variables)

Copy from [`.env.example`](.env.example):

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_APP_URL` | `https://your-blueprint.vercel.app` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/publishable key |
| `SUPABASE_SECRET_KEY` | Supabase service role key |
| `LEMONSQUEEZY_API_KEY` | Lemon Squeezy → Settings → API |
| `LEMONSQUEEZY_STORE_ID` | Your store ID |
| `LEMONSQUEEZY_VARIANT_ID` | Your $24 product variant ID |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | From webhook setup (step 4) |
| `LEMONSQUEEZY_TEST_MODE` | `true` while testing |
| `PAYMENT_PROVIDER` | `stripe` or `lemon` (if unset: Stripe when `STRIPE_SECRET_KEY` exists, else Lemon) |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys (`sk_test_…` / `sk_live_…`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_…`) |
| `STRIPE_PRICE_ID` | Optional. Stripe Price ID for Blueprint. If unset, uses amount below |
| `STRIPE_UNIT_AMOUNT_CENTS` | Optional. Default `1500` ($15) when no `STRIPE_PRICE_ID` |
| `STRIPE_CURRENCY` | Optional. Default `usd` |
| `OPENAI_API_KEY` | OpenAI API key for report generation |
| `OPENAI_MODEL` | `gpt-4o-mini` (or `gpt-4o`) |
| `INTERNAL_API_SECRET` | Random long string (protects `/api/generate-report`) |

Redeploy after saving env vars.

## 4. Stripe setup (recommended)

1. Create a Stripe account → **Developers → API keys** → copy **Secret key** → `STRIPE_SECRET_KEY`.
2. Optional: Products → create “Creator Blueprint” → copy **Price ID** → `STRIPE_PRICE_ID`.  
   If you skip this, checkout uses `STRIPE_UNIT_AMOUNT_CENTS` (default **1500** = $15).
3. Set `PAYMENT_PROVIDER=stripe` (or just set `STRIPE_SECRET_KEY` and leave provider unset).
4. **Webhooks** → Add endpoint:
   - **URL:** `https://your-blueprint.vercel.app/api/webhooks/stripe`
   - **Events:** `checkout.session.completed`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`
5. Local webhook testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Use the `whsec_…` from that command in `.env.local` as `STRIPE_WEBHOOK_SECRET`.

### Test payment flow (Stripe)

1. Open your form → complete → you should land on Stripe Checkout.
2. Pay with test card `4242 4242 4242 4242`.
3. In Supabase `submissions`: `payment_status=paid`, report generation starts.
4. User lands on progress / thank-you via `success_url`.

## 5. Lemon Squeezy setup (legacy / fallback)

1. Create store + one-time product ($24).
2. Copy **Store ID** and **Variant ID**.
3. Settings → **API** → create API key.
4. Settings → **Webhooks** → add webhook:
   - **URL:** `https://your-blueprint.vercel.app/api/webhooks/lemonsqueezy`
   - **Event:** `order_created`
   - Copy **Signing secret** → `LEMONSQUEEZY_WEBHOOK_SECRET`
5. Enable **Test mode** in Lemon Squeezy while developing.
6. Set `PAYMENT_PROVIDER=lemon` to force Lemon instead of Stripe.

### Test payment flow (Lemon)

1. Open `https://your-blueprint.vercel.app/form`
2. Complete form → pay with Lemon Squeezy test card
3. In Supabase `submissions` table, confirm:
   - `payment_status` = `paid`
   - `report_status` moves `pending` → `generating` → `ready`
4. Thank-you page → progress page → **READ YOUR BLUEPRINT**

If webhook fails, check Vercel function logs and that the webhook URL matches exactly.

## 6. Local development notes

- UI work: `npm run dev` on localhost is fine.
- Local Stripe webhooks: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` (or test on Vercel).
- PDF export locally needs Google Chrome or `PUPPETEER_EXECUTABLE_PATH`.
- Add to `.env.local` (never commit):

```bash
INTERNAL_API_SECRET=your-local-secret
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://127.0.0.1:3000
PAYMENT_PROVIDER=stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...   # from `stripe listen` locally
# STRIPE_PRICE_ID=price_...       # optional; else $15 via STRIPE_UNIT_AMOUNT_CENTS
```

## 7. End-to-end flow (production)

```text
Form → create-checkout → Supabase (pending)
     → Stripe Checkout → user pays
     → /api/webhooks/stripe marks paid + triggers /api/generate-report
     → OpenAI Stage 1 + Stage 2 → report_json saved (ready)
     → Progress page polls /api/report-status
     → /report/[id] shows real template + review + PDF
```

## 8. Switch to your custom domain (when ready to go public)

1. Vercel → Project → **Domains** → add your domain.
2. Update DNS at your registrar (Vercel shows the records).
3. Change `NEXT_PUBLIC_APP_URL` to `https://yourdomain.com`.
4. Stripe → update webhook endpoint URL to the new domain.
5. Redeploy.
6. Run one full test with Stripe test mode, then switch to live keys (`sk_live_…` + live webhook secret).

This is a config change only — no code changes required.

## 9. Go-live checklist

- [ ] Supabase columns: `review`, `report_json`, `report_status`
- [ ] All Vercel env vars set (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, …)
- [ ] Stripe webhook returns 200 on `checkout.session.completed`
- [ ] Report generation completes (`report_status = ready`)
- [ ] Progress page unlocks when ready
- [ ] `/report/[id]` shows personalized report
- [ ] Sign-in by email works
- [ ] PDF download works on Vercel
- [ ] Custom domain attached (optional until public launch)
- [ ] Live Stripe keys + live webhook for real sales
