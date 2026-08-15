import { generateReportPdf } from "@/lib/generate-report-pdf";
import { getSubmissionForReportPage } from "@/lib/submissions";

export const runtime = "nodejs";
export const maxDuration = 60;

function sanitizeFileName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getRequestOrigin(request: Request) {
  const url = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`;
  }

  return url.origin;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const preview = searchParams.get("preview") === "1";
  const submissionId = searchParams.get("submission_id")?.trim();
  const name = searchParams.get("name") ?? "blueprint";
  const origin = getRequestOrigin(request);

  try {
    if (submissionId) {
      const submission = await getSubmissionForReportPage(submissionId);

      if (
        !submission ||
        submission.report_status !== "ready" ||
        !submission.report_json
      ) {
        return Response.json(
          { error: "Report is not ready for download." },
          { status: 404 },
        );
      }

      const pdf = await generateReportPdf(
        `/report-export?submission_id=${encodeURIComponent(submissionId)}`,
        origin,
      );
      const slug =
        sanitizeFileName(submission.name || name) || "blueprint";

      return new Response(Buffer.from(pdf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${slug}-creator-blueprint.pdf"`,
          "Cache-Control": "no-store",
        },
      });
    }

    if (!preview) {
      return Response.json(
        { error: "A submission_id is required to download a report PDF." },
        { status: 400 },
      );
    }

    const pdf = await generateReportPdf("/report-export", origin);
    const slug = sanitizeFileName(name) || "blueprint";

    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}-creator-blueprint.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return Response.json(
      { error: "Failed to generate PDF. Is the app running?" },
      { status: 500 },
    );
  }
}
