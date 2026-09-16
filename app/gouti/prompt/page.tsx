import PromptPageContent from "@/components/PromptPageContent";
import ReportPageShell from "@/components/ReportPageShell";
import { getSubmissionForReportPage } from "@/lib/submissions";

export const dynamic = "force-dynamic";

function nameFromQuery(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  return trimmed.slice(0, 80);
}

/**
 * Gouti gift / prompt page — Azo thanks + flat bg.
 * Production gift page stays at /prompt.
 */
export default async function GoutiPromptPage({
  searchParams,
}: {
  searchParams: Promise<{ submission_id?: string; name?: string }>;
}) {
  const { submission_id: submissionId, name } = await searchParams;
  const submission = submissionId
    ? await getSubmissionForReportPage(submissionId)
    : null;
  const userName = submission?.name || nameFromQuery(name) || "Lewis Hamilton";
  const publicId = submission?.public_id;
  const giftParams = new URLSearchParams();
  if (publicId) giftParams.set("submission_id", publicId);
  giftParams.set("name", userName);
  const giftHref = `/gouti/prompt?${giftParams.toString()}`;

  return (
    <ReportPageShell
      userName={userName}
      submissionId={publicId}
      showIntro={false}
      showReviews={false}
      scaleReport={false}
      shellClassName="bg-[#F7F7F7]"
      giftHref={giftHref}
      reportHref={
        publicId
          ? `/report/${encodeURIComponent(publicId)}`
          : "/gouti/report-preview"
      }
      showGiftLink={false}
    >
      <PromptPageContent userName={userName} shortThanks />
    </ReportPageShell>
  );
}
