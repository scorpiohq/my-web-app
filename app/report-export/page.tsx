import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ReportTemplate } from "@/app/2610report-preview/page";
import ReportPdfSave from "@/components/ReportPdfSave";
import ReportPreviewFit from "@/components/ReportPreviewFit";
import {
  mapSubmissionToReportData,
  type StoredReportJson,
} from "@/lib/report-mapper";
import { previewReportData } from "@/lib/report-preview-data";
import { getSubmissionForReportPage } from "@/lib/submissions";

export const dynamic = "force-dynamic";

function getGameplanHref(origin: string | undefined, submissionId?: string) {
  const path = submissionId
    ? `/2610gameplan?submission_id=${encodeURIComponent(submissionId)}`
    : "/2610gameplan";

  if (!origin) {
    return path;
  }

  try {
    return new URL(path, origin).href;
  } catch {
    return path;
  }
}

function ExportFrame({
  shouldPrint,
  children,
}: {
  shouldPrint: boolean;
  children: ReactNode;
}) {
  return (
    <div className="report-print-page">
      {shouldPrint ? <ReportPdfSave /> : null}
      <ReportPreviewFit />
      <div className="report-print-preview">
        <div className="report-print-sheet">
          <div className="report-print-fit">
            <div className="report-export-mode bg-white">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ReportExportPage({
  searchParams,
}: {
  searchParams: Promise<{
    submission_id?: string;
    origin?: string;
    print?: string;
  }>;
}) {
  const { submission_id: submissionId, origin, print } = await searchParams;
  const shouldPrint = print === "1";

  if (!submissionId) {
    return (
      <ExportFrame shouldPrint={shouldPrint}>
        <ReportTemplate
          data={previewReportData}
          gameplanHref={getGameplanHref(origin)}
          exportMode
        />
      </ExportFrame>
    );
  }

  const submission = await getSubmissionForReportPage(submissionId);

  if (
    !submission ||
    submission.report_status !== "ready" ||
    !submission.report_json
  ) {
    notFound();
  }

  const reportData = mapSubmissionToReportData(
    submission,
    submission.report_json as StoredReportJson,
  );

  return (
    <ExportFrame shouldPrint={shouldPrint}>
      <ReportTemplate
        data={reportData}
        gameplanHref={getGameplanHref(origin, submission.public_id)}
        exportMode
      />
    </ExportFrame>
  );
}
