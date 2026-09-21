"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Stars, testimonials } from "@/components/testimonial-data";
import { Reveal } from "@/components/gouti/Reveal";

const reviews = testimonials.slice(0, 5);
const TOTAL = reviews.length + 1; // 5 reviews + CTA

const cardShell =
  "relative mx-auto flex h-full w-full max-w-[480px] min-h-[300px] flex-col justify-between rounded-[24px] border border-black/[0.06] bg-white px-7 py-8 text-left shadow-[0_20px_50px_-24px_rgba(0,0,0,0.22)] sm:max-w-[520px] sm:min-h-[320px] sm:px-9 sm:py-10";

function ReviewCard({
  quote,
  author,
  company,
}: {
  quote: ReactNode;
  author: string;
  company: string;
}) {
  return (
    <article className={cardShell}>
      <div>
        <Stars />
        <blockquote className="reviews-quote text-[15px] leading-relaxed text-[#333] sm:text-base sm:leading-relaxed">
          {quote}
        </blockquote>
      </div>
      <p className="reviews-author pt-6 text-sm font-normal text-[#555] sm:text-base">
        —{author}, {company}
      </p>
    </article>
  );
}

function CtaCard({ ctaHref }: { ctaHref: string }) {
  return (
    <article className={cardShell}>
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="reviews-cta-title text-center text-[clamp(1.5rem,4vw,2.1rem)] leading-[1.15] tracking-[-0.02em] text-[#121212]">
          Your Turn to Start!
        </p>

        <Link
          href={ctaHref}
          className="btn-brutal btn-brutal-primary mt-8 inline-flex w-full items-center justify-center px-5 py-3.5 text-sm font-bold tracking-wide text-black"
        >
          Let&apos;s Start →
        </Link>

        <p className="reviews-cta-sub mt-5 max-w-[18rem] text-center text-[14px] leading-snug text-[#8A8A8A] sm:text-[15px]">
          Yours could be the next review here.
        </p>
      </div>
    </article>
  );
}

function NavButton({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#121212] shadow-[0_8px_20px_-12px_rgba(0,0,0,0.25)] transition hover:border-black/20 hover:bg-[#FAFAFA] active:scale-95 sm:h-12 sm:w-12"
    >
      <span className="text-[24px] leading-none font-medium" aria-hidden="true">
        {direction === "prev" ? "‹" : "›"}
      </span>
    </button>
  );
}

/**
 * Swipeable review cards (classic quote style) — 5 reviews + 1 CTA.
 * Used on /gouti/landing only.
 */
export default function MessageTestimonials({
  ctaHref = "/#pricing",
}: {
  ctaHref?: string;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + TOTAL) % TOTAL);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % TOTAL);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const active = index < reviews.length ? reviews[index] : null;

  return (
    <section className="bg-white px-6 py-12 sm:px-8 sm:py-16" id="reviews">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <Reveal className="flex w-full flex-col items-center">
          <p className="reviews-eyebrow mb-3 text-[13px] font-medium text-[#888] sm:mb-4">
            Reviews
          </p>
          <h2 className="reviews-title m-0 max-w-3xl text-[clamp(1.65rem,4.2vw,2.55rem)] font-bold leading-[1.12] tracking-[-0.02em] text-black">
            Their Words, Not Mine
          </h2>
          <p className="reviews-sub mx-auto mt-4 mb-10 max-w-[42rem] text-[15px] leading-relaxed text-[#6B6B6B] sm:mt-5 sm:mb-12 sm:text-[17px]">
            Every day, people are joining, sharing wins, &amp; leaving
            heartfelt reviews. It&apos;s growing fast, and this is just the
            beginning.
          </p>
        </Reveal>

        <Reveal className="relative w-full max-w-[560px] px-12 sm:px-16 md:px-20" delayMs={80}>
          <div
            className="pointer-events-none absolute inset-x-[3.5rem] bottom-0 top-3 rounded-[24px] bg-white shadow-[0_8px_24px_-16px_rgba(0,0,0,0.12)] sm:inset-x-[4.75rem] md:inset-x-[5.75rem]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-[3.15rem] bottom-0 top-1.5 rounded-[24px] border border-black/[0.04] bg-white shadow-[0_10px_28px_-18px_rgba(0,0,0,0.14)] sm:inset-x-[4.4rem] md:inset-x-[5.4rem]"
            aria-hidden="true"
          />

          <div
            className="relative touch-pan-y"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
              touchDeltaX.current = 0;
            }}
            onTouchMove={(e) => {
              if (touchStartX.current == null) return;
              touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
            }}
            onTouchEnd={() => {
              const dx = touchDeltaX.current;
              touchStartX.current = null;
              touchDeltaX.current = 0;
              if (dx > 50) goPrev();
              else if (dx < -50) goNext();
            }}
          >
            {active ? (
              <ReviewCard
                quote={active.quote}
                author={active.author}
                company={active.company}
              />
            ) : (
              <CtaCard ctaHref={ctaHref} />
            )}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
            <div className="pointer-events-auto">
              <NavButton direction="prev" onClick={goPrev} label="Previous review" />
            </div>
            <div className="pointer-events-auto">
              <NavButton direction="next" onClick={goNext} label="Next review" />
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <div
            className="mt-7 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Review slides"
          >
            {Array.from({ length: TOTAL }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-5 bg-[#FFA126]"
                    : "w-2 bg-black/15 hover:bg-black/25"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
