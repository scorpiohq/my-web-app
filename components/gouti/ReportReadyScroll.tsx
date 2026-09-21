"use client";

import { useEffect } from "react";
import { REPORT_BUILD_COMPLETE } from "@/components/gouti/ReportLockOverlay";

/**
 * After the report finishes building, gently scroll so the lock + UNLOCK!
 * sit in the middle of the viewport (desktop + phone).
 * Used by /gouti/report-animation.
 */
export default function ReportReadyScroll() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scrollToReady = () => {
      const anchor = document.querySelector<HTMLElement>(
        "[data-report-ready-anchor]",
      );
      if (!anchor) return;

      // Let the unlock button fade in first, then settle the viewport.
      window.setTimeout(() => {
        anchor.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "center",
          inline: "nearest",
        });
      }, prefersReduced ? 0 : 420);
    };

    window.addEventListener(REPORT_BUILD_COMPLETE, scrollToReady);
    return () => {
      window.removeEventListener(REPORT_BUILD_COMPLETE, scrollToReady);
    };
  }, []);

  return null;
}
