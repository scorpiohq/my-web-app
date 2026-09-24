"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Blobatar } from "@blobatar/react";
import { surprised } from "blobatar/expression";
import "blobatar/motion.css";
import "./building.css";
import { journeyFadeIn, journeyFadeThen } from "@/components/gouti/journeyFade";
import ReportAnimationPage from "@/app/gouti/report-animation/page";
import ReportAnimationLayout from "@/app/gouti/report-animation/layout";

/** How long the cute bridge holds before report-animation. */
const HOLD_MS = 1800;

function useBlobSize() {
  const [size, setSize] = useState(112);

  useEffect(() => {
    const sync = () => {
      setSize(window.matchMedia("(min-width: 640px)").matches ? 128 : 96);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return size;
}

function BuildingInner() {
  const searchParams = useSearchParams();
  const blobSize = useBlobSize();
  const [showReport, setShowReport] = useState(false);

  const seed = useMemo(() => {
    const raw = searchParams.get("n")?.trim();
    return raw && raw.length > 0 ? raw : "Your Blueprint";
  }, [searchParams]);

  useEffect(() => {
    journeyFadeIn(320);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hold = prefersReduced ? 400 : HOLD_MS;

    const timer = window.setTimeout(() => {
      journeyFadeThen(() => setShowReport(true), { durationMs: 420 });
    }, hold);

    return () => window.clearTimeout(timer);
  }, [searchParams]);

  if (showReport) {
    return (
      <ReportAnimationLayout>
        <ReportAnimationPage />
      </ReportAnimationLayout>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <div className="flex w-full max-w-[200px] flex-col items-center sm:max-w-[220px]">
        <Blobatar
          name={seed}
          size={blobSize}
          traits={{ shape: 0.11 }}
          hue={78}
          expression={surprised}
          animate="always"
        />

        <p
          className="mt-4 text-[15px] font-medium tracking-[-0.01em] text-[#1A1A1A] sm:mt-5 sm:text-[16px]"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
        >
          Loading...
        </p>

        <div
          className="mt-3 h-1.5 w-[72%] overflow-hidden rounded-full bg-[#EDEDED] sm:mt-3.5 sm:h-[6px]"
          role="progressbar"
          aria-label="Loading"
        >
          <div
            className="bp-building-fill h-full rounded-full bg-[#FFA126]"
            style={{ animationDuration: `${HOLD_MS}ms` }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Short Blobatar bridge after form submit → then the report build on /building.
 */
export default function GoutiBuildingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white" />
      }
    >
      <BuildingInner />
    </Suspense>
  );
}
