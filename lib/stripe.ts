import Stripe from "stripe";

let stripeClient: Stripe | null = null;

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey, {
      apiVersion: "2026-08-26.dahlia",
      typescript: true,
    });
  }

  return stripeClient;
}

/**
 * Hosted Checkout Session for the Blueprint.
 * Prefer STRIPE_PRICE_ID. Otherwise uses STRIPE_UNIT_AMOUNT_CENTS (default 1500 = $15).
 */
export async function createBlueprintStripeCheckout({
  submissionId,
  email,
  name,
  successUrl,
  cancelUrl,
}: {
  submissionId: string;
  email: string;
  name: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripe = getStripe();
  const priceId = process.env.STRIPE_PRICE_ID?.trim();
  const currency = (process.env.STRIPE_CURRENCY || "usd").toLowerCase();
  const unitAmount = Number(process.env.STRIPE_UNIT_AMOUNT_CENTS || "1500");

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = priceId
    ? [{ price: priceId, quantity: 1 }]
    : [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: Number.isFinite(unitAmount) ? unitAmount : 1500,
            product_data: {
              name: "Your Personalized Creator Blueprint",
              description: "One-time Blueprint + download",
            },
          },
        },
      ];

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    client_reference_id: submissionId,
    metadata: {
      submission_id: submissionId,
      product: "blueprint",
      customer_name: name,
    },
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  return session.url;
}

export function getStripeWebhookSecret() {
  return requireEnv("STRIPE_WEBHOOK_SECRET");
}
