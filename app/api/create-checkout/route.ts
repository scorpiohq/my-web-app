import { NextResponse } from "next/server";
import { createCheckoutUrl } from "@/lib/checkout";
import {
  createPendingSubmission,
  type SubmissionPayload,
} from "@/lib/submissions";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmissionPayload & {
      journey?: string;
      deferCheckout?: boolean;
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

    const isGoutiJourney = body.journey !== "default";

    const submission = await createPendingSubmission({
      name: body.name.trim(),
      email,
      age,
      location: body.location?.trim() || "",
      gender: body.gender || null,
      answers: body.answers || {},
    });

    if (body.deferCheckout) {
      return NextResponse.json({
        success: true,
        submissionId: submission.publicId,
        journey: isGoutiJourney ? "gouti" : "default",
        deferred: true,
      });
    }

    const { checkoutUrl, provider } = await createCheckoutUrl({
      request,
      submissionId: submission.id,
      publicId: submission.publicId,
      email,
      name: body.name.trim(),
      isGoutiJourney,
    });

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
