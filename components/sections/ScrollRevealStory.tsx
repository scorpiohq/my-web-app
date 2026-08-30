"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type StoryBlock = {
  id: string;
  content: ReactNode | ((revealed: boolean) => ReactNode);
  /** Full-line text color */
  color?: string;
  /** Allow wrapping instead of forcing a single line (for long beats) */
  allowWrap?: boolean;
};

const ACCENT = "#FF9100";

function Accent({
  revealed,
  children,
}: {
  revealed: boolean;
  children: ReactNode;
}) {
  return (
    <span style={revealed ? { color: ACCENT } : undefined}>{children}</span>
  );
}

/**
 * One block = one visual line (as in the reference).
 * Breaks stay intentional across screen sizes; font scales down on mobile.
 */
const blocks: StoryBlock[] = [
  { id: "1", content: "Everybody thinks about starting on social media." },
  { id: "2", content: "At some point, everyone does." },
  { id: "3", content: "But most people don't." },
  { id: "4", content: "Not because they're lazy." },
  { id: "5", content: "Not because they don't have anything to say." },
  { id: "6", content: "It's not even really about the money." },
  { id: "7", content: "It's because they open their phone..." },
  { id: "8", content: "think \"okay, what do I even post\"..." },
  { id: "9", content: "and close it again." },
  {
    id: "10",
    content: (revealed) => (
      <em>
        <Accent revealed={revealed}>“Where do I even start?”</Accent>
      </em>
    ),
    color: ACCENT,
  },
  { id: "11", content: "That question is the whole barrier." },
  {
    id: "12",
    content: "Everything else — consistency, growth, monetizing — comes after it.",
  },
  { id: "13", content: "And nobody answers it for you." },
  { id: "14", content: "Most people already have the knowledge." },
  {
    id: "15",
    content: "Some are applying it. Some are still figuring it out.",
  },
  { id: "16", content: "The real problem is simpler:" },
  {
    id: "17",
    content: (revealed) => (
      <Accent revealed={revealed}>You don&apos;t know where to start.</Accent>
    ),
    color: ACCENT,
  },
  {
    id: "18",
    content: (revealed) => (
      <>
        That&apos;s why I built{" "}
        <Accent revealed={revealed}>Your Blueprint.</Accent>
      </>
    ),
  },
  {
    id: "19",
    allowWrap: true,
    content: (
      <>
        Answer 18 questions, about you, your goals,
        <br />
        your interests, where you&apos;re right now.
      </>
    ),
  },
  {
    id: "20",
    content: (revealed) => (
      <>
        From there, it builds a <Accent revealed={revealed}>Blueprint</Accent>. Around you.
      </>
    ),
  },
  { id: "21", content: "Not a generic blueprint." },
  { id: "22", content: "Yours Blueprint", color: ACCENT },
  {
    id: "23",
    content: (revealed) => (
      <>
        So instead of guessing your first move...{" "}
        <Accent revealed={revealed}>you&apos;ll know it.</Accent>
      </>
    ),
  },
];

/** Reveal groups — matching the story beats. */
const BEATS: number[][] = [
  [0, 1], // hook (static)
  [2], // But most people don't
  [3, 4, 5], // Not because...
  [6, 7, 8], // phone open -> think -> close
  [9, 10], // Where do I even start? + whole barrier
  [11, 12], // comes after + nobody answers
  [13, 14], // knowledge + applying/figuring
  [15, 16], // real problem + you don't know where to start
  [17, 18], // built Your Blueprint + 18 questions
  [19, 20, 21], // builds a Blueprint + not generic + Yours
  [22], // know your first move + CTA button
];

const DIM = 0.08;
const STATIC_HOOK_INDICES = new Set([0, 1]);

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function renderContent(
  content: StoryBlock["content"],
  revealed: boolean,
): ReactNode {
  return typeof content === "function" ? content(revealed) : content;
}

function beatOpacityFromAnchor(
  anchor: HTMLElement,
  vh: number,
  reducedMotion: boolean,
): number {
  if (reducedMotion) return 1;

  const rect = anchor.getBoundingClientRect();
  const focusY = vh * 0.48;
  const fadeStart = vh * 0.72;
  const fadeEnd = focusY;
  const y = rect.top + rect.height / 2;

  if (y <= fadeEnd) return 1;
  if (y >= fadeStart) return DIM;

  const t = (y - fadeEnd) / (fadeStart - fadeEnd);
  return DIM + (1 - DIM) * (1 - smoothstep(t));
}

export default function ScrollRevealStory() {
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const [opacities, setOpacities] = useState<number[]>(() =>
    blocks.map((_, i) => (STATIC_HOOK_INDICES.has(i) ? 1 : DIM)),
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  const update = useCallback(() => {
    const vh = window.innerHeight;
    const next = new Array(blocks.length).fill(DIM);

    for (const index of STATIC_HOOK_INDICES) next[index] = 1;

    if (reducedMotion) {
      next.fill(1);
      setOpacities(next);
      return;
    }

    let previousComplete = true;
    for (let beatIndex = 0; beatIndex < BEATS.length; beatIndex++) {
      const beat = BEATS[beatIndex];
      if (beatIndex === 0) continue;

      if (!previousComplete) {
        for (const index of beat) next[index] = DIM;
        continue;
      }

      const anchor = lineRefs.current[beat[0]];
      if (!anchor) continue;

      const opacity = beatOpacityFromAnchor(anchor, vh, false);
      for (const index of beat) next[index] = opacity;
      previousComplete = opacity >= 0.95;
    }

    setOpacities((prev) => {
      if (
        prev.length === next.length &&
        prev.every((v, i) => Math.abs(v - next[i]) < 0.01)
      ) {
        return prev;
      }
      return next;
    });
  }, [reducedMotion]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return (
    <section
      className="grid-bg overflow-x-hidden px-5 pt-16 pb-[120px] sm:px-8 sm:pt-20 sm:pb-36 md:pt-24"
      aria-label="Why you need a Blueprint"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-3 sm:gap-4 md:gap-5">
        {BEATS.map((beat, beatIndex) => (
          <div
            key={`beat-${beatIndex}`}
            className="flex w-full flex-col items-center gap-3 sm:gap-4 md:gap-5"
          >
            {beat.map((index) => {
              const block = blocks[index];
              const isStatic = STATIC_HOOK_INDICES.has(index);
              const opacity = isStatic ? 1 : (opacities[index] ?? DIM);
              const revealed = isStatic || opacity > 0.7;
              const color = block.color ?? "#000000";

              return (
                <p
                  key={block.id}
                  ref={(el) => {
                    lineRefs.current[index] = el;
                  }}
                  className={
                    block.allowWrap
                      ? "w-full max-w-xl text-center font-mono text-[13px] leading-snug sm:text-[15px] sm:leading-relaxed md:text-lg md:leading-relaxed"
                      : "w-full max-w-full text-center font-mono text-[13px] leading-snug break-words sm:w-max sm:text-[15px] sm:leading-relaxed sm:whitespace-nowrap md:text-lg md:leading-relaxed"
                  }
                  style={
                    isStatic
                      ? { color }
                      : {
                          color,
                          opacity,
                          filter: opacity < 0.4 ? "blur(1.5px)" : "blur(0px)",
                          transition:
                            "opacity 480ms ease-out, filter 480ms ease-out",
                        }
                  }
                >
                  {renderContent(block.content, revealed)}
                </p>
              );
            })}

            {beatIndex === BEATS.length - 1 ? (
              <div
                className="flex w-full justify-center pt-4"
                style={{
                  opacity: opacities[blocks.length - 1] ?? DIM,
                  transition: "opacity 480ms ease-out",
                }}
              >
                <Link
                  href="/#pricing"
                  className="btn-brutal btn-brutal-primary inline-block min-w-[200px] px-8 py-4 text-base font-bold tracking-wide text-black text-center sm:min-w-[220px] sm:px-9 sm:py-4 sm:text-base md:text-[17px]"
                  tabIndex={
                    (opacities[blocks.length - 1] ?? DIM) > 0.7 ? 0 : -1
                  }
                  aria-hidden={(opacities[blocks.length - 1] ?? DIM) <= 0.7}
                >
                  GET YOUR BLUEPRINT →
                </Link>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
