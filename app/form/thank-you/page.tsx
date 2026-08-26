import PaymentThankYouTicket from "@/components/PaymentThankYouTicket";
import ClearFormDraftOnMount from "@/components/ClearFormDraftOnMount";
import PurchaseTracking from "@/components/PurchaseTracking";
import { getSubmissionForThankYou } from "@/lib/submissions";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ submission_id?: string; product?: string }>;
}) {
  const params = await searchParams;
  const submissionId = params.submission_id?.trim();
  const product = params.product === "gameplan" ? "gameplan" : "blueprint";
  const submission = submissionId
    ? await getSubmissionForThankYou(submissionId)
    : null;
  const publicId = submission?.public_id || submissionId;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <ClearFormDraftOnMount />
      <PurchaseTracking product={product} publicId={publicId} />
      <PaymentThankYouTicket
        publicId={publicId}
        paidAt={submission?.created_at}
        product={product}
      />
    </div>
  );
}
