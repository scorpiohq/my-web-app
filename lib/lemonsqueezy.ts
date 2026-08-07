import { createCheckout, lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

let configured = false;

export function configureLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) {
    throw new Error("LEMONSQUEEZY_API_KEY is not set");
  }

  if (!configured) {
    lemonSqueezySetup({ apiKey });
    configured = true;
  }
}

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

export async function createBlueprintCheckout({
  submissionId,
  email,
  name,
  redirectUrl,
}: {
  submissionId: string;
  email: string;
  name: string;
  redirectUrl: string;
}) {
  configureLemonSqueezy();

  const storeId = requireEnv("LEMONSQUEEZY_STORE_ID");
  const variantId = requireEnv("LEMONSQUEEZY_VARIANT_ID");
  const testMode = process.env.LEMONSQUEEZY_TEST_MODE === "true";

  const checkout = await createCheckout(storeId, variantId, {
    testMode,
    checkoutOptions: {
      embed: false,
      media: false,
      logo: true,
    },
    checkoutData: {
      email,
      name,
      custom: {
        submission_id: submissionId,
      },
    },
    productOptions: {
      redirectUrl,
      receiptButtonText: "View your progress",
      receiptThankYouNote: "Thanks for your purchase. Your Blueprint is on the way.",
      confirmationTitle: "Payment complete",
      confirmationMessage: "We received your payment and started preparing your Blueprint.",
      confirmationButtonText: "Continue",
    },
  });

  if (checkout.error) {
    throw checkout.error;
  }

  const checkoutUrl = checkout.data?.data.attributes.url;
  if (!checkoutUrl) {
    throw new Error("Lemon Squeezy did not return a checkout URL");
  }

  return checkoutUrl;
}
