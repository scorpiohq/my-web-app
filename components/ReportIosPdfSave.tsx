"use client";

import { useEffect, useState } from "react";
import {
  captureReportPdfBlob,
  shareOrOpenPdf,
} from "@/lib/client-capture-report-pdf";
import { isIosDevice } from "@/lib/report-print-device";

export default function ReportIosPdfSave() {
  const [phase, setPhase] = useState<"idle" | "saving" | "error">("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isIosDevice());
  }, []);

  if (!visible) return null;

  async function handleSave() {
    if (phase === "saving") return;

    setPhase("saving");
    try {
      const { blob, fileName } = await captureReportPdfBlob();
      await shareOrOpenPdf(blob, fileName);
      setPhase("idle");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setPhase("idle");
        return;
      }
      setPhase("error");
    }
  }

  return (
    <div className="report-ios-save">
      <button type="button" onClick={handleSave} disabled={phase === "saving"}>
        {phase === "error"
          ? "Try save again"
          : phase === "saving"
            ? "Saving PDF…"
            : "Save PDF"}
      </button>
      <p>Tap Save PDF, then Save to Files.</p>
    </div>
  );
}
