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

function randomDelayMs() {
  return 2000 + Math.floor(Math.random() * 3001);
}

type ReportStatus = "pending" | "generating" | "ready" | "failed";

export default function BlueprintProgressScreen({
  submissionId,
}: {
  submissionId?: string;
}) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reportStatus, setReportStatus] = useState<ReportStatus>("generating");
  const [pollError, setPollError] = useState<string | null>(null);

  const isReady = reportStatus === "ready";
  const isFailed = reportStatus === "failed";
  const current = isReady
    ? STATUS_MESSAGES[STATUS_MESSAGES.length - 1]
    : STATUS_MESSAGES[statusIndex];
  const reportHref = submissionId
    ? `/report/${encodeURIComponent(submissionId)}`
    : "/report-preview";

  useEffect(() => {
    if (!submissionId) {
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

        if (payload.reportStatus === "ready") {
          setStatusIndex(STATUS_MESSAGES.length - 1);
          setVisible(true);
        }
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
  }, [submissionId]);

  useEffect(() => {
    if (isReady || isFailed || !submissionId) {
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
  }, [statusIndex, isReady, isFailed, submissionId]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
        <ReportPreviewStack ready={isReady} />

        <div className="mt-10 flex w-full flex-col items-center sm:mt-12">
          <div
            key={isReady ? "ready" : statusIndex}
            className={`progress-status-copy min-h-[52px] w-max max-w-full px-2 text-center sm:min-h-[60px] ${
              visible ? "progress-status-visible" : "progress-status-hidden"
            }`}
          >
            <p className="text-base font-semibold leading-snug text-[#333] sm:text-lg sm:whitespace-nowrap md:text-xl">
              {isFailed ? "We hit a snag building your Blueprint" : current.title}
            </p>
            {isFailed ? (
              <p className="mt-2 text-sm italic leading-relaxed text-[#9A9A9A] sm:text-base">
                Please refresh in a minute or contact support if this continues.
              </p>
            ) : current.subtitle ? (
              <p className="mt-2 text-sm italic leading-relaxed text-[#9A9A9A] sm:text-base md:whitespace-nowrap">
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
              READ YOUR BLUEPRINT →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
