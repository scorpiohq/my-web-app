"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/gouti/Reveal";

const slides = [
  {
    eyebrow: "YOUR BLUEPRINT",
    titleLead: "What You Get Inside",
    titleMark: "Your Blueprint",
    sub: "Six clear pieces — built from your answers, not a template.",
    tape: "Swipe to explore →",
  },
  {
    eyebrow: "01 · IDENTITY",
    titleLead: "Your Creator",
    titleMark: "Identity",
    sub: "Named in one clear line — who you are when you show up online.",
    tape: "See why it fits →",
  },
  {
    eyebrow: "02 · FIT",
    titleLead: "Why this path",
    titleMark: "fits you",
    sub: "Not a generic niche — a direction built around your real life.",
    tape: "Your strengths →",
  },
  {
    eyebrow: "03 · STRENGTHS",
    titleLead: "What you're",
    titleMark: "already good at",
    sub: "The advantages you already have — so you stop starting from zero.",
    tape: "What's blocking you →",
  },
  {
    eyebrow: "04 · BLOCKERS",
    titleLead: "What's been",
    titleMark: "holding you back",
    sub: "Named clearly, without the guilt — so you can move past it.",
    tape: "Where to start →",
  },
  {
    eyebrow: "05 · PLATFORM",
    titleLead: "Exactly where",
    titleMark: "to start",
    sub: "Instagram, YouTube, TikTok — or wherever fits you, with a why.",
    tape: "Your first move →",
  },
  {
    eyebrow: "06 · FIRST MOVE",
    titleLead: "Your first",
    titleMark: "move this week",
    sub: "A concrete next step from where you are — not a 90-day plan.",
    tape: "Build my Blueprint →",
  },
] as const;

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
      <span className="text-[24px] leading-none font-medium" aria-hidden>
        {direction === "prev" ? "‹" : "›"}
      </span>
    </button>
  );
}

function SlideCard({
  slide,
}: {
  slide: (typeof slides)[number];
}) {
  return (
    <article className="bp-paper relative mx-auto h-auto w-full max-w-[540px] aspect-[540/620]">
      {/* Stacked sheets behind */}
      <div
        className="pointer-events-none absolute inset-x-[10px] -bottom-[6px] top-[10px] rounded-[20px] bg-[#EFEBE4]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-[5px] -bottom-[3px] top-[5px] rounded-[20px] border border-black/[0.04] bg-[#F7F3ED]"
        aria-hidden
      />

      <div className="bp-paper__sheet relative flex h-full flex-col rounded-[20px] border border-black/[0.07] bg-[#FFFcf7] px-8 py-10 text-left shadow-[0_22px_50px_-20px_rgba(0,0,0,0.28)] sm:px-10 sm:py-11">
        <p className="mb-5 text-[11px] font-semibold tracking-[0.14em] text-[#999] sm:text-[12px]">
          {slide.eyebrow}
        </p>

        <h3 className="bp-paper__title m-0 text-[clamp(1.55rem,3.6vw,2.15rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[#252720]">
          <span className="block">{slide.titleLead}</span>
          <span className="relative mt-[0.12em] inline-block">
            <span className="yf-hero__how-to relative inline-block italic">
              {slide.titleMark}
              <span className="yf-hero__how-to-mark" aria-hidden />
            </span>
          </span>
        </h3>

        <p className="bp-paper__sub mt-5 max-w-[22rem] flex-1 text-[15px] leading-relaxed text-[#6B6B6B] sm:text-[16px]">
          {slide.sub}
        </p>

        <p className="bp-paper__tape mt-auto inline-block w-fit rotate-[-2deg] bg-[#E8D4A8] px-3.5 py-2 text-[13px] font-semibold tracking-[-0.01em] text-[#252720] shadow-[1px_2px_0_rgba(0,0,0,0.06)] sm:text-[14px]">
          {slide.tape}
        </p>
      </div>
    </article>
  );
}

/**
 * One path section — headline + swipeable paper slides (Blueprint chapters).
 */
export default function BlueprintThread() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const total = slides.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const slide = slides[index];

  return (
    <section id="blueprint-thread" className="bp-thread relative px-5 sm:px-8">
      <div className="bp-thread__inner">
        <Reveal>
          <h2 className="bp-thread__title m-0 text-center text-[#121212]">
            What You Get in{" "}
            <span className="yf-hero__how-to relative inline-block italic">
              Your Blueprint
              <span className="yf-hero__how-to-mark" aria-hidden />
            </span>
          </h2>

          <p className="bp-thread__sub mx-auto mt-5 max-w-[34rem] text-center text-[15px] leading-relaxed text-[#6B6B6B] sm:mt-6 sm:text-[17px]">
            Your Blueprint tells you where to start — Instagram, YouTube, TikTok,
            Threads, or wherever you&apos;re headed — built around you, not a
            generic playbook.
          </p>
        </Reveal>

        <Reveal
          className="relative mx-auto mt-10 w-full max-w-[640px] overflow-visible px-12 sm:mt-12 sm:px-16 md:px-20"
          delayMs={80}
        >
          <div
            className="relative overflow-visible touch-pan-y"
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
            <SlideCard key={index} slide={slide} />
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
            <div className="pointer-events-auto">
              <NavButton direction="prev" onClick={goPrev} label="Previous slide" />
            </div>
            <div className="pointer-events-auto">
              <NavButton direction="next" onClick={goNext} label="Next slide" />
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <div
            className="mt-7 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Blueprint path slides"
          >
            {slides.map((_, i) => (
              <button
                key={slides[i].eyebrow}
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
