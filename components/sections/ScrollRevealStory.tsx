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
};

const blocks: StoryBlock[] = [
  { id: "1", content: "Everybody wants to start on social media." },
  { id: "2", content: "Who doesn't?" },
  { id: "3", content: "Make money online." },
  { id: "4", content: "Have freedom over your time and life." },
  { id: "5", content: "Travel the places you've always wanted to." },
  { id: "6", content: "Spend time with the people you love." },
  {
    id: "7",
    content:
      "Almost everyone, at some point in their life, has thought about starting.",
  },
  { id: "8", content: "But most never actually do." },
  {
    id: "9",
    content:
      "Not because they lack motivation or they're chasing perfection. It's not even about money.",
  },
  { id: "10", content: "Still, they never start." },
  {
    id: "11",
    content: (revealed) => (
      <>
        It&apos;s because they wanted to - but never had{" "}
        <span className={revealed ? "text-[#FFA126]" : undefined}>clarity</span>{" "}
        on where to actually begin.
      </>
    ),
  },
  {
    id: "12",
    content: <em>“Where do I even start?”</em>,
  },
  { id: "13", content: "That's the real first question. Before anything else." },
  {
    id: "14",
    content:
      "Main reason people stay stuck isn't discipline, or consistency, or even skill.",
  },
  {
    id: "15",
    content:
      "Everyone has knowledge, some already applying it, some still figuring it out.",
  },
  { id: "16", content: "Real reason is: you don't know where to start." },
  {
    id: "17",
    content:
      "Because not everyone has the same situation. Not everyone has the same interests.",
  },
  {
    id: "18",
    content: (revealed) => (
      <>
        That&apos;s why I built{" "}
        <span className={revealed ? "font-semibold text-[#FFA126]" : undefined}>
          Your Blueprint
        </span>{" "}
        - a simple way to help you start your journey.
      </>
    ),
  },
  {
    id: "19",
    content:
      "All you have to do is answer 18 simple questions - about you, your goals, your passions, and the situation you're actually in.",
  },
  {
    id: "20",
    content: "The tool builds your personalized Blueprint from there.",
  },
  {
    id: "21",
    content:
      "So you can finally take the step you've been waiting on for years.",
  },
  {
    id: "22",
    content: "Think of it like a compass for exactly the moment you're stuck.",
  },
  { id: "23", content: "Let's start your journey. Together." },
];

/** Plot beats — lines in a beat share one reveal. */
const BEATS: number[][] = [
  [0, 1],
  [2, 3, 4],
  [5, 6],
  [7, 8],
  [9, 10],
  [11, 12],
  [13, 14, 15],
  [16, 17],
  [18, 19],
  [20, 21],
  [22], // closing line
];

const DIM = 0.08;

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

/** Opacity for a beat from its anchor line’s place in the viewport. */
function beatOpacityFromAnchor(
  anchor: HTMLElement,
  vh: number,
  reducedMotion: boolean,
): number {
  if (reducedMotion) return 1;

  const rect = anchor.getBoundingClientRect();
  const focusY = vh * 0.48;
  // Narrow band = upcoming stays hidden; still enough runway to feel gradual
  const fadeStart = vh * 0.72;
  const fadeEnd = focusY;

  const y = rect.top + rect.height / 2;

  if (y <= fadeEnd) return 1;
  if (y >= fadeStart) return DIM;

  const t = (y - fadeEnd) / (fadeStart - fadeEnd);
  // Ease so it rises slowly then finishes
  return DIM + (1 - DIM) * (1 - smoothstep(t));
}

export default function ScrollRevealStory() {
  const lineRefs = useRef<(HTMLElement | null)[]>([]);
  const [opacities, setOpacities] = useState<number[]>(() =>
    blocks.map(() => DIM),
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  const update = useCallback(() => {
    const vh = window.innerHeight;
    const next = new Array(blocks.length).fill(DIM);

    for (const beat of BEATS) {
      const anchor = lineRefs.current[beat[0]];
      if (!anchor) continue;
      const opacity = beatOpacityFromAnchor(anchor, vh, reducedMotion);
      for (const index of beat) next[index] = opacity;
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

    // First paint after refs attach
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
      className="grid-bg px-6 pt-[20vh] pb-[35vh] sm:px-8"
      aria-label="Why you need a Blueprint"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 sm:gap-5">
        {blocks.map((block, index) => {
          const opacity = opacities[index] ?? DIM;
          const revealed = opacity > 0.7;

          return (
            <p
              key={block.id}
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className="w-full text-center font-mono text-base leading-relaxed text-black sm:text-lg md:text-xl md:leading-relaxed"
              style={{
                opacity,
                filter: opacity < 0.4 ? "blur(1.5px)" : "none",
              }}
            >
              {renderContent(block.content, revealed)}
            </p>
          );
        })}

        {(() => {
          const lastOpacity = opacities[blocks.length - 1] ?? DIM;
          const revealed = lastOpacity > 0.7;
          return (
            <div
              className="flex w-full justify-center pt-4"
              style={{ opacity: lastOpacity }}
            >
              <Link
                href="/form"
                className="btn-brutal btn-brutal-primary inline-block min-w-[180px] px-8 py-3.5 text-sm font-semibold text-black"
                tabIndex={revealed ? 0 : -1}
                aria-hidden={!revealed}
              >
                Get your Blueprint →
              </Link>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
