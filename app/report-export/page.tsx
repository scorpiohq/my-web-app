import { notFound } from "next/navigation";
import { ReportTemplate } from "@/app/report-preview/page";
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

export default async function ReportExportPage({
  searchParams,
}: {
  searchParams: Promise<{ submission_id?: string; origin?: string }>;
}) {
  const { submission_id: submissionId, origin } = await searchParams;
  const gameplanHref = getGameplanHref(origin, submissionId);

  if (!submissionId) {
    return (
      <div className="report-export-mode bg-white">
        <ReportTemplate
          data={previewReportData}
          gameplanHref={gameplanHref}
          exportMode
        />
      </div>
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
    <div className="report-export-mode bg-white">
      <ReportTemplate
        data={reportData}
        gameplanHref={gameplanHref}
        exportMode
      />
    </div>
  );
}
