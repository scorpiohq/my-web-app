import { redirect } from "next/navigation";
import BlueprintProgressScreen from "@/components/BlueprintProgressScreen";
import { getSubmissionReportStatus } from "@/lib/submissions";

export default async function ProgressPage({
  searchParams,
}: {
  searchParams: Promise<{ submission_id?: string; preview?: string }>;
}) {
  const params = await searchParams;
  const submissionId = params.submission_id?.trim();

  if (!submissionId) {
    redirect("/");
  }

  const submission = await getSubmissionReportStatus(submissionId);
  if (!submission) {
    redirect("/");
  }

  return (
    <BlueprintProgressScreen
      submissionId={submission.public_id}
      preview={params.preview === "1"}
    />
  );
}
