import { createBlueprintCheckout } from "@/lib/lemonsqueezy";
import { getAppBaseUrl } from "@/lib/submissions";

/** Stripe is off. Flip this when India export is approved. */
const USE_STRIPE = false;

export function paymentProvider() {
  return USE_STRIPE ? "stripe" : "lemon";
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

  const checkoutUrl = await createBlueprintCheckout({
    submissionId,
    email,
    name,
    redirectUrl,
  });

  return { checkoutUrl, provider: "lemon" as const };
}
