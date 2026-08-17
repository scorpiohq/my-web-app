"use client";

import Link from "next/link";
import { useState } from "react";
import ReportDownloadButton from "@/components/ReportDownloadButton";
import { Highlight } from "@/components/testimonial-data";
import { downloadReportPdf } from "@/lib/client-download-report";

type ReportDownloadThanksBannerProps = {
  userName: string;
  submissionId?: string;
  showDownloadButton?: boolean;
  align?: "center" | "left";
  showEarlyBirdBadge?: boolean;
  giftHref?: string | false;
};

export default function ReportDownloadThanksBanner({
  userName,
  submissionId,
  showDownloadButton = true,
  align = "center",
  showEarlyBirdBadge = false,
  giftHref,
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
      <p
        className="m-0 text-[28px] font-normal italic leading-[1.2] sm:text-[36px]"
        style={{ fontFamily: "var(--font-garamond)" }}
      >
        <span className="block">Thanks {firstName} for</span>
        <span className="block">letting us be part of your journey..</span>
      </p>
      <p
        className={`mt-2 max-w-xl text-sm leading-relaxed text-black sm:text-base ${
          isLeft ? "" : "mx-auto"
        }`}
        style={{ fontFamily: "var(--font-garamond)" }}
      >
        Your personalized blueprint is ready. We&apos;ve also got a little gift
        for you,{" "}
        {giftHref === false ? (
          <Highlight>download it here</Highlight>
        ) : giftHref ? (
          <Link href={giftHref} className="underline underline-offset-2">
            <Highlight>download it here</Highlight>
          </Link>
        ) : (
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
              <Highlight>download it here</Highlight>
            )}
          </button>
        )}
        .
      </p>
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
          <div className="mt-6 flex justify-center sm:mt-7">
            <ReportDownloadButton
              userName={userName}
              submissionId={submissionId}
              size="large"
            />
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
    </div>
  );
}
