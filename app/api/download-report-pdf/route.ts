import { generateReportPdf } from "@/lib/generate-report-pdf";

export const runtime = "nodejs";
export const maxDuration = 60;

function sanitizeFileName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const preview = searchParams.get("preview") === "1";
  const name = searchParams.get("name") ?? "blueprint";

  if (!preview) {
    return Response.json(
      { error: "Only preview PDF export is enabled for now." },
      { status: 400 },
    );
  }

  try {
    const pdf = await generateReportPdf("/report-export");
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
      { error: "Failed to generate PDF. Is the dev server running?" },
      { status: 500 },
    );
  }
}
