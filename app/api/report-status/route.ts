import { NextResponse } from "next/server";
import { getSubmissionReportStatus } from "@/lib/submissions";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const submissionId = searchParams.get("submission_id")?.trim();

  if (!submissionId) {
    return NextResponse.json(
      { error: "Missing submission_id query param" },
      { status: 400 },
    );
  }

  const submission = await getSubmissionReportStatus(submissionId);

  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  return NextResponse.json({
    submissionId: submission.id,
    paymentStatus: submission.payment_status,
    reportStatus: submission.report_status,
    ready: submission.report_status === "ready",
  });
}
