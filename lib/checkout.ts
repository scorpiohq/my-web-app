import { createBlueprintCheckout } from "@/lib/lemonsqueezy";
import { createBlueprintStripeCheckout } from "@/lib/stripe";
import { getAppBaseUrl } from "@/lib/submissions";

export function paymentProvider() {
  const raw = process.env.PAYMENT_PROVIDER?.trim().toLowerCase();
  if (raw === "stripe" || raw === "lemon" || raw === "lemonsqueezy") {
    return raw === "lemonsqueezy" ? "lemon" : raw;
  }
  if (process.env.STRIPE_SECRET_KEY?.trim()) {
    return "stripe";
  }
  return "lemon";
}

export async function createCheckoutUrl({
  request,
  submissionId,
  publicId,
  email,
  name,
  isGoutiJourney,
}: {
  request: Request;
  submissionId: string;
  publicId: string;
  email: string;
  name: string;
  isGoutiJourney: boolean;
}) {
  const appUrl = getAppBaseUrl(request);
  const redirectUrl = isGoutiJourney
    ? `${appUrl}/progress?submission_id=${publicId}`
    : `${appUrl}/form/thank-you?submission_id=${publicId}`;

  try {
    new URL(redirectUrl);
  } catch {
    throw new Error(
      "App URL is misconfigured. Set NEXT_PUBLIC_APP_URL to your Vercel URL on Vercel.",
    );
  }

  const provider = paymentProvider();

  if (provider === "stripe") {
    const cancelUrl = isGoutiJourney
      ? `${appUrl}/gouti/report-animation?n=${encodeURIComponent(name)}&sid=${encodeURIComponent(publicId)}`
      : `${appUrl}/form`;
    const checkoutUrl = await createBlueprintStripeCheckout({
      submissionId,
      email,
      name,
      successUrl: redirectUrl.includes("?")
        ? `${redirectUrl}&session_id={CHECKOUT_SESSION_ID}`
        : `${redirectUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl,
    });
    return { checkoutUrl, provider };
  }

  const checkoutUrl = await createBlueprintCheckout({
    submissionId,
    email,
    name,
    redirectUrl,
    embed: isGoutiJourney,
  });
  return { checkoutUrl, provider };
}
