import { NextResponse } from "next/server";
import { createBlueprintCheckout } from "@/lib/lemonsqueezy";
import {
  createPendingSubmission,
  getAppBaseUrl,
  type SubmissionPayload,
} from "@/lib/submissions";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmissionPayload;

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

    const submission = await createPendingSubmission({
      name: body.name.trim(),
      email,
      age,
      location: body.location?.trim() || "",
      gender: body.gender || null,
      answers: body.answers || {},
    });

    const appUrl = getAppBaseUrl(request);
    const redirectUrl = `${appUrl}/form/thank-you?submission_id=${submission.publicId}`;

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

    const checkoutUrl = await createBlueprintCheckout({
      submissionId: submission.id,
      email,
      name: body.name.trim(),
      redirectUrl,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl,
      submissionId: submission.publicId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
