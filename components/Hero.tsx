import Link from "next/link";
import { Highlight } from "@/components/testimonial-data";
import HeroReportPreview from "@/components/HeroReportPreview";
import HeroSamplePreviewTrigger from "@/components/HeroSamplePreviewTrigger";

export default function Hero() {
  return (
    <section className="grid-bg px-6 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
        {/* Copy — centered on mobile, left on desktop */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-6 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-8 sm:text-xs">
            ✰ CLAIM YOUR EARLY BIRD DISCOUNT!
          </span>

          <h1
            className="mb-5 max-w-none text-[clamp(1.5rem,4.5vw,3rem)] leading-[0.95] tracking-wide text-black sm:mb-6"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            <span className="block whitespace-nowrap">Your Blueprint to Start,</span>
            <span className="block whitespace-nowrap">
              your Social Media Journey..
            </span>
          </h1>

          <p className="mb-7 max-w-md text-base leading-relaxed text-[#6B6B6B] sm:mb-8 sm:text-lg lg:max-w-lg">
            Start your journey, the way you want,
            <br />
            with what you have, from where you are.
          </p>

          <HeroSamplePreviewTrigger />

          <Link
            href="/form"
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
