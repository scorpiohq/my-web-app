"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReportPreviewStack from "@/components/ReportPreviewStack";
import BlueprintLoadingBridge from "@/components/gouti/BlueprintLoadingBridge";
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
/** Cards-only beat (img3) before the loading bridge. */
const CARDS_HOLD_MS = 1_600;
/** Blobatar loading bridge (img4) before the report. */
const LOADING_HOLD_MS = 1_800;

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
type Phase = "waiting" | "cards" | "loading";

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
  const [phase, setPhase] = useState<Phase>("waiting");

  const runWait = Boolean(submissionId) || preview;
  const isFailed = reportStatus === "failed";
  const isReady = preview
    ? minWaitDone
    : reportStatus === "ready" && minWaitDone;
  const inHandoff = isReady && !isFailed;
  const showLoading = inHandoff && phase === "loading";
  const showCardsOnly = inHandoff && !showLoading;
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

  // Timer done → cards only (no text / button) → loading → report
  useEffect(() => {
    if (!isReady || isFailed) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cardsHold = prefersReduced ? 400 : CARDS_HOLD_MS;
    const loadingHold = prefersReduced ? 400 : LOADING_HOLD_MS;

    setPhase("cards");

    const toLoading = window.setTimeout(() => {
      setPhase("loading");
    }, cardsHold);

    const toReport = window.setTimeout(() => {
      journeyFadeTo(reportHref, router, { durationMs: 480 });
    }, cardsHold + loadingHold);

    return () => {
      window.clearTimeout(toLoading);
      window.clearTimeout(toReport);
    };
  }, [isReady, isFailed, reportHref, router]);

  if (showLoading) {
    return (
      <JourneyEnter className="min-h-screen bg-white">
        <BlueprintLoadingBridge holdMs={LOADING_HOLD_MS} />
      </JourneyEnter>
    );
  }

  return (
    <JourneyEnter className="min-h-screen bg-white">
      <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-12 sm:px-6">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
          <ReportPreviewStack
            ready={showCardsOnly}
            stamp={
              showCountdown ? (
                <SecondsToGoSticker secondsLeft={secondsLeft} />
              ) : undefined
            }
          />

          {/* Waiting: status copy. Cards phase: nothing (img3 only). */}
          {!showCardsOnly ? (
            <div className="mt-10 flex w-full flex-col items-center sm:mt-12">
              <div
                key={isFailed ? "failed" : statusIndex}
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
                  Please refresh in a minute or contact support if this
                  continues.
                </p>
              ) : null}

              {pollError ? (
                <p className="mt-3 text-center text-xs text-[#c0392b] sm:text-sm">
                  {pollError}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </JourneyEnter>
  );
}
