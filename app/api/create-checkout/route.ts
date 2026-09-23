import { NextResponse } from "next/server";
import { createBlueprintCheckout } from "@/lib/lemonsqueezy";
import { createBlueprintStripeCheckout } from "@/lib/stripe";
import {
  createPendingSubmission,
  getAppBaseUrl,
  type SubmissionPayload,
} from "@/lib/submissions";

function paymentProvider() {
  const raw = process.env.PAYMENT_PROVIDER?.trim().toLowerCase();
  if (raw === "stripe" || raw === "lemon" || raw === "lemonsqueezy") {
    return raw === "lemonsqueezy" ? "lemon" : raw;
  }
  // Prefer Stripe when its secret is configured.
  if (process.env.STRIPE_SECRET_KEY?.trim()) {
    return "stripe";
  }
  return "lemon";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmissionPayload & {
      journey?: string;
    };

    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const email = body.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const age = Number(body.age);
    if (!Number.isInteger(age) || age < 13 || age > 100) {
      return NextResponse.json(
        { error: "Please enter a valid age between 13 and 100." },
        { status: 400 },
      );
    }

    const isGoutiJourney = body.journey === "gouti";

    const submission = await createPendingSubmission({
      name: body.name.trim(),
      email,
      age,
      location: body.location?.trim() || "",
      gender: body.gender || null,
      answers: body.answers || {},
    });

    const appUrl = getAppBaseUrl(request);
    const redirectUrl = isGoutiJourney
      ? `${appUrl}/progress?submission_id=${submission.publicId}`
      : `${appUrl}/form/thank-you?submission_id=${submission.publicId}`;

    try {
      new URL(redirectUrl);
    } catch {
      return NextResponse.json(
        {
          error:
            "App URL is misconfigured. Set NEXT_PUBLIC_APP_URL to your Vercel URL on Vercel.",
        },
        { status: 500 },
      );
    }

    const provider = paymentProvider();
    let checkoutUrl: string;

    if (provider === "stripe") {
      const cancelUrl = isGoutiJourney
        ? `${appUrl}/gouti/landing#pricing`
        : `${appUrl}/form`;
      checkoutUrl = await createBlueprintStripeCheckout({
        submissionId: submission.id,
        email,
        name: body.name.trim(),
        successUrl: redirectUrl.includes("?")
          ? `${redirectUrl}&session_id={CHECKOUT_SESSION_ID}`
          : `${redirectUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl,
      });
    } else {
      checkoutUrl = await createBlueprintCheckout({
        submissionId: submission.id,
        email,
        name: body.name.trim(),
        redirectUrl,
        embed: isGoutiJourney,
      });
    }

    return NextResponse.json({
      success: true,
      checkoutUrl,
      submissionId: submission.publicId,
      journey: isGoutiJourney ? "gouti" : "default",
      provider,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
