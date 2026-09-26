import { NextResponse } from "next/server";
import { markCheckoutStarted } from "@/lib/abandoned-checkout-emails";
import { createCheckoutUrl } from "@/lib/checkout";
import { getPendingSubmissionForCheckout } from "@/lib/submissions";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      submissionId?: string;
      journey?: string;
    };

    const publicId = body.submissionId?.trim() || "";
    const submission = await getPendingSubmissionForCheckout(publicId);

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found." },
        { status: 404 },
      );
    }

    if (submission.paymentStatus === "paid") {
      return NextResponse.json({
        success: true,
        alreadyPaid: true,
        progressUrl: `/progress?submission_id=${submission.publicId}`,
      });
    }

    await markCheckoutStarted(submission.id);

    const { checkoutUrl, provider } = await createCheckoutUrl({
      request,
      submissionId: submission.id,
      publicId: submission.publicId,
      email: submission.email,
      name: submission.name,
      isGoutiJourney: body.journey !== "default",
    });

    return NextResponse.json({
      success: true,
      checkoutUrl,
      submissionId: submission.publicId,
      provider,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to start checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
