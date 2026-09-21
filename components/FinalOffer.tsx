import Link from "next/link";
import { Reveal } from "@/components/gouti/Reveal";

function FeaturePill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-base font-medium text-[#222] sm:text-[17px] lg:text-lg">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black bg-[#FFC940] text-xs font-bold text-black shadow-[1px_1px_0_0_#000] sm:h-6 sm:w-6 sm:text-sm">
        ✓
      </span>
      {children}
    </span>
  );
}

export default function FinalOffer({
  ctaHref = "/form",
  /** `centered` = no report preview, all copy centered (gouti landing). */
  layout = "default",
}: {
  ctaHref?: string;
  layout?: "default" | "centered";
}) {
  const centered = layout === "centered";

  return (
    <section id="final-offer" className="grid-bg px-4 py-14 sm:px-8 sm:py-20">
      <div
        className={
          centered
            ? "mx-auto flex w-full max-w-[1100px] flex-col items-center text-center"
            : "mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-10 lg:gap-12"
        }
      >
        {!centered ? (
          <Reveal delayMs={40}>
            <div className="mx-auto w-full max-w-[250px] sm:max-w-[280px] md:mx-0 md:max-w-[310px] md:translate-x-5 lg:max-w-[330px] lg:translate-x-6">
              <img
                src="/sticker-report.png"
                alt="Personalized Creator Blueprint"
                width={800}
                height={1297}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-contain"
              />
            </div>
          </Reveal>
        ) : null}

        <Reveal delayMs={centered ? 0 : 100}>
          <div
            className={
              centered
                ? "mx-auto flex w-full max-w-[980px] flex-col items-center text-center"
                : "mx-auto w-full text-center md:mx-0 md:w-max md:max-w-full md:translate-y-2 md:-translate-x-2 md:text-left lg:-translate-x-3"
            }
          >
            <h2
              className={
                centered
                  ? "final-offer-title m-0 text-[clamp(1.65rem,4.2vw,2.55rem)] font-bold leading-[1.12] tracking-[-0.02em] text-black"
                  : "final-offer-title text-[clamp(1.85rem,3.8vw,3.1rem)] font-bold leading-[1.15] tracking-tight text-black md:whitespace-nowrap"
              }
            >
              Start with clarity, not confusion.
            </h2>

            {centered ? (
              <>
                <p className="final-offer-sub mt-5 max-w-[34rem] text-[15px] leading-[1.65] text-[#6B6B6B] text-balance sm:mt-6 sm:text-[17px] sm:leading-[1.7]">
                  Answer 18 simple questions about you, and get a personalized
                  Blueprint that tells you exactly where to start.
                </p>

                <div className="final-offer-pills mt-7 flex w-full flex-col items-center gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6">
                  <FeaturePill>One-time payment</FeaturePill>
                  <FeaturePill>Lifetime Access</FeaturePill>
                  <FeaturePill>Money-back guarantee</FeaturePill>
                </div>

                <div className="mt-7 sm:mt-9">
                  <Link
                    href={ctaHref}
                    className="btn-brutal btn-brutal-primary inline-flex min-w-[240px] items-center justify-center gap-2 px-10 py-4.5 text-lg font-bold tracking-wide text-black sm:min-w-[280px] sm:px-12 sm:py-5 sm:text-xl"
                  >
                    Build my Blueprint →
                  </Link>
                </div>
              </>
            ) : (
              <div className="mt-4 sm:mt-5 md:w-0 md:min-w-full">
                <p className="final-offer-sub mt-4 text-[17px] leading-relaxed text-[#555] sm:mt-5 sm:text-lg md:text-[19px] lg:text-xl">
                  Answer 18 simple questions about you, and get a personalized
                  Blueprint that tells you exactly where to start.
                </p>

                <div className="final-offer-pills mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 md:justify-start">
                  <FeaturePill>One-time payment</FeaturePill>
                  <FeaturePill>Lifetime Access</FeaturePill>
                  <FeaturePill>Money-back guarantee</FeaturePill>
                </div>

                <div className="mt-7 sm:mt-9">
                  <Link
                    href={ctaHref}
                    className="btn-brutal btn-brutal-primary inline-flex min-w-[240px] items-center justify-center gap-2 px-10 py-4.5 text-lg font-bold tracking-wide text-black sm:min-w-[280px] sm:px-12 sm:py-5 sm:text-xl"
                  >
                    Build my Blueprint →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
