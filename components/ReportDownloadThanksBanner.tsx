"use client";

import Link from "next/link";
import { useState } from "react";
import ReportPageActions from "@/components/ReportPageActions";
import { Highlight } from "@/components/testimonial-data";
import { downloadReportPdf } from "@/lib/client-download-report";

type ReportDownloadThanksBannerProps = {
  userName: string;
  submissionId?: string;
  showDownloadButton?: boolean;
  align?: "center" | "left";
  showEarlyBirdBadge?: boolean;
  giftHref?: string | false;
  /** Short “Thanks {name}” — Bricolage + DM Sans (gouti landing fonts). */
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
          className="m-0 text-[clamp(1.85rem,4.5vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em] text-black"
          style={{
            fontFamily:
              'var(--font-bricolage), "Bricolage Grotesque", sans-serif',
          }}
        >
          You Actually Started, {firstName}.
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
        className={`mt-2.5 text-black sm:mt-3 ${
          shortThanks
            ? `text-[15px] leading-[1.55] sm:text-[17px] sm:leading-[1.6] md:text-[18px] ${
                isLeft ? "max-w-xl" : "mx-auto max-w-3xl"
              }`
            : `text-sm leading-relaxed sm:text-base ${
                isLeft ? "max-w-xl" : "mx-auto max-w-2xl"
              }`
        }`}
        style={{
          fontFamily: shortThanks
            ? "var(--font-dm-sans), system-ui, sans-serif"
            : "var(--font-garamond)",
        }}
      >
        {shortThanks ? (
          <>
            <p className="m-0 text-balance">
              Not &quot;thinking about it.&quot; Not &quot;next week.&quot; You
              did it.
            </p>
            {giftHref === false ? (
              <p className="m-0 mt-1.5 sm:mt-2">
                Your Personalized Creator Blueprint is ready below,
                <br />
                and we&apos;ve got a small gift for you too,{" "}
                <span className="whitespace-nowrap underline decoration-black underline-offset-[3px]">
                  <Highlight>check it out here...</Highlight>
                </span>
              </p>
            ) : giftHref ? (
              <p className="m-0 mt-1.5 sm:mt-2">
                Your Personalized Creator Blueprint is ready below,
                <br />
                and we&apos;ve got a small gift for you too,{" "}
                <Link
                  href={giftHref}
                  className="whitespace-nowrap underline decoration-black underline-offset-[3px]"
                >
                  <Highlight>check it out here...</Highlight>
                </Link>
              </p>
            ) : (
              <p className="m-0 mt-1.5 sm:mt-2">
                Your Personalized Creator Blueprint is ready below,
                <br />
                and we&apos;ve got a small gift for you too,{" "}
                <button
                  type="button"
                  onClick={handleTextDownload}
                  disabled={linkPhase === "loading"}
                  className="whitespace-nowrap font-normal text-black underline decoration-black underline-offset-[3px] disabled:cursor-wait"
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
          </>
        ) : (
          <>
            <p className="m-0 text-balance sm:whitespace-nowrap">
              Your Personalized Creator blueprint is ready…
            </p>
            {giftHref === false ? (
              <p className="m-0 text-balance sm:whitespace-nowrap">
                We&apos;ve also got a little gift for you,{" "}
                <span className="whitespace-nowrap underline decoration-black underline-offset-[3px]">
                  <Highlight>check it out here...</Highlight>
                </span>
              </p>
            ) : giftHref ? (
              <p className="m-0 text-balance sm:whitespace-nowrap">
                We&apos;ve also got a little gift for you,{" "}
                <Link
                  href={giftHref}
                  className="whitespace-nowrap underline decoration-black underline-offset-[3px]"
                >
                  <Highlight>check it out here...</Highlight>
                </Link>
              </p>
            ) : (
              <p className="m-0 text-balance sm:whitespace-nowrap">
                We&apos;ve also got a little gift for you,{" "}
                <button
                  type="button"
                  onClick={handleTextDownload}
                  disabled={linkPhase === "loading"}
                  className="whitespace-nowrap font-normal text-black underline decoration-black underline-offset-[3px] disabled:cursor-wait"
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
          </>
        )}
      </div>
      <div
        className={`mt-[30px] h-[0.5px] w-full max-w-xl sm:mt-[34px] ${isLeft ? "" : "mx-auto"}`}
        style={{
          background: isLeft
            ? "linear-gradient(to right, rgba(0,0,0,0.55), transparent)"
            : "linear-gradient(to right, transparent, rgba(0,0,0,0.55) 50%, transparent)",
        }}
        aria-hidden="true"
      />
      {showDownloadButton ? (
        <>
          <ReportPageActions
            userName={userName}
            submissionId={submissionId}
            feedbackAsPopup={feedbackAsPopup}
            className="mt-6 sm:mt-7"
          />
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
    </div>
  );
}
