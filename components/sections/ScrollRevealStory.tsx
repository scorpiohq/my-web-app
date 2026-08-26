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
  { id: "1", content: "Everybody wants to start on social media." },
  { id: "2", content: "Who doesn't?" },
  { id: "3", content: "Make money online.", color: ACCENT },
  {
    id: "4",
    content: "Have freedom over your time and life.",
    color: ACCENT,
  },
  {
    id: "5",
    content: "Travel the places you've always wanted to.",
    color: ACCENT,
  },
  {
    id: "6",
    content: "Spend time with the people you love.",
    color: ACCENT,
  },
  {
    id: "7",
    content: "Almost everyone, at some point in their life,",
  },
  { id: "8", content: "has thought about starting." },
  {
    id: "9",
    content: (revealed) => (
      <>
        But most <Accent revealed={revealed}>never actually do.</Accent>
      </>
    ),
  },
  {
    id: "10",
    content: "Not because they lack motivation. Not because they're",
  },
  {
    id: "11",
    content: "chasing perfection. It's not even about the money anymore.",
  },
  {
    id: "12",
    content: "It's because they wanted to, but never had",
  },
  { id: "13", content: "clarity on where to actually begin." },
  {
    id: "14",
    content: (revealed) => (
      <em>
        <Accent revealed={revealed}>“Where do I even start?”</Accent>
      </em>
    ),
    color: ACCENT,
  },
  {
    id: "15",
    content: "That's the real first barrier. Before anything else.",
  },
  {
    id: "16",
    content: "Most people already have the knowledge. Some are",
  },
  {
    id: "17",
    content: "applying it, Some are still figuring it out.",
  },
  {
    id: "18",
    content: (revealed) => (
      <>
        The real problem is simpler:{" "}
        <Accent revealed={revealed}>you don&apos;t know where to start.</Accent>
      </>
    ),
  },
  {
    id: "19",
    content: (revealed) => (
      <>
        That&apos;s why I built{" "}
        <Accent revealed={revealed}>Your Blueprint.</Accent>
      </>
    ),
  },
  {
    id: "20",
    content: "A simple tool to help you figure out exactly that.",
  },
  {
    id: "21",
    content: (revealed) => (
      <>
        Just Answer <Accent revealed={revealed}>18 Simple questions</Accent> —
        about you, your goals,
      </>
    ),
  },
  {
    id: "22",
    content: "your interests, and where you're right now.",
  },
  {
    id: "23",
    content: (revealed) => (
      <>
        From there, it builds{" "}
        <Accent revealed={revealed}>a Personalized Blueprint</Accent>, around
        you.
      </>
    ),
  },
  {
    id: "24",
    content: "So instead of wondering what your first step should be...",
  },
  {
    id: "25",
    content: "you'll know exactly where to begin.",
    color: ACCENT,
  },
  {
    id: "26",
    content: "Think of it as a compass, for the moment you feel stuck.",
  },
  { id: "27", content: "Let's start your journey. Together." },
];

/** Reveal groups — matching the story beats. */
const BEATS: number[][] = [
  [0, 1], // hook (static)
  [2, 3, 4, 5], // desires
  [6, 7, 8], // almost everyone + never do
  [9, 10], // not because
  [11, 12], // clarity
  [13, 14], // the question
  [15, 16, 17], // knowledge + real problem
  [18, 19], // Your Blueprint
  [20, 21], // 18 questions
  [22], // Personalized Blueprint
  [23, 24, 25], // first step / begin / compass
  [26], // closing + button
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
                  className="w-full max-w-full text-center font-mono text-[13px] leading-snug break-words sm:w-max sm:text-[15px] sm:leading-relaxed sm:whitespace-nowrap md:text-lg md:leading-relaxed"
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
                  href="/form"
                  className="btn-brutal btn-brutal-primary inline-block min-w-[180px] px-8 py-3.5 text-sm font-semibold text-black"
                  tabIndex={
                    (opacities[blocks.length - 1] ?? DIM) > 0.7 ? 0 : -1
                  }
                  aria-hidden={(opacities[blocks.length - 1] ?? DIM) <= 0.7}
                >
                  Get your Blueprint →
                </Link>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
