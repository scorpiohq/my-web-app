"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ReportDownloadButton from "@/components/ReportDownloadButton";
import ReportReviewSection from "@/components/ReportReviewSection";

/**
 * Download + optional feedback — used above or below the report.
 */
export default function ReportPageActions({
  userName,
  submissionId,
  feedbackAsPopup = false,
  singleLine = false,
  className = "",
}: {
  userName: string;
  submissionId?: string;
  feedbackAsPopup?: boolean;
  /** One-line labels on download + feedback. */
  singleLine?: boolean;
  className?: string;
}) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!feedbackOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFeedbackOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [feedbackOpen]);

  const feedbackModal =
    feedbackAsPopup && feedbackOpen && portalReady
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8"
            role="dialog"
            aria-modal="true"
            aria-label="Feedback"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Close feedback"
              onClick={() => setFeedbackOpen(false)}
            />
            <div className="relative z-10 w-full max-w-lg">
              <button
                type="button"
                onClick={() => setFeedbackOpen(false)}
                className="absolute -right-1 -top-3 z-20 flex h-8 w-8 items-center justify-center border-2 border-black bg-white text-lg leading-none shadow-[2px_2px_0_0_#000] sm:-right-2 sm:-top-4"
                aria-label="Close"
              >
                ×
              </button>
              <ReportReviewSection
                submissionId={submissionId}
                variant="modal"
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className={className}>
      {feedbackAsPopup ? (
        <div className="mb-6 text-center sm:mb-7">
          <h2
            className="m-0 text-[clamp(1.35rem,3.2vw,1.85rem)] font-bold leading-[1.15] tracking-[-0.02em] text-black"
            style={{
              fontFamily:
                'var(--font-bricolage), "Bricolage Grotesque", sans-serif',
            }}
          >
            One Small Ask.
          </h2>
          <p
            className="mx-auto mt-1.5 max-w-md text-[14px] leading-[1.55] text-black/80 sm:mt-2 sm:text-[15px] sm:leading-[1.6]"
            style={{
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            }}
          >
            If this helped, leave a review. That&apos;s literally how the next
            person finds this.
          </p>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <ReportDownloadButton
          userName={userName}
          submissionId={submissionId}
          size="large"
          singleLine={singleLine}
        />
        {feedbackAsPopup ? (
          <button
            type="button"
            onClick={() => setFeedbackOpen(true)}
            className={
              singleLine
                ? "btn-brutal inline-flex h-[44px] min-w-[196px] items-center justify-center border-2 border-black bg-white px-5 text-[11px] font-bold tracking-wide text-black shadow-[4px_4px_0_0_#000] hover:bg-[#F7F7F7] hover:shadow-[7px_7px_0_0_#000] active:shadow-[4px_4px_0_0_#000] sm:h-[50px] sm:min-w-[224px] sm:px-6 sm:text-xs md:h-[52px] md:min-w-[240px] md:text-[13px]"
                : "inline-flex h-[44px] w-[196px] flex-col items-center justify-center rounded-none border-2 border-black bg-white font-semibold text-black shadow-[3px_3px_0_0_#000] transition hover:bg-[#F7F7F7] sm:h-[50px] sm:w-[224px] sm:shadow-[4px_4px_0_0_#000] md:h-[56px] md:w-[250px]"
            }
          >
            {singleLine ? (
              <span>SHARE YOUR REVIEW</span>
            ) : (
              <>
                <span className="text-[11px] font-bold leading-none tracking-wide sm:text-xs md:text-[13px]">
                  GIVE FEEDBACK
                </span>
                <span className="mt-0.5 text-[8px] font-semibold leading-none sm:mt-1 sm:text-[9px] md:text-[10px]">
                  Share your thoughts
                </span>
              </>
            )}
          </button>
        ) : null}
      </div>
      {feedbackModal}
    </div>
  );
}
