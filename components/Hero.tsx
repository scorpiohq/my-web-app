import Link from "next/link";
import { Highlight } from "@/components/testimonial-data";
import HeroSamplePreviewTrigger from "@/components/HeroSamplePreviewTrigger";

export default function Hero({
  spotsRemaining: _spotsRemaining = 12,
}: {
  spotsRemaining?: number;
} = {}) {
  return (
    <section id="hero" className="grid-bg px-6 pt-12 pb-10 sm:px-8 sm:pt-16 lg:pt-16 lg:pb-12">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] lg:gap-6 xl:gap-8">
        {/* Copy — centered on mobile, left on desktop */}
        <div className="flex flex-col items-center text-center lg:translate-x-10 lg:translate-y-[60px] lg:items-start lg:pt-3 lg:text-left xl:translate-x-12">
          <h1
            className="mb-5 text-[clamp(1.5rem,4.5vw,3rem)] leading-[0.95] tracking-wide text-black sm:mb-6"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            <span className="block">Starting on social media</span>
            <span className="block">just got easier.</span>
          </h1>

          <p className="mb-7 w-full max-w-[22rem] text-[14px] leading-relaxed text-[#6B6B6B] text-balance sm:mb-8 sm:max-w-xl sm:text-lg lg:max-w-xl lg:text-pretty">
            Answer 18 simple questions about you, and get a personalized Blueprint that tells you exactly where to start.
          </p>

          <HeroSamplePreviewTrigger />

          <Link
            href="/#pricing"
            className="btn-brutal btn-brutal-primary inline-block min-w-[180px] px-8 py-3.5 text-sm font-bold tracking-wide text-black"
          >
            GET YOUR BLUEPRINT →
          </Link>

          <figure className="mt-7 w-full max-w-sm text-center sm:mt-8 sm:max-w-md lg:text-left">
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

        {/* Preview — desktop only */}
        <div className="relative hidden w-full lg:block">
          <div className="relative mx-auto w-full max-w-[300px] -translate-x-5 -translate-y-4 xl:max-w-[320px] xl:-translate-x-6 xl:-translate-y-5">
            <div
              className="pointer-events-none absolute top-[38%] right-full z-10 mr-2 flex translate-y-12 flex-col items-center"
              aria-hidden="true"
            >
              <img
                src="/arrow-vector.svg"
                alt=""
                width={46}
                height={29}
                className="mb-1 h-auto w-11 translate-x-3 -translate-y-1 rotate-[-8deg]"
              />
              <p
                className="whitespace-nowrap text-sm text-[#072333]"
                style={{ fontFamily: "var(--font-fuzzy)" }}
              >
                yours will look like this
              </p>
            </div>

            <img
              src="/sticker-report.svg?v=2"
              alt="Personalized Creator Blueprint preview"
              width={2456}
              height={3983}
              className="relative z-0 h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
