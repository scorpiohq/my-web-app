"use client";

import Link from "next/link";
import { useState } from "react";
import { Highlight } from "@/components/testimonial-data";
import { downloadReportPdf } from "@/lib/client-download-report";

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
    >
      <path d="M12 2.5v4.5M12 17v4.5M2.5 12H7M17 12h4.5M5.2 5.2l3.2 3.2M15.6 15.6l3.2 3.2M18.8 5.2l-3.2 3.2M8.4 15.6l-3.2 3.2" />
    </svg>
  );
}

function BubbleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
    >
      <path d="M6.5 16.5 4 20l4.2-1.2A8 8 0 1 0 6.5 16.5Z" />
    </svg>
  );
}

function MotionLinesIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M8 6.5 18.5 4" />
      <path d="M7 14 19 12.5" />
      <path d="M8.5 21.5 19.5 19" />
    </svg>
  );
}

function FlowerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      aria-hidden
    >
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 4.5c1.8 2.2 1.8 4.4 0 6.2-1.8-1.8-1.8-4 0-6.2Z" />
      <path d="M12 13.3c1.8 2.2 1.8 4.4 0 6.2-1.8-1.8-1.8-4 0-6.2Z" />
      <path d="M4.5 12c2.2-1.8 4.4-1.8 6.2 0-1.8 1.8-4 1.8-6.2 0Z" />
      <path d="M13.3 12c2.2-1.8 4.4-1.8 6.2 0-1.8 1.8-4 1.8-6.2 0Z" />
    </svg>
  );
}

/**
 * Hero-styled “you started” intro for /gouti/report-preview.
 * Same landing hero aesthetics; keeps the ready-page copy + gift link.
 */
export default function ReportReadyHero({
  userName,
  submissionId,
  giftHref,
}: {
  userName: string;
  submissionId?: string;
  giftHref?: string | false;
}) {
  const firstName = userName.trim().split(/\s+/)[0] || "there";
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

  const giftLabel =
    linkPhase === "loading" ? (
      "preparing your pdf…"
    ) : linkPhase === "error" ? (
      "try download again"
    ) : (
      <Highlight>check it out here...</Highlight>
    );

  const giftClassName =
    "whitespace-nowrap underline decoration-black underline-offset-[3px]";

  return (
    <section className="relative overflow-hidden pb-2 pt-10 sm:pb-3 sm:pt-12 md:pt-14">
      <BubbleIcon className="pointer-events-none absolute left-[2%] top-[56px] h-6 w-6 text-[#C4B8A8] sm:left-[4%] sm:top-[72px] sm:h-8 sm:w-8 md:left-[7%] md:top-[80px] md:h-9 md:w-9" />
      <SparkleIcon className="pointer-events-none absolute right-[2%] top-[52px] h-6 w-6 text-[#C4B8A8] sm:right-[4%] sm:top-[68px] sm:h-8 sm:w-8 md:right-[7%] md:top-[76px] md:h-9 md:w-9" />
      <MotionLinesIcon className="pointer-events-none absolute right-[4%] top-[140px] hidden h-7 w-7 rotate-[-8deg] text-[#B5A48E] sm:block sm:right-[6%] sm:top-[160px] sm:h-8 sm:w-8 md:right-[10%] md:top-[180px]" />
      <FlowerIcon className="pointer-events-none absolute left-[4%] top-[160px] hidden h-7 w-7 text-[#C4B8A8] sm:block sm:left-[6%] sm:top-[180px] sm:h-8 sm:w-8 md:left-[9%] md:top-[200px]" />

      <div className="relative mx-auto flex w-full max-w-[980px] flex-col items-center px-3.5 text-center sm:px-8">
        <p
          className="mb-3.5 text-[10px] font-semibold tracking-[0.14em] text-[#3D5A45] sm:mb-5 sm:text-[12px] sm:tracking-[0.16em]"
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          }}
        >
          • THANKS YOU!
        </p>

        <h1
          className="m-0 whitespace-nowrap text-[clamp(1.35rem,calc((100vw-1.75rem)/16.8),3.4rem)] font-bold leading-[1.08] tracking-[-0.025em] text-[#252720]"
          style={{
            fontFamily:
              'var(--font-bricolage), "Bricolage Grotesque", sans-serif',
          }}
        >
          You Actually Started,{" "}
          <span
            className="relative inline-block px-[0.06em] pb-[0.08em] italic"
            style={{
              fontFamily:
                'var(--font-garamond), Georgia, "Times New Roman", serif',
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {firstName}
            <span
              className="pointer-events-none absolute inset-x-[-0.08em] bottom-[0.06em] -z-10 h-[0.38em] rounded-[0.12em] bg-[#f2c94c]"
              style={{ transform: "rotate(-1.2deg)" }}
              aria-hidden
            />
          </span>
          .
        </h1>

        <div
          className="mt-[10px] max-w-[34rem] text-[15px] leading-[1.65] text-[#6B6B6B] text-balance sm:text-[17px] sm:leading-[1.7]"
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          }}
        >
          <p className="m-0">
            Your Personalized Creator Blueprint is ready below,
            <br />
            and we&apos;ve got a small gift for you too,{" "}
            {giftHref === false ? (
              <span className={giftClassName}>{giftLabel}</span>
            ) : giftHref ? (
              <Link href={giftHref} className={giftClassName}>
                <Highlight>check it out here...</Highlight>
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleTextDownload}
                disabled={linkPhase === "loading"}
                className={`${giftClassName} font-normal text-[#6B6B6B] disabled:cursor-wait`}
              >
                {giftLabel}
              </button>
            )}
          </p>
        </div>

        <p className="mt-8 mb-1.5 flex items-center justify-center gap-1.5 text-[15px] leading-none text-[#5A5A5A] sm:mt-10 sm:mb-2 sm:gap-2 sm:text-[16px] md:text-[17px]">
          <span
            style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
          >
            Your Blueprint. Go ahead, Scroll.
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/arrow.svg"
            alt=""
            width={24}
            height={30}
            className="h-6 w-auto shrink-0 -rotate-180 text-[#5A5A5A] sm:h-7"
            aria-hidden
          />
        </p>
      </div>
    </section>
  );
}
