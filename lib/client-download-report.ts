import { isIosDevice } from "@/lib/report-print-device";

export function getReportPrintUrl(submissionId?: string) {
  const params = new URLSearchParams({ print: "1" });

  if (submissionId) {
    params.set("submission_id", submissionId);
  }

  return `/report-export?${params.toString()}`;
}

export async function downloadReportPdf({
  submissionId,
}: {
  userName: string;
  submissionId?: string;
}) {
  const url = getReportPrintUrl(submissionId);

  if (isIosDevice()) {
    window.location.assign(url);
    return;
  }

  const printWindow = window.open(url, "blueprint-print");

  if (!printWindow) {
    window.location.assign(url);
  }
}
