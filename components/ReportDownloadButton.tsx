"use client";

import { useState } from "react";

type ReportDownloadButtonProps = {
  userName: string;
  size?: "compact" | "large";
};

function sanitizeFileName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ReportDownloadButton({
  userName,
  size = "compact",
}: ReportDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const params = new URLSearchParams({
        preview: "1",
        name: userName,
      });

      const response = await fetch(`/api/download-report-pdf?${params.toString()}`);

      if (!response.ok) {
        throw new Error("PDF request failed");
      }

      const blob = await response.blob();
      const slug = sanitizeFileName(userName) || "blueprint";
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${slug}-creator-blueprint.pdf`;
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to download report PDF", error);
      window.alert(
        "Could not download the PDF. Make sure the app is running and try again.",
      );
    } finally {
      setIsDownloading(false);
    }
  }

  if (size === "large") {
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        aria-busy={isDownloading}
        className="inline-flex h-[44px] w-[196px] flex-col items-center justify-center rounded-none border-2 border-black bg-[#ffc940] font-semibold text-black shadow-[3px_3px_0_0_#000] transition hover:bg-[#ffd966] disabled:cursor-wait disabled:opacity-70 sm:h-[50px] sm:w-[224px] sm:shadow-[4px_4px_0_0_#000] md:h-[56px] md:w-[250px]"
      >
        <span className="text-[11px] font-bold leading-none tracking-wide sm:text-xs md:text-[13px]">
          {isDownloading ? "..." : "DOWNLOAD YOUR BLUEPRINT"}
        </span>
        <span className="mt-0.5 text-[8px] font-semibold leading-none sm:mt-1 sm:text-[9px] md:text-[10px]">
          as pdf
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      aria-busy={isDownloading}
      className="inline-flex h-[14px] w-[62px] shrink-0 -translate-x-[8px] flex-col items-center justify-center rounded-none border-2 border-black bg-[#ffc940] font-semibold text-black shadow-[1px_1px_0_0_#000] transition hover:bg-[#ffd966] disabled:cursor-wait disabled:opacity-70 md:h-[26px] md:w-[119px] md:shadow-[2px_2px_0_0_#000] xl:h-[42px] xl:w-[189px] xl:shadow-[4px_4px_0_0_#000]"
    >
      <span className="text-[4.5px] font-bold leading-none md:text-[8.5px] xl:text-[14px]">
        {isDownloading ? "..." : "DOWNLOAD"}
      </span>
      <span className="text-[2.8px] font-semibold leading-none md:text-[5px] xl:text-[8px]">
        as pdf
      </span>
    </button>
  );
}
