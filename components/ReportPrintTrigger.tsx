"use client";

import { useEffect } from "react";
import {
  enableA4PrintLayout,
  enableHiresPrintLayout,
  isIosDevice,
  shouldUseHiresPrint,
} from "@/lib/report-print-device";

export default function ReportPrintTrigger() {
  useEffect(() => {
    if (isIosDevice()) {
      enableA4PrintLayout();
      return;
    }

    let cancelled = false;

    if (shouldUseHiresPrint()) {
      enableHiresPrintLayout();
    } else {
      enableA4PrintLayout();
    }

    async function printReport() {
      await document.fonts.ready;

      const images = Array.from(document.images);
      await Promise.all(
        images.map((image) => {
          if (image.complete) {
            return image.decode?.().catch(() => undefined) ?? Promise.resolve();
          }
          return new Promise<void>((resolve) => {
            const settle = () => {
              void image.decode?.().catch(() => undefined).finally(resolve);
            };
            image.addEventListener("load", settle, { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          });
        }),
      );

      if (cancelled) return;

      const closeAfterPrint = () => {
        if (window.opener) {
          window.close();
        }
      };

      window.addEventListener("afterprint", closeAfterPrint, { once: true });
      document.body.offsetHeight;
      window.setTimeout(() => {
        if (!cancelled) window.print();
      }, 200);
    }

    const timer = window.setTimeout(() => {
      void printReport();
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
