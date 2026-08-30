import Link from "next/link";
import { Highlight } from "@/components/testimonial-data";
import HeroReportPreview from "@/components/HeroReportPreview";
import HeroSamplePreviewTrigger from "@/components/HeroSamplePreviewTrigger";

export default function Hero({
  spotsRemaining: _spotsRemaining = 12,
}: {
  spotsRemaining?: number;
} = {}) {
  return (
    <section id="hero" className="grid-bg px-6 pt-12 pb-0 sm:px-8 sm:pt-16 lg:pt-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
        {/* Copy — centered on mobile, left on desktop */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1
            className="mb-5 text-[clamp(1.5rem,4.5vw,3rem)] leading-[0.95] tracking-wide text-black sm:mb-6"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            <span className="block">Starting on social media</span>
            <span className="block">just got easier.</span>
          </h1>

          <p className="mb-7 w-full max-w-[22rem] text-[14px] leading-relaxed text-[#6B6B6B] text-balance sm:mb-8 sm:max-w-xl sm:text-lg lg:max-w-none lg:text-pretty">
            Answer 18 simple questions about you, and get a personalized Blueprint that tells you exactly where to start.
          </p>

          <HeroSamplePreviewTrigger />

          <Link
            href="/#pricing"
            className="btn-brutal btn-brutal-primary inline-block min-w-[180px] px-8 py-3.5 text-sm font-bold tracking-wide text-black"
          >
            GET YOUR BLUEPRINT →
          </Link>

          <figure className="mt-8 w-full max-w-sm text-center sm:mt-10 sm:max-w-md lg:max-w-md lg:text-left">
            <blockquote className="mb-3 text-sm leading-relaxed text-[#333] sm:text-[15px]">
              <span className="block">
                &ldquo;I&apos;ve been &lsquo;thinking about starting&rsquo; for like 2 years.
              </span>
              <span className="block">
                <Highlight>
                  this actually made it feel doable.
                </Highlight>
                &rdquo;
              </span>
            </blockquote>
            <figcaption className="text-sm font-normal text-[#555] sm:text-base">
              —Sam, Sydney, Australia
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
