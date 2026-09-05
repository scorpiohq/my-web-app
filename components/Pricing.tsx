"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { TOTAL_BLUEPRINT_SPOTS } from "@/lib/spots";

const defaultFeatures = [
  "Your Personalized Blueprint",
  "Download It Instantly",
  "Lifetime Access",
  "7-Day Money-Back Guarantee",
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
  planLabel?: string;
  priceNote?: string;
  purchasePill?: string;
  scarcityNote?: string;
  buttonLabel?: string;
  spotsRemaining?: number;
  totalSpots?: number;
  showIntro?: boolean;
  features?: string[];
  checkoutButton?: ReactNode;
  showInstantPdfRow?: boolean;
  showMoneyBack?: boolean;
};

export default function Pricing({
  originalPrice = "$18",
  salePrice = "$9",
  offerBadge = "LIMITED OFFER",
  planLabel = "YOUR BLUEPRINT",
  priceNote = "USD",
  purchasePill = "One Time Payment",
  scarcityNote = "Special launch price, going up once these spots are gone.",
  buttonLabel = "GET YOUR BLUEPRINT →",
  spotsRemaining,
  totalSpots = TOTAL_BLUEPRINT_SPOTS,
  showIntro = true,
  features = defaultFeatures,
  checkoutButton,
  showInstantPdfRow = false,
  showMoneyBack = true,
}: PricingProps) {
  const hasSpots =
    typeof spotsRemaining === "number" && Number.isFinite(spotsRemaining);
  const remaining = hasSpots
    ? Math.max(0, Math.min(totalSpots, spotsRemaining))
    : null;
  const fillPercent =
    remaining != null && totalSpots > 0
      ? Math.max(4, Math.min(100, (remaining / totalSpots) * 100))
      : 0;

  return (
    <section id="pricing" className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {showIntro ? (
          <>
            <span className="mb-6 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-7 sm:text-xs">
              PRICING
            </span>

            <h2
              className="mb-10 max-w-none whitespace-nowrap text-[clamp(1.5rem,4.2vw,3.25rem)] font-bold leading-tight tracking-wide text-black sm:mb-12"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              Your first step. Right here.
            </h2>
          </>
        ) : null}

        <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
          {offerBadge ? (
            <span className="absolute -top-3 right-4 z-10 inline-block border border-black bg-[#FFC940] px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-black shadow-[3px_3px_0_0_#000] sm:right-5 sm:text-[11px]">
              {offerBadge}
            </span>
          ) : null}

          <div className="border-2 border-black bg-white p-6 text-left shadow-[8px_8px_0_0_#000] sm:p-8 lg:p-10">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#6B6B6B] sm:text-xs">
              {planLabel}
            </p>

            <div className="mt-4 flex flex-wrap items-end gap-x-2.5 gap-y-1 sm:mt-5">
              {originalPrice ? (
                <span
                  className="text-[2.75rem] leading-none text-[#999] line-through decoration-2 sm:text-[3.25rem] lg:text-[3.5rem]"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {originalPrice}
                </span>
              ) : null}
              <span
                className="text-[3rem] leading-none text-black sm:text-[3.5rem] lg:text-[3.75rem]"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                {salePrice}
              </span>
              <span className="mb-1.5 text-sm text-[#6B6B6B] sm:text-base">
                {priceNote}
              </span>
            </div>

            <p className="mt-2 text-sm text-[#6B6B6B] sm:text-[15px]">
              {purchasePill}
            </p>

            {remaining != null ? (
              <div className="mt-6 sm:mt-7">
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 border border-black bg-[#FFC940] px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-black shadow-[2px_2px_0_0_#000]">
                    <span
                      className="h-1.5 w-1.5 bg-black"
                      aria-hidden="true"
                    />
                    LIMITED
                  </span>
                  <p className="text-sm text-[#6B6B6B]">
                    <span className="font-bold text-black">{remaining}</span>
                    {" / "}
                    {totalSpots}
                  </p>
                </div>

                <div
                  className="h-2.5 overflow-hidden border border-black bg-white"
                  role="progressbar"
                  aria-valuenow={remaining}
                  aria-valuemin={0}
                  aria-valuemax={totalSpots}
                  aria-label={`${remaining} of ${totalSpots} spots claimed`}
                >
                  <div
                    className="h-full bg-[#FFC940] transition-[width] duration-500"
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>

                {scarcityNote ? (
                  <p className="mt-2.5 text-xs leading-relaxed text-[#6B6B6B]">
                    {scarcityNote}
                  </p>
                ) : null}
              </div>
            ) : null}

            <ul className="mt-7 space-y-3.5 sm:mt-8 sm:space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm leading-snug text-[#333] sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}

              {showInstantPdfRow ? (
                <li className="flex items-start justify-between gap-3">
                  <span className="flex min-w-0 items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm leading-snug text-[#333] sm:text-base">
                      Early Bird Gift 🎁
                    </span>
                  </span>
                  <span className="flex shrink-0 items-baseline gap-1.5 pt-0.5">
                    <span className="text-sm font-bold text-black">Free</span>
                    <span className="text-sm text-[#888] line-through">$9</span>
                  </span>
                </li>
              ) : null}
            </ul>

            {showMoneyBack ? (
              <div className="mt-7 flex items-start gap-3 border border-black/15 bg-[#F9F9F9] p-3.5 text-left shadow-[2px_2px_0_0_rgba(0,0,0,0.04)] sm:mt-8 sm:p-4">
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
                <p className="text-xs leading-relaxed text-[#555] sm:text-sm">
                  <strong className="font-semibold text-black">
                    Money-back guarantee.
                  </strong>{" "}
                  If your Blueprint doesn&apos;t give you a clear next step,
                  email us within 7 days for a full refund.
                </p>
              </div>
            ) : null}

            <div className="mt-7 sm:mt-8">
              {checkoutButton ?? (
                <Link
                  href="/form"
                  className="btn-brutal btn-brutal-primary inline-flex w-full items-center justify-center px-7 py-4 text-base font-bold tracking-wide text-black text-center sm:py-4.5 sm:text-lg"
                >
                  {buttonLabel}
                </Link>
              )}
              <p className="mt-3 text-center text-sm text-[#555] sm:text-[15px]">
                Access forever (no subscription)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
