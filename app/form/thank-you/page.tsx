import Link from "next/link";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ submission_id?: string }>;
}) {
  const params = await searchParams;
  const submissionId = params.submission_id;

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[320px] sm:max-w-[360px]">
        <div className="border-2 border-black bg-white px-5 py-6 shadow-[6px_6px_0_0_#000] sm:px-6 sm:py-7">
          <p className="text-lg font-semibold leading-snug text-black sm:text-xl">
            Payment received
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
            Thanks for your purchase. We saved your answers and started preparing
            your personalized Blueprint.
          </p>

          {submissionId && (
            <p className="mt-3 text-xs text-[#999]">
              Reference: {submissionId.slice(0, 8)}...
            </p>
          )}

          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              href={
                submissionId
                  ? `/progress?submission_id=${submissionId}`
                  : "/progress"
              }
              className="btn-brutal btn-brutal-primary w-full px-8 py-3 text-center text-sm font-semibold text-black"
            >
              View progress
            </Link>
            <Link
              href="/"
              className="text-xs font-semibold text-black underline underline-offset-2"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
