import { notFound, redirect } from "next/navigation";
import { ReportTemplate } from "@/app/gouti/report-preview/page";
import JourneyEnter from "@/components/gouti/JourneyEnter";
import ReportReadyHero from "@/components/gouti/ReportReadyHero";
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
  const userName = submission.name || "Creator";
  const giftParams = new URLSearchParams();
  giftParams.set("submission_id", submission.public_id);
  if (userName.trim()) {
    giftParams.set("name", userName.trim());
  }
  const giftHref = `/prompt?${giftParams.toString()}`;

  return (
    <JourneyEnter bg="#F7F7F7" className="min-h-screen">
      <ReportPageShell
        userName={userName}
        submissionId={submission.public_id}
        showIntro={false}
        showPeekCaption={false}
        feedbackAsPopup
        actionsBelowReport
        footerSurface="soft"
        shellClassName="bg-[#F7F7F7]"
        giftHref={giftHref}
        reportHref={`/report/${encodeURIComponent(submission.public_id)}`}
        showGiftLink={false}
        contentClassName="!pt-0"
        aboveContent={
          <ReportReadyHero userName={userName} giftHref={giftHref} />
        }
      >
        <ReportTemplate data={reportData} />
      </ReportPageShell>
    </JourneyEnter>
  );
}
