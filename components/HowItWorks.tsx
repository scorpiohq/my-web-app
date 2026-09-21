"use client";

import { useEffect, useState, type ReactNode } from "react";
import ReportPreviewStack from "@/components/ReportPreviewStack";
import { Reveal } from "@/components/gouti/Reveal";

const q6Options = [
  "Studying and looking to build something online.",
  "Working, but looking for more freedom.",
  "I'm ready to start, but don't know where to begin.",
  "I'm currently not working on anything, but I want to build something online.",
  "Just curious to see if this is the right path for me.",
] as const;

const platformOptions = [
  "YouTube",
  "TikTok",
  "Instagram",
  "Threads / X",
  "Not sure yet",
] as const;

const SITUATION_SELECTED_INDEX = 2;
const PLATFORM_SELECTED_INDEX = 2; // Instagram

type HowItWorksVariant = "default" | "soft";
type Step1Preview = "situation" | "platform";

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

function Step1FormMock({
  soft,
  preview = "situation",
}: {
  soft?: boolean;
  preview?: Step1Preview;
}) {
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

  const isPlatform = preview === "platform";
  const options = isPlatform ? platformOptions : q6Options;
  const questionNumber = isPlatform ? 14 : 6;
  const questionText = isPlatform
    ? "Which platform do you want to start on?"
    : "How would you describe your current situation right now?";
  const selectedIndex = isPlatform
    ? PLATFORM_SELECTED_INDEX
    : SITUATION_SELECTED_INDEX;

  return (
    <div
      className={
        soft
          ? "w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)] sm:p-6"
          : "w-full border-2 border-black bg-white p-4 shadow-[6px_6px_0_0_#000] sm:p-5"
      }
    >
      {soft ? (
        <div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
      ) : null}
      <div className="mb-4 flex items-center gap-2">
        <span
          className={`flex h-7 w-7 items-center justify-center text-xs font-medium text-white ${
            soft ? "rounded-lg bg-[#FFA126]" : "rounded-md bg-[#FFA126]"
          }`}
        >
          {questionNumber}
        </span>
        <p className="text-left text-sm font-medium leading-snug text-black sm:text-[15px]">
          {questionText}
        </p>
      </div>
      <ul className="space-y-2">
        {options.map((option, index) => {
          const selected = index === selectedIndex;
          return (
            <li
              key={option}
              className={`relative overflow-visible flex items-start gap-2.5 border px-3 py-2.5 text-left transition ${
                soft ? "rounded-xl" : ""
              } ${
                selected
                  ? soft
                    ? "border-[#FFA126]/50 bg-[#FFF8F0]"
                    : "border-[#FFA126] bg-[#FFF3E0]"
                  : soft
                    ? "border-black/[0.06] bg-[#FAFAFA]"
                    : "border-black/15 bg-white"
              } ${
                selected && pulse
                  ? soft
                    ? "shadow-[0_8px_20px_-12px_rgba(255,161,38,0.55)]"
                    : "scale-[1.01] shadow-[2px_2px_0_0_#FFA126]"
                  : ""
              }`}
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

function Step2ProgressMock({ soft }: { soft?: boolean }) {
  const [secondsLeft, setSecondsLeft] = useState(7);
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
      className={`flex h-[72px] w-[72px] rotate-[8deg] flex-col items-center justify-center bg-white sm:h-[80px] sm:w-[80px] ${
        soft
          ? "rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
          : "shadow-[4px_8px_18px_rgba(0,0,0,0.18)]"
      }`}
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
    <div className={`w-full ${soft ? "px-1 py-4 sm:px-2 sm:py-6" : "px-2 py-6 sm:px-4 sm:py-8"}`}>
      {soft ? (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl bg-[#FFF8F0] px-3.5 py-2.5 sm:px-4">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[#C47A12] sm:text-xs">
            BLUEPRINT ENGINE
          </p>
          <p className="text-[11px] font-medium text-[#C47A12]/80 sm:text-xs">
            {ready ? "Ready" : "Building…"}
          </p>
        </div>
      ) : null}
      <ReportPreviewStack ready={ready} stamp={stamp} />
      <div
        className={`mt-5 text-center transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p
          className={`text-base text-black sm:text-lg ${
            soft ? "font-semibold tracking-[-0.02em]" : ""
          }`}
          style={soft ? undefined : { fontFamily: "var(--font-garamond)" }}
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

function Step3DownloadMock({ soft }: { soft?: boolean }) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setPressed((p) => !p), 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={
        soft
          ? "w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)] sm:p-6"
          : "w-full border-2 border-black bg-white p-5 shadow-[6px_6px_0_0_#000] sm:p-6"
      }
    >
      <p className="mb-1 text-[10px] font-semibold tracking-[0.14em] text-[#999]">
        YOUR BLUEPRINT
      </p>
      <p
        className={`mb-4 text-xl tracking-wide text-black sm:text-2xl ${
          soft ? "font-bold tracking-[-0.02em]" : ""
        }`}
        style={soft ? undefined : { fontFamily: "var(--font-hero)" }}
      >
        Ready to download
      </p>
      <div
        className={`mb-5 p-4 ${
          soft
            ? "rounded-xl border border-black/[0.05] bg-[#FAFAFA]"
            : "border border-black/10 bg-[#FAFAFA]"
        }`}
      >
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
          pressed && !soft
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
  soft,
}: {
  eyebrow: string;
  title: string;
  description: string;
  soft?: boolean;
}) {
  return (
    <div className="relative z-10 min-w-0 text-left">
      <div className={`mb-3 flex items-center gap-3 ${soft ? "mb-3.5" : ""}`}>
        {soft ? null : <span className="h-px w-6 bg-black" aria-hidden="true" />}
        <p
          className={
            soft
              ? "text-[12px] font-semibold tracking-[0.14em] text-[#FFA126] sm:text-[13px]"
              : "text-[11px] font-semibold tracking-[0.16em] text-black sm:text-xs"
          }
        >
          {soft ? `— ${eyebrow}` : eyebrow}
        </p>
      </div>
      <h3
        className={`mb-3 leading-tight text-black ${
          soft
            ? "text-[clamp(1.65rem,3.2vw,2.35rem)] font-extrabold tracking-[-0.03em]"
            : "text-[clamp(1.6rem,3.5vw,2.15rem)] tracking-wide"
        }`}
        style={soft ? undefined : { fontFamily: "var(--font-hero)" }}
      >
        {title}
      </h3>
      <p
        className={`w-full leading-relaxed text-[#6B6B6B] ${
          soft ? "max-w-md text-[15px] sm:text-base" : "text-sm sm:text-base"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

function GiantStepNumber({
  value,
  soft,
}: {
  value: string;
  soft?: boolean;
}) {
  return (
    <span
      className={`pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2 select-none leading-none tracking-tight ${
        soft
          ? "text-[clamp(5.5rem,13vw,8rem)] font-extrabold text-[#FFA126]/[0.14]"
          : "text-[clamp(5.5rem,14vw,8.5rem)] text-black/[0.07]"
      }`}
      style={soft ? undefined : { fontFamily: "var(--font-hero)" }}
      aria-hidden="true"
    >
      {value}
    </span>
  );
}

/** Standalone step 1 (answer mock) — used on gouti landing after the inline review. */
export function HowItWorksStep1({
  soft = false,
  preview = "platform",
  className = "",
}: {
  soft?: boolean;
  preview?: Step1Preview;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal delayMs={60}>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative pl-[5.5rem] sm:pl-28 lg:pl-32">
            <GiantStepNumber value="01" soft={soft} />
            <StepCopy
              soft={soft}
              eyebrow="ANSWER"
              title="Answer 18 Simple questions."
              description="Questions about you, your goals, interests, and your situation, so it build the blueprint about you."
            />
          </div>
          <Step1FormMock soft={soft} preview={preview} />
        </div>
      </Reveal>
    </div>
  );
}

export default function HowItWorks({
  variant = "default",
  step1Preview = "situation",
  step2Eyebrow = "02 · THE ENGINE",
  heading = "HOW 'YOUR BLUEPRINT' WORKS..",
  caption,
  showBadge = true,
  showStep1 = true,
}: {
  variant?: HowItWorksVariant;
  /** Question shown in the step 1 form mock. Default keeps production as-is. */
  step1Preview?: Step1Preview;
  /** Eyebrow label for step 2. Default keeps production as-is. */
  step2Eyebrow?: string;
  /** Main section heading (default variant). Soft variant keeps its own copy. */
  heading?: ReactNode;
  /** Small line under the heading (e.g. gouti landing peek-style caption). */
  caption?: ReactNode;
  /** Brutal / soft “HOW IT WORKS” badge above the title. */
  showBadge?: boolean;
  /** When false, skip step 1 (e.g. already shown earlier on the page). */
  showStep1?: boolean;
}) {
  const soft = variant === "soft";

  return (
    <section
      id="how-it-works"
      className={
        soft
          ? "bg-[#F7F7F7] px-6 py-16 sm:px-8 sm:py-20 lg:py-24"
          : "grid-bg -mt-[18px] px-6 py-12 sm:px-8 sm:py-16"
      }
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <Reveal className="flex w-full flex-col items-center">
          {showBadge ? (
            soft ? (
              <p className="mb-4 text-[12px] font-semibold tracking-[0.16em] text-[#FFA126] sm:mb-5 sm:text-[13px]">
                — HOW IT WORKS
              </p>
            ) : (
              <span className="mb-6 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-7 sm:text-xs">
                HOW IT WORKS
              </span>
            )
          ) : null}

          <h2
            className={
              soft
                ? "mb-3 max-w-3xl text-center text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-black"
                : caption
                  ? "mb-3 max-w-3xl text-center text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black sm:mb-4"
                  : "mb-12 max-w-3xl text-center text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black sm:mb-14"
            }
            style={soft ? undefined : { fontFamily: "var(--font-hero)" }}
          >
            {soft ? "Your Blueprint, built for you." : heading}
          </h2>

          {soft ? (
            <p className="mb-14 max-w-xl text-center text-[15px] leading-relaxed text-[#6B6B6B] sm:mb-16 sm:text-base">
              Answer a few questions. The AI does the thinking. You get a clear
              creator path — not a generic template.
            </p>
          ) : caption ? (
            <p
              className="mb-12 max-w-xl text-center text-[14px] leading-snug text-[#5A5A5A] sm:mb-14 sm:text-[15px]"
              style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
            >
              {caption}
            </p>
          ) : null}
        </Reveal>

        <div
          className={`flex w-full flex-col ${
            soft ? "gap-14 sm:gap-16 lg:gap-20" : "gap-16 sm:gap-20 lg:gap-24"
          }`}
        >
          {/* Step 01 */}
          {showStep1 ? (
            <HowItWorksStep1 soft={soft} preview={step1Preview} />
          ) : null}

          {/* Step 02 — full-width engine card (UGC Tank pattern) */}
          <Reveal delayMs={80}>
            <div
              className={
                soft
                  ? "w-full overflow-hidden rounded-[1.75rem] border border-black/[0.05] bg-white shadow-[0_24px_60px_-28px_rgba(0,0,0,0.18)]"
                  : "w-full border-2 border-black bg-white shadow-[8px_8px_0_0_#000]"
              }
            >
              <div
                className={
                  soft
                    ? "px-6 pt-9 sm:px-10 sm:pt-11 lg:px-12 lg:pt-12"
                    : "px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10"
                }
              >
                <StepCopy
                  soft={soft}
                  eyebrow={step2Eyebrow}
                  title="We Map What's Already Working For You."
                  description="Your answers get compared against what actually works for creators like you — what you're already good at, and what's been quietly holding you back. Then your Blueprint gets built. No templates. No generic output."
                />
              </div>
              <div
                className={
                  soft
                    ? "mt-7 border-t border-black/[0.05] px-4 pb-6 sm:mt-9 sm:px-8 sm:pb-8 lg:px-10"
                    : "mt-6 border-t border-black/10 px-2 pb-2 sm:mt-8 sm:px-4 sm:pb-4"
                }
              >
                <Step2ProgressMock soft={soft} />
              </div>
            </div>
          </Reveal>

          {/* Step 03 */}
          <Reveal delayMs={100}>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="relative pl-[5.5rem] sm:pl-28 lg:pl-32">
                <GiantStepNumber value="03" soft={soft} />
                <StepCopy
                  soft={soft}
                  eyebrow="03 — DOWNLOAD"
                  title="Your Blueprint, Ready."
                  description="Your creator identity. Your strengths. What's been holding you back. And your first move, from exactly where you are. All built for you."
                />
              </div>
              <Step3DownloadMock soft={soft} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
