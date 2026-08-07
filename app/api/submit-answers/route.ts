import { NextResponse } from "next/server";
import { createPendingSubmission, type SubmissionPayload } from "@/lib/submissions";

/** @deprecated Use POST /api/create-checkout for the paywall flow. */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmissionPayload;
    const submissionId = await createPendingSubmission(body);
    return NextResponse.json({ success: true, data: { id: submissionId } });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save submission";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
