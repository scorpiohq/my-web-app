import { createCheckout, lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

let configured = false;

export function configureLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) {
    throw new Error("LEMONSQUEEZY_API_KEY is not set");
  }

  if (!configured) {
    lemonSqueezySetup({ apiKey: apiKey.trim() });
    configured = true;
  }
}

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

function formatLemonSqueezyError(error: unknown) {
  if (!(error instanceof Error)) {
    return "Failed to create Lemon Squeezy checkout";
  }

  const cause = (error as Error & { cause?: unknown }).cause;
  if (Array.isArray(cause) && cause.length > 0) {
    const details = cause
      .map((item) => {
        if (typeof item === "object" && item !== null && "detail" in item) {
          return String(item.detail);
        }
        return null;
      })
      .filter(Boolean);

    if (details.length > 0) {
      return details.join(" ");
    }
  }

  return error.message;
}

async function createLemonCheckout({
  variantId,
  variantEnvName,
  submissionId,
  email,
  name,
  redirectUrl,
  receiptButtonText,
  receiptThankYouNote,
}: {
  variantId: number;
  variantEnvName: string;
  submissionId?: string;
  email?: string;
  name?: string;
  redirectUrl?: string;
  receiptButtonText: string;
  receiptThankYouNote: string;
}) {
  configureLemonSqueezy();

  const storeId = Number(requireEnv("LEMONSQUEEZY_STORE_ID"));
  const testMode = process.env.LEMONSQUEEZY_TEST_MODE === "true";

  if (!Number.isFinite(storeId) || !Number.isFinite(variantId)) {
    throw new Error(
      `LEMONSQUEEZY_STORE_ID and ${variantEnvName} must be numbers`,
    );
  }

  const custom = submissionId
    ? { submission_id: String(submissionId) }
    : undefined;

  const checkout = await createCheckout(storeId, variantId, {
    testMode,
    checkoutOptions: {
      embed: false,
      media: true,
      logo: true,
    },
    checkoutData: {
      ...(email ? { email } : {}),
      ...(name ? { name } : {}),
      ...(custom ? { custom } : {}),
    },
    productOptions: {
      ...(redirectUrl ? { redirectUrl } : {}),
      receiptButtonText,
      receiptThankYouNote,
    },
  });

  if (checkout.error) {
    throw new Error(formatLemonSqueezyError(checkout.error));
  }

  const checkoutUrl = checkout.data?.data.attributes.url;
  if (!checkoutUrl) {
    throw new Error("Lemon Squeezy did not return a checkout URL");
  }

  return checkoutUrl;
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
  return createLemonCheckout({
    variantId: Number(requireEnv("LEMONSQUEEZY_VARIANT_ID")),
    variantEnvName: "LEMONSQUEEZY_VARIANT_ID",
    submissionId,
    email,
    name,
    redirectUrl,
    receiptButtonText: "View your progress",
    receiptThankYouNote:
      "Thanks for your purchase. Your Blueprint is on the way.",
  });
}

export function getGameplanVariantId() {
  const raw = process.env.LEMONSQUEEZY_GAMEPLAN_VARIANT_ID?.trim();
  if (!raw) {
    return null;
  }

  const variantId = Number(raw);
  return Number.isFinite(variantId) ? variantId : null;
}

export async function createGameplanCheckout({
  submissionId,
  redirectUrl,
}: {
  submissionId?: string;
  redirectUrl: string;
}) {
  const variantId = getGameplanVariantId();
  if (!variantId) {
    throw new Error("LEMONSQUEEZY_GAMEPLAN_VARIANT_ID is not set");
  }

  return createLemonCheckout({
    variantId,
    variantEnvName: "LEMONSQUEEZY_GAMEPLAN_VARIANT_ID",
    submissionId,
    redirectUrl,
    receiptButtonText: "Continue",
    receiptThankYouNote:
      "Thanks. Your Gameplan slot is locked in. We'll email you when it's ready.",
  });
}
