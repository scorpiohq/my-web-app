"use client";

import type { ReactNode } from "react";
import Link from "next/link";

const defaultFeatures = [
  "One Personalized Report",
  "Instant PDF Download",
  "Lifetime Access",
  "Ready in Under 3 Minutes",
];

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black bg-[#FFC940] text-xs font-bold text-black"
      aria-hidden="true"
    >
      ✓
    </span>
  );
}

type PricingProps = {
  originalPrice?: string;
  salePrice?: string;
  offerBadge?: string;
  buttonLabel?: string;
  spotsRemaining?: number;
  showIntro?: boolean;
  features?: string[];
  checkoutButton?: ReactNode;
  showInstantPdfRow?: boolean;
};

export default function Pricing({
  originalPrice = "$18",
  salePrice = "$9",
  offerBadge = "PRICING",
  buttonLabel = "GET YOUR BLUEPRINT →",
  spotsRemaining: _spotsRemaining,
  showIntro = true,
  features = defaultFeatures,
  checkoutButton,
  showInstantPdfRow = true,
}: PricingProps) {
  return (
    <section id="pricing" className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {showIntro ? (
          <>
            <span className="mb-6 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-7 sm:text-xs">
              PRICING
            </span>

            <h2
              className="mb-2 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black sm:mb-2.5"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              <span className="inline-block">GO AHEAD.</span>{" "}
              <span className="inline-block">GET YOUR BLUEPRINT.</span>
            </h2>

            <p className="mb-10 max-w-xl text-base leading-relaxed text-[#6B6B6B] sm:mb-12 sm:text-lg">
              Answer 18 simple questions and get a Blueprint built around you
            </p>
          </>
        ) : null}

        <div className="w-full border-2 border-black bg-white shadow-[8px_8px_0_0_#000]">
          {/* Main layout (stacked on mobile, 2-column on lg) */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Header: Badge + Title */}
            <div className="p-6 text-left sm:p-8 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:p-9 lg:pb-4">
              <div className="flex flex-wrap items-center gap-2">
                {offerBadge ? (
                  <span className="inline-block border border-black bg-[#E5C4A1] px-3 py-1 text-xs font-semibold tracking-wide text-black shadow-[2px_2px_0_0_#000]">
                    {offerBadge}
                  </span>
                ) : null}
              </div>

              <h3
                className="mt-4 text-[clamp(1.75rem,3.5vw,2.25rem)] font-bold leading-tight tracking-wide text-black"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                YOUR BLUEPRINT
              </h3>
            </div>

            {/* What's Included (shows 2nd on mobile, right column on desktop) */}
            <div className="flex flex-col justify-start border-t border-black/10 bg-white p-6 text-left sm:p-8 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:border-l lg:border-t-0 lg:p-9">
              <div className="mb-4 flex items-center gap-2.5 sm:mb-5">
                <span className="h-px w-5 bg-black" aria-hidden="true" />
                <p className="text-[11px] font-semibold tracking-[0.16em] text-black sm:text-xs">
                  WHAT&apos;S INCLUDED
                </p>
              </div>

              <ul className="space-y-3.5 text-left">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-xs sm:text-sm text-[#333] leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}

                {showInstantPdfRow ? (
                  <>
                    <li className="list-none pt-1" aria-hidden="true">
                      <div className="h-px w-full bg-[#E5E5E5]" />
                    </li>
                    <li className="flex items-start justify-between gap-2">
                      <span className="flex min-w-0 items-start gap-2.5">
                        <CheckIcon />
                        <span className="text-xs sm:text-sm text-[#333] leading-snug">
                          Early Bird Gift 🎁
                        </span>
                      </span>
                      <span className="flex shrink-0 items-baseline gap-1.5 pt-0.5 font-sans">
                        <span className="text-xs sm:text-sm font-bold text-black">
                          Free
                        </span>
                        <span className="text-xs sm:text-sm font-normal text-[#888] line-through">
                          $9
                        </span>
                      </span>
                    </li>
                  </>
                ) : null}
              </ul>
            </div>

            {/* Price + CTA + Guarantee
                Mobile: price/button → guarantee
                Desktop: guarantee → price/button */}
            <div className="flex flex-col border-t border-black/10 p-6 text-left sm:p-8 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:justify-between lg:border-t-0 lg:p-9 lg:pt-2">
              <div className="order-2 mt-5 flex items-start gap-3 border border-black/15 bg-[#F9F9F9] p-3.5 text-left shadow-[2px_2px_0_0_rgba(0,0,0,0.04)] sm:mt-6 sm:p-4 lg:order-1 lg:mt-0 lg:mb-6">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-[#22C55E]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-[#555]">
                  <strong className="font-semibold text-black">
                    Money-back guarantee.
                  </strong>{" "}
                  If your Blueprint doesn&apos;t give you a clear next step, email us within 7 days for a full refund.
                </p>
              </div>

              <div className="order-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 lg:order-2">
                <div className="shrink-0">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {originalPrice ? (
                      <p
                        className="text-[44px] sm:text-[52px] leading-none text-[#999] line-through decoration-2"
                        style={{ fontFamily: "var(--font-hero)" }}
                      >
                        {originalPrice}
                      </p>
                    ) : null}
                    <p
                      className="text-[44px] sm:text-[52px] leading-none text-black"
                      style={{ fontFamily: "var(--font-hero)" }}
                    >
                      {salePrice}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-[#6B6B6B]">
                    One-Time Purchase
                  </p>
                </div>

                <div className="w-full sm:w-auto sm:min-w-[240px]">
                  {checkoutButton ?? (
                    <Link
                      href="/form"
                      className="btn-brutal btn-brutal-primary inline-flex w-full items-center justify-center px-7 py-4 text-base font-bold tracking-wide text-black text-center sm:px-8 sm:py-4.5 sm:text-lg"
                    >
                      {buttonLabel}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
