"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ReportPreviewStack from "@/components/ReportPreviewStack";

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

const MIN_WAIT_MS = 18_000;
const garamond = { fontFamily: "var(--font-garamond)" } as const;

function randomDelayMs() {
  return 2000 + Math.floor(Math.random() * 3001);
}

function padSeconds(value: number) {
  return String(value).padStart(2, "0");
}

type ReportStatus = "pending" | "generating" | "ready" | "failed";

function SecondsToGoSticker({ secondsLeft }: { secondsLeft: number }) {
  return (
    <div
      className="flex h-[86px] w-[86px] rotate-[8deg] flex-col items-center justify-center bg-white shadow-[4px_8px_18px_rgba(0,0,0,0.18)] sm:h-[96px] sm:w-[96px]"
      style={garamond}
      aria-live="polite"
      aria-label={`${secondsLeft} seconds to go.`}
    >
      <span
        key={secondsLeft}
        className="progress-countdown-number text-[32px] leading-none text-black sm:text-[36px]"
      >
        {padSeconds(secondsLeft)}
      </span>
      <span className="mt-1 max-w-[72px] text-center text-[10px] leading-tight text-black sm:max-w-none sm:text-[11px] sm:whitespace-nowrap">
        seconds to go.
      </span>
    </div>
  );
}

export default function BlueprintProgressScreen({
  submissionId,
  preview = false,
}: {
  submissionId?: string;
  preview?: boolean;
}) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reportStatus, setReportStatus] = useState<ReportStatus>("generating");
  const [pollError, setPollError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(18);
  const [minWaitDone, setMinWaitDone] = useState(false);

  const runWait = Boolean(submissionId) || preview;
  const isFailed = reportStatus === "failed";
  const isReady = preview
    ? minWaitDone
    : reportStatus === "ready" && minWaitDone;
  const showCountdown = runWait && !isReady && !isFailed && !minWaitDone;
  const current = isReady
    ? STATUS_MESSAGES[STATUS_MESSAGES.length - 1]
    : STATUS_MESSAGES[statusIndex];
  const reportHref = submissionId
    ? `/report/${encodeURIComponent(submissionId)}`
    : "/261005-report-preview";

  useEffect(() => {
    if (!runWait) {
      return;
    }

    const startedAt = Date.now();

    const tick = () => {
      const remainingMs = MIN_WAIT_MS - (Date.now() - startedAt);
      const left = Math.max(0, Math.ceil(remainingMs / 1000));
      setSecondsLeft(left);

      if (remainingMs <= 0) {
        setMinWaitDone(true);
      }
    };

    tick();
    const interval = setInterval(() => {
      tick();
      if (Date.now() - startedAt >= MIN_WAIT_MS) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [runWait]);

  useEffect(() => {
    if (!submissionId || preview) {
      return;
    }

    const activeSubmissionId = submissionId;
    let cancelled = false;

    async function pollStatus() {
      try {
        const response = await fetch(
          `/api/report-status?submission_id=${encodeURIComponent(activeSubmissionId)}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          throw new Error("Could not check report status");
        }

        const payload = (await response.json()) as {
          reportStatus: ReportStatus;
        };

        if (cancelled) return;

        setReportStatus(payload.reportStatus);
        setPollError(null);
      } catch (error) {
        if (!cancelled) {
          setPollError(
            error instanceof Error
              ? error.message
              : "Could not check report status",
          );
        }
      }
    }

    pollStatus();
    const interval = setInterval(pollStatus, 3000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [submissionId, preview]);

  useEffect(() => {
    if (isReady || isFailed || !runWait) {
      return;
    }

    const delay = randomDelayMs();
    const fadeOutTimer = setTimeout(() => setVisible(false), delay - 280);

    const nextTimer = setTimeout(() => {
      setStatusIndex((index) =>
        Math.min(index + 1, STATUS_MESSAGES.length - 2),
      );
      setVisible(true);
    }, delay);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(nextTimer);
    };
  }, [statusIndex, isReady, isFailed, runWait]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    setVisible(true);
  }, [isReady]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
        <ReportPreviewStack
          ready={isReady}
          stamp={
            showCountdown ? (
              <SecondsToGoSticker secondsLeft={secondsLeft} />
            ) : undefined
          }
        />

        <div className="mt-10 flex w-full flex-col items-center sm:mt-12">
          <div
            key={isReady ? "ready" : statusIndex}
            className={`progress-status-copy min-h-[52px] w-full max-w-[22rem] px-2 text-center sm:min-h-[64px] sm:max-w-none ${
              visible ? "progress-status-visible" : "progress-status-hidden"
            }`}
          >
            <p
              className="text-[22px] font-normal leading-snug text-[#333] sm:text-[26px] lg:whitespace-nowrap lg:text-[28px]"
              style={garamond}
            >
              {isFailed ? "We hit a snag building your Blueprint" : current.title}
            </p>
            {isFailed ? (
              <p
                className="mt-2 text-sm italic leading-relaxed text-[#9A9A9A] sm:text-base"
                style={garamond}
              >
                Please refresh in a minute or contact support if this continues.
              </p>
            ) : current.subtitle ? (
              <p
                className="mt-2 text-sm italic leading-relaxed text-[#9A9A9A] sm:text-base lg:whitespace-nowrap"
                style={garamond}
              >
                {current.subtitle}
              </p>
            ) : null}
          </div>

          {pollError ? (
            <p className="mt-3 text-center text-xs text-[#c0392b] sm:text-sm">
              {pollError}
            </p>
          ) : null}

          <div
            className={`flex justify-center transition-all duration-500 ${
              isReady
                ? "mt-5 translate-y-0 opacity-100"
                : "pointer-events-none mt-0 h-0 translate-y-1 overflow-hidden opacity-0"
            }`}
          >
            <Link
              href={reportHref}
              className="btn-brutal btn-brutal-primary inline-block min-w-[220px] px-8 py-3.5 text-sm font-semibold tracking-wide text-black sm:min-w-[240px] sm:text-base"
            >
              Open My Blueprint →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
