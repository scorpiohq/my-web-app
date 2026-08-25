"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

const defaultFeatures = [
  "One Personalized Report",
  "Ready in Under 3 Minutes",
  "Lifetime Access",
];

type TimelineStep = {
  price: string;
  label: ReactNode;
  active?: boolean;
  soldOut?: boolean;
};

const defaultTimelineSteps: TimelineStep[] = [
  {
    price: "$5",
    label: <>SOLD OUT</>,
    soldOut: true,
  },
  {
    price: "$9",
    label: (
      <>
        <span className="font-bold text-black">21</span> SPOTS LEFT
      </>
    ),
    active: true,
  },
  {
    price: "$15",
    label: <>NEXT 50 USERS</>,
  },
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

function EmptyCircleIcon() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black bg-white"
      aria-hidden="true"
    />
  );
}

function PumpArrow() {
  return (
    <span className="pricing-pump-arrow shrink-0" aria-hidden="true">
      <svg
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 6.5h12.5V2.2L21 8l-8.5 5.8V9.5H0V6.5z"
          fill="#E11D2E"
          stroke="#000"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function BonusGiftGraphic() {
  return (
    <div className="bonus-gift-stage" aria-hidden="true">
      <div className="bonus-gift-scale">
        <div className="bonus-gift-stack">
          <div className="bonus-gift-sheet bonus-gift-sheet-left" />
          <div className="bonus-gift-sheet bonus-gift-sheet-right" />
          <div className="bonus-gift-sheet bonus-gift-sheet-front">
            <div className="bonus-gift-dots">
              <span className="bonus-gift-dot" />
              <span className="bonus-gift-dot" />
              <span className="bonus-gift-dot" />
              <span className="bonus-gift-dot" />
            </div>
            <div className="bonus-gift-lines">
              <span className="bonus-gift-line" />
              <span className="bonus-gift-line" />
              <span className="bonus-gift-line" />
            </div>
          </div>
          <div className="bonus-gift-badge">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3.5c-.7 0-1.9.3-2.7 1.1-.9.9-1.1 2-1 2.9H7.2C6 7.5 5 8.5 5 9.8v1.2h14V9.8c0-1.3-1-2.3-2.2-2.3h-1.1c.1-.9-.1-2-1-2.9C13.9 3.8 12.7 3.5 12 3.5Zm-2.2 2.4c.4-.4 1.1-.7 2.2-.7s1.8.3 2.2.7c.4.4.5.9.5 1.3h-5.4c0-.4.1-.9.5-1.3ZM5 12.5v6.2C5 19.5 5.9 20.5 7 20.5h4V12.5H5Zm8 0v8h4c1.1 0 2-1 2-1.8v-6.2h-6Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

type PricingProps = {
  originalPrice?: string;
  salePrice?: string;
  offerBadge?: string;
  buttonLabel?: string;
  timelineSteps?: TimelineStep[];
  showIntro?: boolean;
  features?: string[];
  checkoutButton?: ReactNode;
  showInstantPdfRow?: boolean;
};

export default function Pricing({
  originalPrice,
  salePrice = "$9",
  offerBadge = "SIMPLE PRICING",
  buttonLabel = "GET YOUR BLUEPRINT →",
  timelineSteps = defaultTimelineSteps,
  showIntro = true,
  features = defaultFeatures,
  checkoutButton,
  showInstantPdfRow = true,
}: PricingProps) {
  const [bonusGiftOpen, setBonusGiftOpen] = useState(false);
  const [bonusGiftClaimed, setBonusGiftClaimed] = useState(false);
  const titleId = useId();
  const stepCount = timelineSteps.length;
  const lineLeft = `${100 / (stepCount * 2)}%`;
  const lineWidth = `${100 - 100 / stepCount}%`;
  const resolvedButtonLabel = bonusGiftClaimed
    ? "Get My Blueprint + Bonus Gift →"
    : buttonLabel;

  useEffect(() => {
    if (!bonusGiftOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBonusGiftOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [bonusGiftOpen]);

  const claimBonusGift = () => {
    setBonusGiftClaimed(true);
    setBonusGiftOpen(false);
  };

  return (
    <section id="pricing" className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {showIntro ? (
          <>
            <span className="mb-6 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-7 sm:text-xs">
              PRICING
            </span>

            <h2
              className="mb-5 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              FIND YOUR DIRECTION. START TODAY.
            </h2>

            <p className="mb-10 max-w-xl text-base leading-relaxed text-[#6B6B6B] sm:mb-12 sm:text-lg">
              Answer a few thoughtful questions and receive a personalized
              Blueprint in just a few minutes.
            </p>
          </>
        ) : null}

        <div className="w-full border-2 border-black bg-white shadow-[8px_8px_0_0_#000]">
          <div className="px-6 pt-10 pb-4 sm:px-10 sm:pt-12 sm:pb-5">
            <div className="relative mb-2 flex flex-col items-center">
              {offerBadge ? (
                <span className="mb-3 inline-block border border-black bg-[#E5C4A1] px-3 py-1 text-xs font-semibold tracking-wide text-black shadow-[2px_2px_0_0_#000]">
                  {offerBadge}
                </span>
              ) : null}

              <div className="flex items-end justify-center gap-1 sm:gap-1.5">
                {originalPrice ? (
                  <p className="pb-2 text-2xl font-medium text-[#999] line-through sm:pb-3 sm:text-3xl">
                    {originalPrice}
                  </p>
                ) : null}
                <p
                  className="text-[clamp(3.5rem,12vw,5.5rem)] leading-none text-black"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {salePrice}
                </p>
              </div>

              <p className="mt-3 text-sm text-[#6B6B6B]">
                One-Time Purchase
              </p>
            </div>

            <ul
              className={`mx-auto mt-8 max-w-sm space-y-3 text-left ${
                showInstantPdfRow ? "relative pl-8 sm:pl-9" : ""
              }`}
            >
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-[#333] sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}

              {showInstantPdfRow ? (
                <>
                  <li className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-[#333] sm:text-base">
                      Instant PDF Download
                    </span>
                  </li>
                  <li className="list-none pt-1" aria-hidden="true">
                    <div className="h-px w-full bg-[#E5E5E5]" />
                  </li>
                  <li className="relative">
                    {!bonusGiftClaimed ? (
                      <span className="pointer-events-none absolute -left-8 top-0.5 sm:-left-9">
                        <PumpArrow />
                      </span>
                    ) : null}
                    {bonusGiftClaimed ? (
                      <div className="flex w-full items-start justify-between gap-3">
                        <span className="flex min-w-0 items-start gap-3">
                          <CheckIcon />
                          <span className="text-sm text-[#333] sm:text-base">
                            Bonus Gift Included
                          </span>
                        </span>
                        <span className="flex shrink-0 items-baseline gap-1.5 pt-0.5">
                          <span className="text-sm font-medium text-[#999] line-through sm:text-base">
                            $9
                          </span>
                          <span className="text-sm font-semibold text-black sm:text-base">
                            $0
                          </span>
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setBonusGiftOpen(true)}
                        className="group flex w-full items-start justify-between gap-3 text-left transition hover:opacity-90"
                        aria-haspopup="dialog"
                        aria-expanded={bonusGiftOpen}
                      >
                        <span className="flex min-w-0 items-start gap-3">
                          <EmptyCircleIcon />
                          <span className="text-sm text-[#333] underline decoration-transparent underline-offset-2 transition group-hover:decoration-[#333] sm:text-base">
                            Claim your Bonus Gift 🎁*
                          </span>
                        </span>
                        <span className="flex shrink-0 items-baseline gap-1.5 pt-0.5">
                          <span className="text-sm font-medium text-[#999] line-through sm:text-base">
                            $9
                          </span>
                          <span className="text-sm font-semibold text-black sm:text-base">
                            $0
                          </span>
                        </span>
                      </button>
                    )}
                  </li>
                </>
              ) : null}
            </ul>

            <div className="mx-auto mt-8 w-full max-w-md">
              {checkoutButton ?? (
                <Link
                  href="/form"
                  className="btn-brutal btn-brutal-primary inline-block w-full px-6 py-4 text-sm font-bold tracking-wide text-black sm:text-base"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {resolvedButtonLabel}
                </Link>
              )}

              <div className="mt-5 flex w-full flex-col items-center">
                <div className="flex w-full items-center gap-2.5">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div
                      className="h-px w-full"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, rgba(0,0,0,0.55))",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="ml-1.5 h-1 w-1 shrink-0 rounded-full bg-black"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="shrink-0 text-[10px] font-semibold tracking-[0.12em] text-black sm:text-xs sm:tracking-[0.15em]">
                    SECURE CHECKOUT ViA LEMONSQUEEZY
                  </p>

                  <div className="flex min-w-0 flex-1 items-center">
                    <span
                      className="mr-1.5 h-1 w-1 shrink-0 rounded-full bg-black"
                      aria-hidden="true"
                    />
                    <div
                      className="h-px w-full"
                      style={{
                        background:
                          "linear-gradient(to left, transparent, rgba(0,0,0,0.55))",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div
                  className="checkout-bar-mask relative mt-3.5 w-full overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="checkout-bar-track">
                    <div className="checkout-bar-segment">
                      <img
                        src="/checkout-bar.svg"
                        alt=""
                        width={300}
                        height={56}
                        className="checkout-bar-slide"
                      />
                    </div>
                    <div className="checkout-bar-segment">
                      <img
                        src="/checkout-bar.svg"
                        alt=""
                        width={300}
                        height={56}
                        className="checkout-bar-slide"
                      />
                    </div>
                    <div className="checkout-bar-segment">
                      <img
                        src="/checkout-bar.svg"
                        alt=""
                        width={300}
                        height={56}
                        className="checkout-bar-slide"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-6 pt-2 sm:px-8 sm:pb-7 sm:pt-3">
            <div className="relative mx-auto max-w-lg">
              <div
                className="absolute top-[5px] h-0.5 bg-[#D0D0D0]"
                style={{ left: lineLeft, width: lineWidth }}
                aria-hidden="true"
              />

              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${stepCount}, minmax(0, 1fr))`,
                }}
              >
                {timelineSteps.map((step) => (
                  <div
                    key={step.price}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={
                        step.active
                          ? "relative z-10 mb-3 h-3 w-3 border-2 border-black bg-[#FFC940] shadow-[2px_2px_0_0_#000]"
                          : "relative z-10 mb-3 h-2.5 w-2.5 border border-black bg-[#C8C8C8]"
                      }
                    />
                    <p
                      className={
                        step.active
                          ? "text-2xl text-black sm:text-3xl"
                          : step.soldOut
                            ? "text-base text-[#999] line-through sm:text-lg"
                            : "text-base text-[#999] sm:text-lg"
                      }
                      style={{ fontFamily: "var(--font-hero)" }}
                    >
                      {step.price}
                    </p>
                    <p
                      className={`mt-1 text-[10px] leading-tight sm:text-xs ${
                        step.active ? "text-[#333]" : "text-[#999]"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {bonusGiftOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            type="button"
            aria-label="Close bonus gift"
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setBonusGiftOpen(false)}
          />

          <div className="relative z-10 flex max-h-[min(92dvh,720px)] w-full max-w-[400px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:max-h-[min(90dvh,760px)] sm:max-w-[420px] sm:rounded-[24px]">
            <button
              type="button"
              onClick={() => setBonusGiftOpen(false)}
              className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-lg leading-none text-black shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition hover:bg-[#f8f8f8] sm:right-3 sm:top-3 sm:h-9 sm:w-9"
              aria-label="Close"
            >
              ×
            </button>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-5 sm:px-6 sm:pb-7 sm:pt-7">
              <div className="mb-3 max-w-[90%] shrink-0 text-left sm:mb-4">
                <h2
                  id={titleId}
                  className="text-base font-semibold tracking-tight text-[#1a1a1a] sm:text-xl"
                >
                  Your Bonus Gift 🎁
                </h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#6B6B6B] sm:mt-2 sm:text-[15px]">
                  A simple prompt file that transforms your blueprint into
                  practical, step-by-step actions.
                </p>
              </div>

              <p className="mb-3 shrink-0 text-left text-[13px] leading-relaxed text-[#333] sm:mb-5 sm:text-[15px]">
                Worth <span className="font-semibold text-black">$9</span>. Free
                for Early Bird users.
              </p>

              <div className="mx-auto w-full shrink sm:max-w-none">
                <BonusGiftGraphic />
              </div>

              <button
                type="button"
                onClick={claimBonusGift}
                className="btn-brutal btn-brutal-primary mt-4 w-full shrink-0 px-5 py-3 text-sm font-semibold text-black sm:mt-5 sm:px-6 sm:py-3.5"
              >
                Add My Free Gift →
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
