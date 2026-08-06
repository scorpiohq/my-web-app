import Link from "next/link";

function ReceiptScallop() {
  return (
    <svg
      viewBox="0 0 320 12"
      className="block w-full text-white"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,0 H320 V12 L310,0 L300,12 L290,0 L280,12 L270,0 L260,12 L250,0 L240,12 L230,0 L220,12 L210,0 L200,12 L190,0 L180,12 L170,0 L160,12 L150,0 L140,12 L130,0 L120,12 L110,0 L100,12 L90,0 L80,12 L70,0 L60,12 L50,0 L40,12 L30,0 L20,12 L10,0 L0,12 Z"
        fill="currentColor"
        stroke="#000"
        strokeWidth="1"
      />
    </svg>
  );
}

function FeaturePill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#333] sm:text-sm">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-black bg-[#FFC940] text-[10px] font-bold text-black sm:h-5 sm:w-5 sm:text-xs">
        ✓
      </span>
      {children}
    </span>
  );
}

export default function FinalOffer() {
  return (
    <section className="grid-bg px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-8 md:flex-row md:items-center md:gap-10 lg:gap-14">
        <div className="w-full max-w-[280px] shrink-0 sm:max-w-[300px] md:max-w-[260px]">
          <div className="-rotate-2 border-2 border-black bg-white shadow-[6px_6px_0_0_#000] md:-rotate-3 md:shadow-[8px_8px_0_0_#000]">
            <div className="px-5 pb-4 pt-5 sm:px-6 md:px-5 md:pb-4 md:pt-5">
              <p
                className="text-base tracking-wide text-black sm:text-lg md:text-lg"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                YOUR BLUEPRINT
              </p>
              <p className="mt-1 text-[9px] font-medium tracking-[0.1em] text-[#999] sm:text-[10px]">
                ORDER RECEIPT - #HSP-204821
              </p>

              <div className="my-4 border-t border-dashed border-black/25 md:my-4" />

              <div className="flex items-center justify-between gap-2">
                <p className="whitespace-nowrap text-xs font-medium leading-none text-black sm:text-sm">
                  x1 Personalized Blueprint
                </p>
                <p className="shrink-0 whitespace-nowrap text-xs font-medium leading-none text-black sm:text-sm">
                  $24.00
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-[#555] sm:text-sm">Tax</p>
                <p className="text-xs text-[#555] sm:text-sm">$0.00</p>
              </div>

              <div className="my-4 border-t border-dashed border-black/25" />

              <div className="flex items-end justify-between gap-2">
                <p
                  className="text-base text-black md:text-base"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  TOTAL
                </p>
                <p
                  className="text-3xl leading-none text-black sm:text-4xl"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  $24.00
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center gap-1 border border-black bg-white px-3 py-1 text-[10px] font-semibold tracking-wide text-black shadow-[2px_2px_0_0_#000] sm:text-[11px]">
                  <span className="text-[#2E7D32]">✓</span> PAID IN FULL
                </span>
              </div>

              <p className="mt-3 whitespace-nowrap text-center text-[7px] font-medium tracking-[0.06em] text-[#999] sm:text-[8px] md:text-[5.5px]">
                NO SUBSCRIPTION • NOTHING RECURRING
              </p>
            </div>
            <ReceiptScallop />
          </div>
        </div>

        <div className="w-full max-w-md shrink-0 text-center md:max-w-lg md:text-left">
          <span className="mb-3 inline-block border border-black bg-[#E5C4A1] px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-black shadow-[2px_2px_0_0_#000] sm:mb-4 sm:px-3 sm:py-1.5 sm:text-[10px]">
            A SIMPLE PRICING
          </span>

          <h2 className="text-xl font-bold leading-snug tracking-tight text-black sm:text-2xl sm:leading-tight lg:text-[clamp(1.75rem,3vw,2.5rem)]">
            Start your Social Media journey
            <br />
            with clarity, not confusion.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B] sm:mt-5 sm:text-base lg:text-lg">
            Answer 18 questions and get your personalized blueprint built around
            your goals, interests, strengths, and starting point – so you know
            exactly where to Start.
          </p>

          <div className="mt-5 flex flex-col items-center gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-2 md:justify-start">
            <FeaturePill>One-time payment</FeaturePill>
            <FeaturePill>Lifetime Access</FeaturePill>
            <FeaturePill>Instant Downloadable</FeaturePill>
          </div>

          <Link
            href="/form"
            className="btn-brutal btn-brutal-primary mt-6 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-black sm:mt-8 sm:px-8 sm:py-4"
          >
            Get your Blueprint
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
