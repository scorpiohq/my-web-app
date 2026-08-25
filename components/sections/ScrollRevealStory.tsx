"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

type StoryBlock = {
  id: string;
  content: ReactNode | ((revealed: boolean) => ReactNode);
  cta?: boolean;
};

const blocks: StoryBlock[] = [
  { id: "1", content: "You keep opening the app." },
  { id: "2", content: "Then closing it again." },
  { id: "3", content: "Not because you're lazy." },
  {
    id: "4",
    content: "Because you don't know what to post, or why, or for who.",
  },
  {
    id: "5",
    content: <em>“I'll start once I figure out my niche.”</em>,
  },
  { id: "6", content: "You've said that for months." },
  { id: "7", content: "More research isn't the answer." },
  { id: "8", content: "You've already researched enough." },
  {
    id: "9",
    content: (revealed) => (
      <>
        What you don&apos;t have is{" "}
        <span className={revealed ? "text-[#FFA126]" : undefined}>clarity</span>{" "}
        — one clear direction, pointing somewhere real.
      </>
    ),
  },
  { id: "10", content: "That's what a Blueprint gives you." },
  { id: "11", content: "18 honest questions." },
  {
    id: "12",
    content:
      "Your direction. Your strengths. What's actually been holding you back.",
  },
  { id: "13", content: "Your first move — named, not guessed." },
  { id: "14", content: "Not another idea." },
  {
    id: "15",
    content: (revealed) => (
      <>
        The one that&apos;s{" "}
        <span className={revealed ? "text-[#FFA126]" : undefined}>
          already yours
        </span>
        .
      </>
    ),
  },
  { id: "16", content: "Get your Blueprint.", cta: true },
];

function renderContent(
  content: StoryBlock["content"],
  revealed: boolean,
): ReactNode {
  return typeof content === "function" ? content(revealed) : content;
}

export default function ScrollRevealStory() {
  const sectionRef = useRef<HTMLElement>(null);
  // First line starts revealed so the front of the section isn't empty/blank
  const [revealedIds, setRevealedIds] = useState<Set<string>>(
    () => new Set(["1"]),
  );

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-story-id]");
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setRevealedIds((prev) => {
          let changed = false;
          const next = new Set(prev);
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const id = entry.target.getAttribute("data-story-id");
            if (!id || next.has(id)) continue;
            next.add(id);
            changed = true;
          }
          return changed ? next : prev;
        });
      },
      {
        root: null,
        // Reveal later in the viewport — more scroll before each line unlocks
        rootMargin: "0px 0px -42% 0px",
        threshold: 0.35,
      },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grid-bg px-6 pt-[88px] pb-24 sm:px-8 sm:pb-28"
      aria-label="Why you need a Blueprint"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        {blocks.map((block) => {
          const revealed = revealedIds.has(block.id);
          const stateClass = revealed
            ? "text-black opacity-100 blur-none"
            : "text-[#c8c8c8] opacity-60 blur-[2px]";

          if (block.cta) {
            return (
              <div
                key={block.id}
                data-story-id={block.id}
                className="flex w-full justify-center py-2"
              >
                <Link
                  href="/form"
                  className={`btn-brutal btn-brutal-primary inline-block px-8 py-3.5 font-mono text-base font-semibold tracking-wide text-black sm:px-10 sm:py-4 sm:text-lg ${stateClass} transition-[opacity,color,filter] duration-[2000ms] delay-150 ease-out`}
                >
                  Get your Blueprint.
                </Link>
              </div>
            );
          }

          return (
            <p
              key={block.id}
              data-story-id={block.id}
              className={`w-full text-center font-mono text-base leading-relaxed transition-[opacity,color,filter] duration-[2000ms] delay-150 ease-out sm:text-lg md:text-xl md:leading-relaxed ${stateClass}`}
            >
              {renderContent(block.content, revealed)}
            </p>
          );
        })}
      </div>
    </section>
  );
}
