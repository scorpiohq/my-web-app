import Link from "next/link";
import ReportScaleFrame from "@/components/ReportScaleFrame";
import {
  landingReportData,
  ReportTemplate,
} from "@/app/gouti/landing-report/page";

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

/** Hand-drawn-ish motion ticks (Stanley doodle) */
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

/** Simple flower doodle */
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
 * Youform / Stanley-inspired hero for /gouti/landing only.
 */
export default function GoutiYouformHero({
  ctaHref,
  blueprintsBuilt = 127,
}: {
  ctaHref: string;
  /** Live count — grows as people pay (same signal as pricing spots). */
  blueprintsBuilt?: number;
}) {
  const peopleCount = Math.max(0, Math.floor(blueprintsBuilt));

  return (
    <section id="hero" className="yf-hero relative">
      <div className="yf-hero__grain pointer-events-none absolute inset-0" aria-hidden />

      <BubbleIcon className="pointer-events-none absolute left-[2%] top-[72px] h-6 w-6 text-[#C4B8A8] sm:left-[3%] sm:top-[96px] sm:h-8 sm:w-8 md:left-[5%] md:top-[110px] md:h-9 md:w-9 lg:left-[9%] lg:top-[120px]" />
      <SparkleIcon className="pointer-events-none absolute right-[2%] top-[68px] h-6 w-6 text-[#C4B8A8] sm:right-[4%] sm:top-[88px] sm:h-8 sm:w-8 md:right-[6%] md:top-[100px] md:h-9 md:w-9 lg:right-[10%] lg:top-[108px]" />
      <MotionLinesIcon className="pointer-events-none absolute right-[3%] top-[168px] h-6 w-6 rotate-[-8deg] text-[#B5A48E] sm:right-[6%] sm:top-[200px] sm:h-8 sm:w-8 md:right-[8%] md:top-[220px] md:h-9 md:w-9 lg:right-[14%] lg:top-[240px]" />
      <FlowerIcon className="pointer-events-none absolute left-[3%] top-[210px] h-6 w-6 text-[#C4B8A8] sm:left-auto sm:right-[5%] sm:top-[340px] sm:h-8 sm:w-8 md:right-[7%] md:top-[360px] md:h-9 md:w-9 lg:right-[11%] lg:top-[380px]" />

      <div className="relative mx-auto w-full max-w-[1100px] px-3.5 pt-12 sm:px-8 sm:pt-14 md:pt-16">
        <div className="mx-auto flex w-full max-w-[980px] flex-col items-center text-center">
          <p className="mb-3.5 text-[10px] font-semibold tracking-[0.14em] text-[#3D5A45] sm:mb-5 sm:text-[12px] sm:tracking-[0.16em]">
            • YOUR PERSONALIZED BLUEPRINT
          </p>

          <h1 className="yf-hero__title m-0">
            <span className="yf-hero__title-line block whitespace-nowrap">
              You want to Start on Social Media,
            </span>
            <span className="yf-hero__title-line mt-[0.06em] block whitespace-nowrap">
              But you don&apos;t know{" "}
              <span className="yf-hero__how-to relative inline-block italic">
                how to...
                <span className="yf-hero__how-to-mark" aria-hidden />
              </span>
            </span>
          </h1>

          <p className="yf-hero__sub mt-5 max-w-[34rem] text-[15px] leading-[1.65] text-[#6B6B6B] text-balance sm:mt-6 sm:text-[17px] sm:leading-[1.7]">
            Answer 18 simple questions about you, and get a personalized
            Blueprint that tells you exactly where to start.
          </p>

          <div className="mt-7 flex w-full flex-col items-center gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:justify-center sm:gap-3">
            <Link
              href={ctaHref}
              className="btn-brutal btn-brutal-primary inline-flex min-h-[52px] min-w-[240px] items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black sm:min-h-[56px] sm:min-w-[280px] sm:px-10 sm:text-base"
            >
              Build my Blueprint →
            </Link>
          </div>

          <p
            className="mt-5 text-[14px] text-[#5A5A5A] sm:mt-5 sm:text-[15px]"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            {peopleCount.toLocaleString("en-US")} people already built their
            Blueprint.
          </p>
        </div>

        <div className="yf-hero__preview-wrap relative mx-auto mt-10 w-full max-w-[920px] px-0 sm:mt-12 sm:px-2 md:max-w-[980px]">
          <p className="mb-4 flex items-center justify-center gap-2 text-[14px] text-[#5A5A5A] sm:mb-5 sm:gap-2.5 sm:text-[15px]">
            <span style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}>
              A real Blueprint. Go ahead, peek.
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/arrow.svg"
              alt=""
              width={24}
              height={30}
              className="h-7 w-auto shrink-0 -rotate-180 text-[#5A5A5A] sm:h-8"
              aria-hidden
            />
          </p>

          <div className="yf-hero__preview relative overflow-hidden rounded-[18px] border border-[#E8E8E8] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 border-b border-[#ECECEC] bg-white px-3.5 py-2.5 sm:px-4">
              <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8E8]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8E8]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E8E8E8]" />
              </span>
            </div>

            <ReportScaleFrame designWidth={2214} designHeight={3365}>
              <ReportTemplate data={landingReportData} exportMode />
            </ReportScaleFrame>
          </div>

          <div className="mx-auto mt-6 max-w-[28rem] text-center sm:mt-7">
            <p
              className="text-[15px] leading-[1.6] text-[#5A5A5A] sm:text-[16px]"
              style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
            >
              Every detail here is built for Marcus, from his own answers.
            </p>
            <p
              className="mt-1.5 text-[15px] leading-[1.6] text-[#5A5A5A] sm:text-[16px]"
              style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
            >
              Yours will be built the same way. From yours.
            </p>

            <Link
              href={ctaHref}
              className="btn-brutal btn-brutal-primary mt-6 inline-flex min-h-[52px] min-w-[240px] items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black sm:mt-7 sm:min-h-[56px] sm:min-w-[280px] sm:px-10 sm:text-base"
            >
              Let&apos;s Build Your Blueprint →
            </Link>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/inline-review.svg"
            alt="Review from @creatorandy"
            width={453}
            height={146}
            className="mx-auto mt-10 h-auto w-full max-w-[720px] sm:mt-12"
          />
        </div>
      </div>
    </section>
  );
}
