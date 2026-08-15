import { saveSubmissionReview } from "@/lib/submissions";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const submissionId =
    typeof body === "object" &&
    body !== null &&
    "submissionId" in body &&
    typeof body.submissionId === "string"
      ? body.submissionId.trim()
      : "";

  const rating =
    typeof body === "object" &&
    body !== null &&
    "rating" in body &&
    typeof body.rating === "number"
      ? body.rating
      : 0;

  const comment =
    typeof body === "object" &&
    body !== null &&
    "comment" in body &&
    typeof body.comment === "string"
      ? body.comment.trim()
      : "";

  if (!submissionId) {
    return Response.json({ error: "Missing submission ID" }, { status: 400 });
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return Response.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  }

  if (comment.length > 1000) {
    return Response.json({ error: "Comment is too long" }, { status: 400 });
  }

  try {
    await saveSubmissionReview(submissionId, { rating, comment });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Review submission failed:", error);

    if (error instanceof Error && error.name === "ReviewAlreadySubmitted") {
      return Response.json(
        { error: "Review already submitted", alreadySubmitted: true },
        { status: 409 },
      );
    }

    if (error instanceof Error && error.message === "Report not found") {
      return Response.json({ error: "Report not found" }, { status: 404 });
    }

    return Response.json({ error: "Failed to save review" }, { status: 500 });
  }
}
