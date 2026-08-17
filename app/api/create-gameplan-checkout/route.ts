import { NextResponse } from "next/server";
import { createGameplanCheckout } from "@/lib/lemonsqueezy";
import {
  getAppBaseUrl,
  getPaidSubmissionInternalId,
} from "@/lib/submissions";

function isPublicAccessId(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      submissionId?: string;
    };
    const publicId = body.submissionId?.trim();
    const appUrl = getAppBaseUrl(request);
    const internalId =
      publicId && isPublicAccessId(publicId)
        ? await getPaidSubmissionInternalId(publicId)
        : null;

    const redirectUrl =
      publicId && isPublicAccessId(publicId)
        ? `${appUrl}/form/thank-you?submission_id=${encodeURIComponent(publicId)}&product=gameplan`
        : `${appUrl}/form/thank-you?product=gameplan`;

    const checkoutUrl = await createGameplanCheckout({
      submissionId: internalId || undefined,
      redirectUrl,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
