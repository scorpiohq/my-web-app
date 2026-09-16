"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReportPreviewStack from "@/components/ReportPreviewStack";
import JourneyEnter from "@/components/gouti/JourneyEnter";
import { journeyFadeTo } from "@/components/gouti/journeyFade";

const STATUS_MESSAGES = [
  "Finalizing your Creator Identity…",
  "Mapping your strengths and blockers…",
  "Writing your first move…",
  "Almost ready… Just finishing up.",
] as const;

const MIN_WAIT_MS = 18_000;
/** Preview / gouti test path — shorter so the flow can be reviewed quickly. */
const PREVIEW_WAIT_MS = 7_000;
/** Match report-animation status (“Reading your answers…”) */
const statusType = {
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
} as const;
const stickerType = { fontFamily: "var(--font-garamond)" } as const;

function padSeconds(value: number) {
  return String(value).padStart(2, "0");
}

type ReportStatus = "pending" | "generating" | "ready" | "failed";

function SecondsToGoSticker({ secondsLeft }: { secondsLeft: number }) {
  return (
    <div
      className="flex h-[86px] w-[86px] rotate-[8deg] flex-col items-center justify-center bg-white shadow-[4px_8px_18px_rgba(0,0,0,0.18)] sm:h-[96px] sm:w-[96px]"
      style={stickerType}
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
  const router = useRouter();
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reportStatus, setReportStatus] = useState<ReportStatus>("generating");
  const [pollError, setPollError] = useState<string | null>(null);
  const waitMs = preview ? PREVIEW_WAIT_MS : MIN_WAIT_MS;
  const [secondsLeft, setSecondsLeft] = useState(preview ? 7 : 18);
  const [minWaitDone, setMinWaitDone] = useState(false);

  const runWait = Boolean(submissionId) || preview;
  const isFailed = reportStatus === "failed";
  const isReady = preview
    ? minWaitDone
    : reportStatus === "ready" && minWaitDone;
  const showCountdown = runWait && !isReady && !isFailed && !minWaitDone;
  const current = STATUS_MESSAGES[statusIndex];
  const reportHref = submissionId
    ? `/report/${encodeURIComponent(submissionId)}`
    : "/gouti/report-preview";

  useEffect(() => {
    if (!runWait) {
      return;
    }

    const startedAt = Date.now();

    const tick = () => {
      const remainingMs = waitMs - (Date.now() - startedAt);
      const left = Math.max(0, Math.ceil(remainingMs / 1000));
      setSecondsLeft(left);

      if (remainingMs <= 0) {
        setMinWaitDone(true);
      }
    };

    tick();
    const interval = setInterval(() => {
      tick();
      if (Date.now() - startedAt >= waitMs) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [runWait, waitMs]);

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

    // Evenly pace all status lines across the wait so none get skipped.
    const stepMs = Math.max(900, Math.floor(waitMs / STATUS_MESSAGES.length));
    const timers: number[] = [];

    for (let i = 1; i < STATUS_MESSAGES.length; i++) {
      const at = stepMs * i;
      timers.push(
        window.setTimeout(() => setVisible(false), Math.max(0, at - 220)),
      );
      timers.push(
        window.setTimeout(() => {
          setStatusIndex(i);
          setVisible(true);
        }, at),
      );
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [isReady, isFailed, runWait, waitMs]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    setVisible(true);
  }, [isReady]);

  return (
    <JourneyEnter className="min-h-screen bg-white">
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
            key={isReady ? "ready" : isFailed ? "failed" : statusIndex}
            className={`progress-status-copy flex min-h-[3rem] w-full max-w-[22rem] items-center justify-center px-2 text-center sm:min-h-[3.25rem] sm:max-w-none ${
              visible ? "progress-status-visible" : "progress-status-hidden"
            }`}
          >
            {isFailed ? (
              <p
                className="text-[clamp(1rem,2vw,1.12rem)] font-medium leading-[1.35] tracking-[-0.025em] text-[#171717]"
                style={statusType}
              >
                We hit a snag building your Blueprint
              </p>
            ) : isReady ? (
              <button
                type="button"
                onClick={() =>
                  journeyFadeTo(reportHref, router, { durationMs: 480 })
                }
                className="btn-brutal btn-brutal-primary inline-block min-w-[220px] px-8 py-3.5 text-sm font-semibold tracking-wide text-black sm:min-w-[240px] sm:text-base"
              >
                OPEN MY BLUEPRINT
              </button>
            ) : (
              <p
                className="text-[clamp(1rem,2vw,1.12rem)] font-medium leading-[1.35] tracking-[-0.025em] text-[#171717]"
                style={statusType}
              >
                {current}
              </p>
            )}
          </div>

          {isFailed ? (
            <p
              className="mt-2 text-center text-sm leading-relaxed text-[#6B6B6B]"
              style={statusType}
            >
              Please refresh in a minute or contact support if this continues.
            </p>
          ) : null}

          {pollError ? (
            <p className="mt-3 text-center text-xs text-[#c0392b] sm:text-sm">
              {pollError}
            </p>
          ) : null}
        </div>
      </div>
    </div>
    </JourneyEnter>
  );
}
