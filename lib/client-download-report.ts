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
