"use client";

import { useState } from "react";

type ReportReviewSectionProps = {
  submissionId?: string;
};

type ReviewPayload = {
  rating: number;
  comment: string;
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-full w-full ${filled ? "fill-black" : "fill-transparent"}`}
    >
      <path
        d="M12 2.5l2.87 5.82 6.42.93-4.64 4.53 1.1 6.39L12 17.77l-5.75 3.02 1.1-6.39-4.64-4.53 6.42-.93L12 2.5z"
        stroke="black"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ReportReviewSection({
  submissionId,
}: ReportReviewSectionProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayRating = hoverRating || rating;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (rating < 1 || isSubmitting || isSubmitted) return;

    if (!submissionId) {
      setError(
        "This preview can’t save reviews yet. Open your report from your email link.",
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          rating,
          comment: comment.trim(),
        } satisfies ReviewPayload & { submissionId: string }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string; alreadySubmitted?: boolean }
          | null;

        if (response.status === 409 || body?.alreadySubmitted) {
          setIsSubmitted(true);
          return;
        }

        throw new Error(body?.error ?? "Could not submit review");
      }

      setIsSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not submit review",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-[30px]">
      <div className="relative mx-auto max-w-md border-2 border-black bg-[#F3EEE8] px-4 py-6 shadow-[4px_4px_0_0_#000] sm:max-w-lg sm:px-5 sm:py-7">
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 border border-black bg-[#e5c4a1] px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-black shadow-[2px_2px_0_0_#000] sm:text-[10px]">
          REVIEW
        </span>

        {isSubmitted ? (
          <div className="text-center">
            <h2
              className="mb-1.5 text-base font-bold leading-snug tracking-wide text-black sm:text-lg"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              THANK YOU FOR YOUR FEEDBACK
            </h2>
            <p className="m-0 text-xs text-black/80 sm:text-sm">
              We read every review — it helps us make Your Blueprint better.
            </p>
          </div>
        ) : (
          <>
            <h2
              className="mb-2 text-center text-base font-bold leading-snug tracking-wide text-black sm:text-lg"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              YOUR FEEDBACK MEANS A LOT!!
            </h2>
            <p className="mx-auto mb-3 max-w-sm text-center text-xs leading-relaxed text-black/80 sm:mb-4 sm:text-sm">
              Tell us what you liked, what could be better, or how this Blueprint
              helped you.
            </p>

            <div
              className="mb-3 flex justify-center gap-1 sm:mb-4 sm:gap-1.5"
              role="radiogroup"
              aria-label="Star rating"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value} star${value === 1 ? "" : "s"}`}
                  className="h-6 w-6 transition-transform hover:scale-110 sm:h-7 sm:w-7"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  onFocus={() => setHoverRating(value)}
                  onBlur={() => setHoverRating(0)}
                >
                  <StarIcon filled={value <= displayRating} />
                </button>
              ))}
            </div>

            {rating > 0 ? (
              <form onSubmit={handleSubmit} className="mx-auto max-w-sm">
                <div className="border-2 border-black bg-white p-3 shadow-[3px_3px_0_0_#000] sm:p-3.5">
                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Write Something Nice ✨"
                    rows={3}
                    maxLength={1000}
                    className="min-h-[72px] w-full resize-none border-0 bg-transparent text-xs text-black outline-none placeholder:text-[#999] sm:min-h-[80px] sm:text-sm"
                  />
                </div>

                <div className="mt-3 flex justify-center sm:mt-3.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-brutal btn-brutal-secondary inline-block px-5 py-2 text-xs font-medium text-black disabled:cursor-wait disabled:opacity-70 sm:px-5 sm:py-2.5 sm:text-sm"
                  >
                    {isSubmitting ? "Sending…" : "Submit Feedback"}
                  </button>
                </div>

                {error ? (
                  <p className="mt-2.5 text-center text-[11px] font-medium text-red-700 sm:text-xs">
                    {error}
                  </p>
                ) : null}
              </form>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
