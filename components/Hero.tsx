import Link from "next/link";
import { Highlight } from "@/components/testimonial-data";
import HeroReportPreview from "@/components/HeroReportPreview";
import HeroSamplePreviewTrigger from "@/components/HeroSamplePreviewTrigger";

export default function Hero({
  spotsRemaining = 19,
}: {
  spotsRemaining?: number;
}) {
  return (
    <section id="hero" className="grid-bg px-6 pt-12 pb-0 sm:px-8 sm:pt-16 lg:pt-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
        {/* Copy — centered on mobile, left on desktop */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-6 inline-flex items-center gap-2 border border-black bg-[#F6E9D8] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-8 sm:text-xs">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0"
            >
              <circle
                cx="9"
                cy="8"
                r="2.6"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle
                cx="16"
                cy="9"
                r="2.2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M3.8 18.5c.6-2.8 2.6-4.3 5.2-4.3s4.6 1.5 5.2 4.3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M14.2 14.8c1.5-.5 3-.3 4.2.7.8.7 1.3 1.7 1.5 2.9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            {spotsRemaining} OF 100 SPOTS REMAINING
          </span>

          <h1
            className="mb-5 text-[clamp(1.5rem,4.5vw,3rem)] leading-[0.95] tracking-wide text-black sm:mb-6"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            <span className="block">Starting your social media</span>
            <span className="block">journey, just got easier.</span>
          </h1>

          <p className="mb-7 w-full max-w-xl text-[14px] leading-relaxed text-[#6B6B6B] sm:mb-8 sm:max-w-2xl sm:text-lg lg:max-w-none">
            Answer 18 simple questions and get a personalized Blueprint —
            built around your goals, your interests, and your situation,
            so you know exactly where to start.
          </p>

          <HeroSamplePreviewTrigger />

          <Link
            href="/#pricing"
            className="btn-brutal btn-brutal-primary inline-block min-w-[180px] px-8 py-3.5 text-sm font-semibold text-black"
          >
            Get your Blueprint →
          </Link>

          <figure className="mt-8 w-full max-w-md text-center sm:mt-10">
            <blockquote className="mb-4 text-sm leading-relaxed text-[#333] sm:text-[15px]">
              &ldquo;Just amazing!{" "}
              <Highlight>
                Simple, valuable, and exactly what I needed atm.
              </Highlight>
              &rdquo;
            </blockquote>
            <figcaption className="text-center text-sm font-normal text-[#555] sm:text-base lg:text-left">
              —Ady, Texas, United States
            </figcaption>
          </figure>
        </div>

        {/* Preview frame — desktop only */}
        <div className="relative hidden w-full justify-end lg:-translate-x-[88px] lg:flex">
          <div className="relative">
            <div
              className="pointer-events-none absolute bottom-[18%] left-0 z-10 flex -translate-x-[calc(95%+36px)] flex-col items-center"
              aria-hidden="true"
            >
              <img
                src="/arrow-vector.svg"
                alt=""
                width={46}
                height={29}
                className="mb-1 h-auto w-12 translate-x-12 -translate-y-2 rotate-[-8deg]"
              />
              <p
                className="whitespace-nowrap text-sm text-[#072333] sm:text-base"
                style={{ fontFamily: "var(--font-fuzzy)" }}
              >
                this is what you&apos;ll get
              </p>
            </div>
            <HeroReportPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
