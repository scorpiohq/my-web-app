"use client";

import { useEffect, useState } from "react";
import ReportPreviewStack from "@/components/ReportPreviewStack";

const q6Options = [
  "Studying and looking to build something online.",
  "Working, but looking for more freedom.",
  "I'm ready to start, but don't know where to begin.",
  "I'm currently not working on anything, but I want to build something online.",
  "Just curious to see if this is the right path for me.",
] as const;

const SELECTED_INDEX = 2;

function PointerCursor({ clicking }: { clicking: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/hand-pointer-cursor.png"
      alt=""
      width={26}
      height={26}
      aria-hidden="true"
      className={`block h-[26px] w-[26px] shrink-0 pointer-events-none select-none transition-transform duration-150 ${
        clicking ? "translate-y-0.5 scale-95" : "translate-y-0 scale-100"
      }`}
      draggable={false}
    />
  );
}

function Step1FormMock() {
  const [pulse, setPulse] = useState(true);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    let clickTimeout: number | undefined;
    const id = window.setInterval(() => {
      setClicking(true);
      clickTimeout = window.setTimeout(() => {
        setClicking(false);
        setPulse((p) => !p);
      }, 160);
    }, 1600);
    return () => {
      window.clearInterval(id);
      if (clickTimeout) window.clearTimeout(clickTimeout);
    };
  }, []);

  return (
    <div className="w-full border-2 border-black bg-white p-4 shadow-[6px_6px_0_0_#000] sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FFA126] text-xs font-medium text-white">
          6
        </span>
        <p className="text-left text-sm font-medium leading-snug text-black sm:text-[15px]">
          How would you describe your current situation right now?
        </p>
      </div>
      <ul className="space-y-2">
        {q6Options.map((option, index) => {
          const selected = index === SELECTED_INDEX;
          return (
            <li
              key={option}
              className={`relative overflow-visible flex items-start gap-2.5 border px-3 py-2.5 text-left transition ${
                selected
                  ? "border-[#FFA126] bg-[#FFF3E0]"
                  : "border-black/15 bg-white"
              } ${selected && pulse ? "scale-[1.01] shadow-[2px_2px_0_0_#FFA126]" : ""}`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[10px] font-semibold ${
                  selected
                    ? "border-[#FFA126] bg-[#FFA126] text-white"
                    : "border-[#FFA126] text-[#FFA126]"
                }`}
              >
                {selected ? "✓" : ""}
              </span>
              <span
                className={`relative z-0 text-xs leading-snug sm:text-sm ${
                  selected ? "font-medium text-[#FFA126]" : "text-[#555]"
                }`}
              >
                {option}
              </span>
              {selected ? (
                <span
                  className="pointer-events-none absolute z-50 rotate-[-8deg] left-[4rem] top-[1.35rem] sm:left-[4.25rem] sm:top-[1.45rem]"
                  aria-hidden="true"
                >
                  <PointerCursor clicking={clicking} />
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const STATUS_MESSAGES = [
  {
    title: "Building Your Blueprint...",
    subtitle: "Usually takes 1–2 minutes.",
  },
  {
    title: "Understanding Your Answers...",
    subtitle: "Finding what makes you unique.",
  },
  {
    title: "Connecting the Dots...",
    subtitle: "Matching your strengths, goals, and interests.",
  },
  {
    title: "Almost Ready...",
    subtitle: "Preparing your blueprint.",
  },
  {
    title: "Your Blueprint is Ready.",
    subtitle: "",
  },
] as const;

function Step2ProgressMock() {
  const [secondsLeft, setSecondsLeft] = useState(18);
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setReady(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [ready]);

  useEffect(() => {
    if (ready) {
      setVisible(true);
      return;
    }

    const delay = 2200 + Math.floor(Math.random() * 1200);
    const fadeOutTimer = window.setTimeout(() => setVisible(false), delay - 280);
    const nextTimer = window.setTimeout(() => {
      setStatusIndex((index) =>
        Math.min(index + 1, STATUS_MESSAGES.length - 2),
      );
      setVisible(true);
    }, delay);

    return () => {
      window.clearTimeout(fadeOutTimer);
      window.clearTimeout(nextTimer);
    };
  }, [statusIndex, ready]);

  const current = ready
    ? STATUS_MESSAGES[STATUS_MESSAGES.length - 1]
    : STATUS_MESSAGES[statusIndex];

  const stamp = ready ? undefined : (
    <div
      className="flex h-[72px] w-[72px] rotate-[8deg] flex-col items-center justify-center bg-white shadow-[4px_8px_18px_rgba(0,0,0,0.18)] sm:h-[80px] sm:w-[80px]"
      style={{ fontFamily: "var(--font-garamond)" }}
      aria-hidden="true"
    >
      <span
        key={secondsLeft}
        className="progress-countdown-number text-[28px] leading-none text-black sm:text-[32px]"
      >
        {String(secondsLeft).padStart(2, "0")}
      </span>
      <span className="mt-1.5 max-w-[64px] text-center text-[9px] leading-tight text-black sm:mt-2 sm:text-[10px]">
        seconds to go.
      </span>
    </div>
  );

  return (
    <div className="w-full px-2 py-6 sm:px-4 sm:py-8">
      <ReportPreviewStack ready={ready} stamp={stamp} />
      <div
        className={`mt-5 text-center transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p
          className="text-base text-black sm:text-lg"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          {current.title}
        </p>
        {current.subtitle ? (
          <p className="mt-1 text-sm text-[#6B6B6B]">{current.subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

function Step3DownloadMock() {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setPressed((p) => !p), 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="w-full border-2 border-black bg-white p-5 shadow-[6px_6px_0_0_#000] sm:p-6">
      <p className="mb-1 text-[10px] font-semibold tracking-[0.14em] text-[#999]">
        YOUR BLUEPRINT
      </p>
      <p
        className="mb-4 text-xl tracking-wide text-black sm:text-2xl"
        style={{ fontFamily: "var(--font-hero)" }}
      >
        Ready to download
      </p>
      <div className="mb-5 border border-black/10 bg-[#FAFAFA] p-4">
        <div className="mb-2 h-2 w-[70%] bg-[#E8E8E8]" />
        <div className="mb-3 h-2.5 w-[45%] bg-[#FFD9A8]" />
        <div className="space-y-1.5">
          <div className="h-1.5 w-full bg-[#EEEEEE]" />
          <div className="h-1.5 w-[88%] bg-[#EEEEEE]" />
          <div className="h-1.5 w-[72%] bg-[#EEEEEE]" />
        </div>
      </div>
      <button
        type="button"
        tabIndex={-1}
        className={`btn-brutal btn-brutal-primary inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-black transition ${
          pressed
            ? "translate-x-[1px] translate-y-[1px] shadow-[2px_2px_0_0_#000]"
            : ""
        }`}
        aria-hidden="true"
      >
        DOWNLOAD YOUR BLUEPRINT
      </button>
    </div>
  );
}

function StepCopy({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative z-10 min-w-0 text-left">
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px w-6 bg-black" aria-hidden="true" />
        <p className="text-[11px] font-semibold tracking-[0.16em] text-black sm:text-xs">
          {eyebrow}
        </p>
      </div>
      <h3
        className="mb-3 text-[clamp(1.6rem,3.5vw,2.15rem)] leading-tight tracking-wide text-black"
        style={{ fontFamily: "var(--font-hero)" }}
      >
        {title}
      </h3>
      <p className="w-full text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
        {description}
      </p>
    </div>
  );
}

function GiantStepNumber({ value }: { value: string }) {
  return (
    <span
      className="pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2 select-none text-[clamp(5.5rem,14vw,8.5rem)] leading-none tracking-tight text-black/[0.07]"
      style={{ fontFamily: "var(--font-hero)" }}
      aria-hidden="true"
    >
      {value}
    </span>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="grid-bg -mt-[18px] px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <span className="mb-6 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-7 sm:text-xs">
          HOW IT WORKS
        </span>

        <h2
          className="mb-12 max-w-3xl text-center text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black sm:mb-14"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          A SIMPLE 3-STEP PROCESS
        </h2>

        <div className="flex w-full flex-col gap-16 sm:gap-20 lg:gap-24">
          {/* Step 01 */}
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative pl-[5.5rem] sm:pl-28 lg:pl-32">
              <GiantStepNumber value="01" />
              <StepCopy
                eyebrow="ANSWER"
                title="Answer 18 Simple questions."
                description="Questions about you, your goals, interests, and your situation, so it build the blueprint about you."
              />
            </div>
            <Step1FormMock />
          </div>

          {/* Step 02 — one section: text on top, animation below (no nested square) */}
          <div className="w-full border-2 border-black bg-white shadow-[8px_8px_0_0_#000]">
            <div className="px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10">
              <StepCopy
                eyebrow="02 · THE ENGINE"
                title="The AI does the thinking."
                description="The moment you submit, two rounds of reasoning starts -  first understanding who you are, what you're already good at, and what's been holding you back. Then it builds your personalized Blueprint. No templates. No generic output."
              />
            </div>
            <div className="mt-6 border-t border-black/10 px-2 pb-2 sm:mt-8 sm:px-4 sm:pb-4">
              <Step2ProgressMock />
            </div>
          </div>

          {/* Step 03 — keep download mock as-is */}
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative pl-[5.5rem] sm:pl-28 lg:pl-32">
              <GiantStepNumber value="03" />
              <StepCopy
                eyebrow="DOWNLOAD"
                title="Get your Blueprint."
                description="Your creator identity. Your strengths. What's been holding you back. And your first move from exactly where you are — all built for you."
              />
            </div>
            <Step3DownloadMock />
          </div>
        </div>
      </div>
    </section>
  );
}
