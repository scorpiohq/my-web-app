import { NextResponse } from "next/server";
import { createBlueprintCheckout } from "@/lib/lemonsqueezy";
import {
  createPendingSubmission,
  type SubmissionPayload,
} from "@/lib/submissions";

function getAppUrl(request: Request) {
  return process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
}

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
      profile_image_type: body.profile_image_type || "avatar",
    });

    const appUrl = getAppUrl(request);
    const checkoutUrl = await createBlueprintCheckout({
      submissionId,
      email: body.email.trim().toLowerCase(),
      name: body.name.trim(),
      redirectUrl: `${appUrl}/form/thank-you?submission_id=${submissionId}`,
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
