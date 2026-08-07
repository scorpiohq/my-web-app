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

export default function BlueprintProgressScreen({
  submissionId,
}: {
  submissionId?: string;
}) {
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const isReady = statusIndex === STATUS_MESSAGES.length - 1;
  const current = STATUS_MESSAGES[statusIndex];
  const reportHref = submissionId ? `/report/${submissionId}` : "/report-preview";

  useEffect(() => {
    if (isReady) return;

    const delay = randomDelayMs();
    const fadeOutTimer = setTimeout(() => setVisible(false), delay - 280);

    const nextTimer = setTimeout(() => {
      setStatusIndex((index) => Math.min(index + 1, STATUS_MESSAGES.length - 1));
      setVisible(true);
    }, delay);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(nextTimer);
    };
  }, [statusIndex, isReady]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
        <ReportPreviewStack ready={isReady} />

        <div className="mt-10 flex w-full flex-col items-center sm:mt-12">
          <div
            key={statusIndex}
            className={`progress-status-copy min-h-[52px] w-max max-w-full px-2 text-center sm:min-h-[60px] ${
              visible ? "progress-status-visible" : "progress-status-hidden"
            }`}
          >
            <p className="text-base font-semibold leading-snug text-[#333] sm:text-lg sm:whitespace-nowrap md:text-xl">
              {current.title}
            </p>
            {current.subtitle ? (
              <p className="mt-2 text-sm italic leading-relaxed text-[#9A9A9A] sm:text-base md:whitespace-nowrap">
                {current.subtitle}
              </p>
            ) : null}
          </div>

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
