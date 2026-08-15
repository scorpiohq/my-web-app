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

    const submissionId = await createPendingSubmission({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      age: Number(body.age),
      location: body.location?.trim() || "",
      gender: body.gender || null,
      answers: body.answers || {},
    });

    const appUrl = getAppBaseUrl(request);
    const redirectUrl = `${appUrl}/form/thank-you?submission_id=${submissionId}`;

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
      submissionId,
      email: body.email.trim().toLowerCase(),
      name: body.name.trim(),
      redirectUrl,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl,
      submissionId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
