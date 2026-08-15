"use client";

import { useState } from "react";
import { downloadReportPdf } from "@/lib/client-download-report";

type ReportDownloadButtonProps = {
  userName: string;
  submissionId?: string;
  size?: "compact" | "large";
};

export default function ReportDownloadButton({
  userName,
  submissionId,
  size = "compact",
}: ReportDownloadButtonProps) {
  const [phase, setPhase] = useState<"idle" | "loading" | "error">("idle");

  async function handleClick() {
    if (phase === "loading") return;

    setPhase("loading");
    try {
      await downloadReportPdf({ userName, submissionId });
      setPhase("idle");
    } catch {
      setPhase("error");
    }
  }

  const isLarge = size === "large";
  const className = isLarge
    ? "inline-flex h-[44px] w-[196px] flex-col items-center justify-center rounded-none border-2 border-black bg-[#ffc940] font-semibold text-black shadow-[3px_3px_0_0_#000] transition hover:bg-[#ffd966] disabled:cursor-wait sm:h-[50px] sm:w-[224px] sm:shadow-[4px_4px_0_0_#000] md:h-[56px] md:w-[250px]"
    : "inline-flex h-[14px] w-[62px] shrink-0 -translate-x-[8px] flex-col items-center justify-center rounded-none border-2 border-black bg-[#ffc940] font-semibold text-black shadow-[1px_1px_0_0_#000] transition hover:bg-[#ffd966] disabled:cursor-wait md:h-[26px] md:w-[119px] md:shadow-[2px_2px_0_0_#000] xl:h-[42px] xl:w-[189px] xl:shadow-[4px_4px_0_0_#000]";

  return (
    <button type="button" onClick={handleClick} disabled={phase === "loading"} className={className}>
      {isLarge ? (
        <>
          <span className="text-[11px] font-bold leading-none tracking-wide sm:text-xs md:text-[13px]">
            {phase === "loading"
              ? "PREPARING PDF…"
              : phase === "error"
                ? "TRY DOWNLOAD AGAIN"
                : "DOWNLOAD YOUR BLUEPRINT"}
          </span>
          <span className="mt-0.5 text-[8px] font-semibold leading-none sm:mt-1 sm:text-[9px] md:text-[10px]">
            {phase === "loading" ? "this can take 15 seconds" : "as pdf"}
          </span>
        </>
      ) : (
        <>
          <span className="text-[4.5px] font-bold leading-none md:text-[8.5px] xl:text-[14px]">
            {phase === "loading" ? "PREPARING" : phase === "error" ? "RETRY" : "DOWNLOAD"}
          </span>
          <span className="text-[2.8px] font-semibold leading-none md:text-[5px] xl:text-[8px]">
            {phase === "loading" ? "please wait" : "as pdf"}
          </span>
        </>
      )}
    </button>
  );
}
