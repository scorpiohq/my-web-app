import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, getStripeWebhookSecret } from "@/lib/stripe";
import {
  markSubmissionPaid,
  triggerReportGeneration,
} from "@/lib/submissions";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = getStripeWebhookSecret();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid Stripe signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid" && session.status !== "complete") {
      return NextResponse.json({ received: true });
    }

    const submissionId =
      session.metadata?.submission_id ||
      session.client_reference_id ||
      undefined;

    if (!submissionId) {
      return NextResponse.json(
        { error: "Missing submission_id on Checkout Session" },
        { status: 400 },
      );
    }

    if (session.metadata?.product && session.metadata.product !== "blueprint") {
      return NextResponse.json({ received: true });
    }

    try {
      await markSubmissionPaid(submissionId);
      triggerReportGeneration(submissionId);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update submission";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
