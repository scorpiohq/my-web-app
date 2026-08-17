import { notFound, redirect } from "next/navigation";
import { ReportTemplate } from "@/app/report-preview/page";
import ReportPageShell from "@/components/ReportPageShell";
import {
  mapSubmissionToReportData,
  type StoredReportJson,
} from "@/lib/report-mapper";
import { getSubmissionForReportPage } from "@/lib/submissions";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getSubmissionForReportPage(id);

  if (!submission) {
    return notFound();
  }

  if (submission.report_status !== "ready" || !submission.report_json) {
    redirect(`/progress?submission_id=${encodeURIComponent(id)}`);
  }

  const reportData = mapSubmissionToReportData(
    submission,
    submission.report_json as StoredReportJson,
  );

  return (
    <ReportPageShell
      userName={submission.name || "Creator"}
      submissionId={submission.public_id}
    >
      <ReportTemplate
        data={reportData}
        gameplanHref={`/gameplan?submission_id=${encodeURIComponent(submission.public_id)}`}
      />
    </ReportPageShell>
  );
}
