"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ReportDownloadButton from "@/components/ReportDownloadButton";
import ReportReviewSection from "@/components/ReportReviewSection";
import { Highlight } from "@/components/testimonial-data";
import { downloadReportPdf } from "@/lib/client-download-report";

type ReportDownloadThanksBannerProps = {
  userName: string;
  submissionId?: string;
  showDownloadButton?: boolean;
  align?: "center" | "left";
  showEarlyBirdBadge?: boolean;
  giftHref?: string | false;
  /** Short “Thanks {name}” in Azo (hero title font). */
  shortThanks?: boolean;
  /** Feedback button beside download; opens review as a popup. */
  feedbackAsPopup?: boolean;
};

export default function ReportDownloadThanksBanner({
  userName,
  submissionId,
  showDownloadButton = true,
  align = "center",
  showEarlyBirdBadge = false,
  giftHref,
  shortThanks = false,
  feedbackAsPopup = false,
}: ReportDownloadThanksBannerProps) {
  const firstName = userName.trim().split(/\s+/)[0] || "there";
  const isLeft = align === "left";
  const [linkPhase, setLinkPhase] = useState<"idle" | "loading" | "error">(
    "idle",
  );
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

  async function handleTextDownload() {
    if (linkPhase === "loading") return;

    setLinkPhase("loading");
    try {
      await downloadReportPdf({ userName, submissionId });
      setLinkPhase("idle");
    } catch {
      setLinkPhase("error");
    }
  }

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
    <div
      className={
        isLeft
          ? "pb-0 pt-2 text-left text-black"
          : "px-5 pb-0 pt-[64px] text-center text-black sm:pt-[72px]"
      }
    >
      {showEarlyBirdBadge ? (
        <span className="mb-6 inline-block border border-black bg-[#F6E9D8] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-8 sm:text-xs">
          🚨 ONLY FOR FIRST 100 CREATORS
        </span>
      ) : null}
      {shortThanks ? (
        <p
          className="m-0 text-[clamp(1.5rem,4vw,2.35rem)] font-normal uppercase leading-[1.1] tracking-[-0.02em] text-black"
          style={{ fontFamily: "var(--font-azo-uber), sans-serif" }}
        >
          Thanks {firstName}!
        </p>
      ) : (
        <p
          className="m-0 text-[28px] font-normal italic leading-[1.2] sm:text-[36px]"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          <span className="block">Thanks {firstName} for</span>
          <span className="block">letting us be part of your journey..</span>
        </p>
      )}
      <div
        className={`mt-2 max-w-xl text-sm leading-relaxed text-black sm:text-base ${
          isLeft ? "" : "mx-auto"
        }`}
        style={{
          fontFamily: shortThanks
            ? "var(--font-geist-sans), Arial, Helvetica, sans-serif"
            : "var(--font-garamond)",
        }}
      >
        <p className="m-0">
          Your personalized blueprint is ready. We&apos;ve also got a little
          gift for you,
        </p>
        {giftHref === false ? (
          <p className="m-0">
            <Highlight>check it out here...</Highlight>
          </p>
        ) : giftHref ? (
          <p className="m-0">
            <Link href={giftHref} className="underline underline-offset-2">
              <Highlight>check it out here...</Highlight>
            </Link>
          </p>
        ) : (
          <p className="m-0">
            <button
              type="button"
              onClick={handleTextDownload}
              disabled={linkPhase === "loading"}
              className="font-normal text-black underline underline-offset-2 disabled:cursor-wait"
            >
              {linkPhase === "loading" ? (
                "preparing your pdf…"
              ) : linkPhase === "error" ? (
                "try download again"
              ) : (
                <Highlight>check it out here...</Highlight>
              )}
            </button>
          </p>
        )}
      </div>
      <div
        className={`mt-6 h-px w-full max-w-xl sm:mt-7 ${isLeft ? "" : "mx-auto"}`}
        style={{
          background: isLeft
            ? "linear-gradient(to right, rgba(0,0,0,0.85), transparent)"
            : "linear-gradient(to right, transparent, rgba(0,0,0,0.85) 50%, transparent)",
        }}
        aria-hidden="true"
      />
      {showDownloadButton ? (
        <>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7 sm:gap-4">
            <ReportDownloadButton
              userName={userName}
              submissionId={submissionId}
              size="large"
            />
            {feedbackAsPopup ? (
              <button
                type="button"
                onClick={() => setFeedbackOpen(true)}
                className="inline-flex h-[44px] w-[196px] flex-col items-center justify-center rounded-none border-2 border-black bg-white font-semibold text-black shadow-[3px_3px_0_0_#000] transition hover:bg-[#F7F7F7] sm:h-[50px] sm:w-[224px] sm:shadow-[4px_4px_0_0_#000] md:h-[56px] md:w-[250px]"
              >
                <span className="text-[11px] font-bold leading-none tracking-wide sm:text-xs md:text-[13px]">
                  GIVE FEEDBACK
                </span>
                <span className="mt-0.5 text-[8px] font-semibold leading-none sm:mt-1 sm:text-[9px] md:text-[10px]">
                  Share your thoughts
                </span>
              </button>
            ) : null}
          </div>
          <div
            className="mx-auto mt-6 h-px w-full max-w-xl sm:mt-7"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,0,0,0.85) 50%, transparent)",
            }}
            aria-hidden="true"
          />
        </>
      ) : null}

      {feedbackModal}
    </div>
  );
}
