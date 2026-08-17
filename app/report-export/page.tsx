import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ReportTemplate } from "@/app/report-preview/page";
import ReportIosPdfSave from "@/components/ReportIosPdfSave";
import ReportPreviewFit from "@/components/ReportPreviewFit";
import ReportPrintTrigger from "@/components/ReportPrintTrigger";
import {
  mapSubmissionToReportData,
  type StoredReportJson,
} from "@/lib/report-mapper";
import { previewReportData } from "@/lib/report-preview-data";
import { getSubmissionForReportPage } from "@/lib/submissions";

export const dynamic = "force-dynamic";

function getGameplanHref(origin: string | undefined, submissionId?: string) {
  const path = submissionId
    ? `/gameplan?submission_id=${encodeURIComponent(submissionId)}`
    : "/gameplan";
  const base = (origin || process.env.NEXT_PUBLIC_APP_URL || "").replace(
    /\/$/,
    "",
  );

  return base ? `${base}${path}` : path;
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
      {shouldPrint ? <ReportPrintTrigger /> : null}
      {shouldPrint ? <ReportIosPdfSave /> : null}
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
  const gameplanHref = getGameplanHref(origin, submissionId);
  const shouldPrint = print === "1";

  if (!submissionId) {
    return (
      <ExportFrame shouldPrint={shouldPrint}>
        <ReportTemplate
          data={previewReportData}
          gameplanHref={gameplanHref}
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
        gameplanHref={gameplanHref}
        exportMode
      />
    </ExportFrame>
  );
}
