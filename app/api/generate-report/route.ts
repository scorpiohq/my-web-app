import { NextResponse } from "next/server";
import { generateReportForSubmission } from "@/lib/generate-report";

export const runtime = "nodejs";
export const maxDuration = 300;

function isAuthorized(request: Request) {
  const secret = process.env.INTERNAL_API_SECRET;
  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload =
    typeof body === "object" && body !== null
      ? (body as { submissionId?: unknown; force?: unknown })
      : {};
  const submissionId =
    typeof payload.submissionId === "string" ? payload.submissionId.trim() : "";
  const force = payload.force === true;

  if (!submissionId) {
    return NextResponse.json({ error: "Missing submissionId" }, { status: 400 });
  }

  try {
    const reportJson = await generateReportForSubmission(submissionId, { force });
    return NextResponse.json({ ok: true, reportJson });
  } catch (error) {
    console.error("Report generation failed:", error);
    const message =
      error instanceof Error ? error.message : "Report generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
