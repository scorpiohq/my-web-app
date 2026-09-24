"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BlueprintLoadingBridge from "@/components/gouti/BlueprintLoadingBridge";
import { journeyFadeIn } from "@/components/gouti/journeyFade";

const START_LOADING_HOLD_MS = 1800;
const START_LOADING_FADE_MS = 400;

const FLOW_DURATION_MS = 2400;

const steps = [
  {
    title: "Preparing Your Blueprint",
    subtitle: "Getting everything ready for you",
    icon: "bulb" as const,
  },
  {
    title: "Answer 18 questions",
    subtitle: "Share your goals, strengths, and starting point",
    icon: "1" as const,
  },
  {
    title: "AI goes to work.",
    subtitle: "We build your personalized creator report",
    icon: "2" as const,
  },
  {
    title: "Download your Blueprint...",
    subtitle: "Your report, delivered instantly",
    icon: "download" as const,
  },
];

function StepIcon({
  icon,
  state,
  soft,
}: {
  icon: (typeof steps)[number]["icon"];
  state: "completed" | "active" | "pending";
  soft?: boolean;
}) {
  const base =
    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 ease-out";

  const stateClass =
    state === "completed"
      ? "border-2 border-black bg-[#FFC940] text-black shadow-[2px_2px_0_0_#000]"
      : state === "active"
        ? "border-2 border-black bg-white text-black shadow-[2px_2px_0_0_#000]"
        : "border border-[#C8C8C8] bg-white text-[#999]";

  return (
    <div className={`${base} ${stateClass}`}>
      {state === "completed" ? (
        <span className="text-xs font-bold">✓</span>
      ) : icon === "bulb" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3 10v2h6v-2a6 6 0 0 0-3-10z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : icon === "download" ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v12m0 0l4-4m-4 4L8 11M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <span
          className="text-sm font-bold"
          style={{
            fontFamily: soft
              ? 'var(--font-bricolage), "Bricolage Grotesque", sans-serif'
              : "var(--font-hero)",
          }}
        >
          {icon}
        </span>
      )}
    </div>
  );
}

const bricolage = {
  fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", sans-serif',
} as const;

const dmSans = {
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
} as const;

function GoutiFormStart({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"loading" | "start">("loading");
  const [loaderOut, setLoaderOut] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    journeyFadeIn(280);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const holdMs = reduced ? 200 : START_LOADING_HOLD_MS;
    const fadeMs = reduced ? 0 : START_LOADING_FADE_MS;
    const id = window.setTimeout(() => {
      setLoaderOut(true);
      window.setTimeout(() => setPhase("start"), fadeMs);
    }, holdMs);
    return () => window.clearTimeout(id);
  }, []);

  function handleStart() {
    setFadeOut(true);
    window.setTimeout(onComplete, 420);
  }

  if (phase === "loading") {
    return (
      <div
        className={`transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          loaderOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <BlueprintLoadingBridge holdMs={START_LOADING_HOLD_MS} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto bg-white px-6 py-16">
      <div
        className={`gouti-instructions flex w-full max-w-[26rem] flex-col items-start text-left ${
          fadeOut ? "gouti-instructions-leaving" : ""
        }`}
      >
        <Image
          src="/logo-dp.svg"
          alt="Your Blueprint"
          width={64}
          height={64}
          className="gouti-instructions-logo mt-6 h-16 w-16"
          style={{ animationDelay: "40ms" }}
          priority
        />

        <p
          className="gouti-instructions-item mt-6 text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-[#121212] sm:text-[1.5rem]"
          style={{ ...bricolage, animationDelay: "140ms" }}
        >
          Hi Creator,
        </p>
        <p
          className="gouti-instructions-item mt-2 text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-[#121212] sm:text-[1.5rem]"
          style={{ ...bricolage, animationDelay: "220ms" }}
        >
          Alright, let&apos;s figure you out.
        </p>

        <p
          className="gouti-instructions-item mt-6 text-[15px] leading-relaxed text-[#5A5A5A] sm:text-base"
          style={{ ...dmSans, animationDelay: "320ms" }}
        >
          but without you, I can&apos;t help you, and without me, you
          can&apos;t start. that&apos;s why you haven&apos;t.
        </p>
        <p
          className="gouti-instructions-item mt-4 text-[15px] leading-relaxed text-[#5A5A5A] sm:text-base"
          style={{ ...dmSans, animationDelay: "415ms" }}
        >
          so we&apos;re made for each other.. 🤝
        </p>

        <button
          type="button"
          onClick={handleStart}
          className="gouti-instructions-item btn-brutal btn-brutal-primary mt-8 max-w-full px-8 py-3 text-sm font-semibold text-black"
          style={{ ...bricolage, animationDelay: "520ms" }}
        >
          LET&apos;S FIGURE YOU OUT
        </button>
      </div>
    </div>
  );
}

export function GoutiInstructionsStep({
  title,
  points,
  onStart,
  disabled,
}: {
  title: string;
  points: string[];
  onStart: () => void;
  disabled?: boolean;
}) {
  const [leaving, setLeaving] = useState(false);

  function handleStart() {
    if (leaving || disabled) return;
    setLeaving(true);
    onStart();
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto bg-white px-6 py-16">
      <div
        className={`gouti-instructions flex w-full max-w-[26rem] flex-col items-start text-left ${
          leaving ? "gouti-instructions-leaving" : ""
        }`}
      >
        <Image
          src="/logo-dp.svg"
          alt="Your Blueprint"
          width={64}
          height={64}
          className="gouti-instructions-logo mt-6 h-16 w-16"
          style={{ animationDelay: "40ms" }}
          priority
        />

        <h1
          className="gouti-instructions-item mt-6 whitespace-nowrap text-[clamp(15px,4.1vw,1.35rem)] font-semibold leading-none tracking-[-0.03em] text-[#121212]"
          style={{ ...bricolage, animationDelay: "140ms" }}
        >
          {title}
        </h1>

        <ul className="mt-6 flex flex-col gap-3.5">
          {points.map((opt, i) => (
            <li
              key={opt}
              className="gouti-instructions-item flex items-start gap-3 text-[15px] leading-relaxed text-[#5A5A5A] sm:text-base"
              style={{ ...dmSans, animationDelay: `${260 + i * 95}ms` }}
            >
              <span
                className="gouti-instructions-star mt-0.5 shrink-0 text-[#888]"
                style={{ animationDelay: `${320 + i * 95}ms` }}
                aria-hidden="true"
              >
                ✦
              </span>
              <span>
                {opt.includes("Hit Start") ? (
                  <>
                    Ready? Hit <em>Start</em>
                    {" "}
                    and let&apos;s go.
                  </>
                ) : (
                  opt
                )}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleStart}
          disabled={disabled || leaving}
          className="gouti-instructions-item btn-brutal btn-brutal-primary mt-8 max-w-full px-8 py-3 text-sm font-semibold text-black disabled:opacity-60"
          style={{ ...bricolage, animationDelay: `${260 + points.length * 95 + 80}ms` }}
        >
          START
        </button>
      </div>
    </div>
  );
}

function DefaultJourneyIntro({ onComplete }: { onComplete: () => void }) {
  const [lineProgress, setLineProgress] = useState(0);
  const [step0Done, setStep0Done] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / FLOW_DURATION_MS, 1);
      setLineProgress(progress * 100);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setStep0Done(true);
        setShowNext(true);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  function handleNext() {
    setFadeOut(true);
    setTimeout(onComplete, 450);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[300px] sm:max-w-[320px]">
        <div
          className={`border-2 border-black bg-white px-5 py-6 shadow-[6px_6px_0_0_#000] transition-opacity duration-500 sm:px-6 sm:py-7 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {steps.map((step, index) => {
            const isStep0 = index === 0;
            const isCompleted = isStep0 && step0Done;
            const isActive = isStep0 && !step0Done;

            let state: "completed" | "active" | "pending" = "pending";
            if (isCompleted) state = "completed";
            else if (isActive) state = "active";

            return (
              <div key={step.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <StepIcon icon={step.icon} state={state} />
                  {index < steps.length - 1 && (
                    <div className="relative my-0.5 h-9 w-0.5 overflow-hidden bg-[#E0E0E0]">
                      {index === 0 ? (
                        <div
                          className="absolute inset-x-0 top-0 bg-black transition-[height] duration-100 ease-linear"
                          style={{ height: `${lineProgress}%` }}
                        />
                      ) : null}
                    </div>
                  )}
                </div>

                <div className={`min-w-0 flex-1 ${index < steps.length - 1 ? "pb-4" : "pb-0"} pt-0.5`}>
                  <p
                    className={`text-sm font-semibold leading-snug transition-colors duration-500 ${
                      isCompleted || isActive ? "text-black" : "text-[#999]"
                    }`}
                  >
                    {step.title}
                    {isCompleted && isStep0 && (
                      <span className="ml-1 text-black">✓</span>
                    )}
                  </p>
                  <p
                    className={`mt-0.5 text-xs leading-snug transition-colors duration-500 ${
                      isCompleted || isActive ? "text-[#6B6B6B]" : "text-[#BDBDBD]"
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </div>
              </div>
            );
          })}

          <div
            className={`mt-5 flex justify-center transition-all duration-500 ${
              showNext ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={handleNext}
              className="btn-brutal btn-brutal-primary px-8 py-3 text-sm font-semibold text-black"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlueprintJourneyIntro({
  onComplete,
  variant = "default",
}: {
  onComplete: () => void;
  variant?: "default" | "soft";
}) {
  if (variant === "soft") {
    return <GoutiFormStart onComplete={onComplete} />;
  }

  return <DefaultJourneyIntro onComplete={onComplete} />;
}
