import PaymentThankYouTicket from "@/components/PaymentThankYouTicket";
import { getSubmissionForThankYou } from "@/lib/submissions";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ submission_id?: string }>;
}) {
  const params = await searchParams;
  const submissionId = params.submission_id?.trim();
  const submission = submissionId
    ? await getSubmissionForThankYou(submissionId)
    : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <PaymentThankYouTicket
        publicId={submission?.public_id || submissionId}
        paidAt={submission?.created_at}
      />
    </div>
  );
}
