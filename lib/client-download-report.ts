function sanitizeFileName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getReportPdfFileName(userName: string) {
  return `${sanitizeFileName(userName) || "blueprint"}-creator-blueprint.pdf`;
}

export function getReportPdfDownloadUrl({
  userName,
  submissionId,
}: {
  userName: string;
  submissionId?: string;
}) {
  const params = new URLSearchParams({ name: userName });

  if (submissionId) {
    params.set("submission_id", submissionId);
  } else {
    params.set("preview", "1");
  }

  return `/api/download-report-pdf?${params.toString()}`;
}

export async function downloadReportPdf({
  userName,
  submissionId,
}: {
  userName: string;
  submissionId?: string;
}) {
  const response = await fetch(getReportPdfDownloadUrl({ userName, submissionId }), {
    signal: AbortSignal.timeout(90_000),
  });

  if (!response.ok) {
    throw new Error("PDF generation failed");
  }

  const blob = await response.blob();
  if (!blob.size || blob.type.includes("json")) {
    throw new Error("PDF generation failed");
  }

  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = getReportPdfFileName(userName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}
