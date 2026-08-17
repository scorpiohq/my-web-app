import PromptPageContent from "@/components/PromptPageContent";
import ReportPageShell from "@/components/ReportPageShell";
import { getSubmissionForReportPage } from "@/lib/submissions";

export const dynamic = "force-dynamic";

function nameFromQuery(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  return trimmed.slice(0, 80);
}

export default async function PromptPage({
  searchParams,
}: {
  searchParams: Promise<{ submission_id?: string; name?: string }>;
}) {
  const { submission_id: submissionId, name } = await searchParams;
  const submission = submissionId
    ? await getSubmissionForReportPage(submissionId)
    : null;
  const userName = submission?.name || nameFromQuery(name) || "there";

  return (
    <ReportPageShell
      userName={userName}
      submissionId={submission?.public_id}
      showIntro={false}
      showReviews={false}
      scaleReport={false}
    >
      <PromptPageContent userName={userName} />
    </ReportPageShell>
  );
}
