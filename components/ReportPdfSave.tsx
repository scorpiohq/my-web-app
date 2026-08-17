"use client";

import { useEffect, useState } from "react";
import {
  captureReportPdfBlob,
  shareOrOpenPdf,
} from "@/lib/client-capture-report-pdf";
import { isIosDevice } from "@/lib/report-print-device";

export default function ReportPdfSave() {
  const [phase, setPhase] = useState<"idle" | "saving" | "error">("idle");
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setIos(isIosDevice());
  }, []);

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
    <div className="report-pdf-save">
      <button type="button" onClick={handleSave} disabled={phase === "saving"}>
        {phase === "error"
          ? "Try save again"
          : phase === "saving"
            ? "Saving PDF…"
            : "Save PDF"}
      </button>
      <p>
        {ios
          ? "Tap Save PDF, then Save to Files."
          : "Click Save PDF to download the report."}
      </p>
    </div>
  );
}
