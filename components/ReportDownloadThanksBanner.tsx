"use client";

import { useState } from "react";
import ReportDownloadButton from "@/components/ReportDownloadButton";

type ReportDownloadThanksBannerProps = {
  userName: string;
};

function sanitizeFileName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ReportDownloadThanksBanner({
  userName,
}: ReportDownloadThanksBannerProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const firstName = userName.trim().split(/\s+/)[0] || "there";

  async function handleManualDownload() {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const params = new URLSearchParams({
        preview: "1",
        name: userName,
      });

      const response = await fetch(
        `/api/download-report-pdf?${params.toString()}`,
      );

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

  return (
    <div className="px-5 pb-0 pt-[64px] text-center text-black sm:pt-[72px]">
      <p
        className="m-0 text-[28px] font-normal italic leading-[1.2] sm:text-[36px]"
        style={{ fontFamily: "var(--font-garamond)" }}
      >
        <span className="block">Thanks {firstName} for</span>
        <span className="block">letting us be part of your journey..</span>
      </p>
      <p
        className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-black sm:text-base"
        style={{ fontFamily: "var(--font-garamond)" }}
      >
        Your personalized blueprint is ready. We&apos;ve also got a little gift
        for you,{" "}
        <button
          type="button"
          onClick={handleManualDownload}
          disabled={isDownloading}
          className="font-normal text-black underline underline-offset-2 disabled:opacity-70"
        >
          {isDownloading ? "downloading…" : "download it here"}
        </button>
        .
      </p>
      <div
        className="mx-auto mt-6 h-px w-full max-w-xl sm:mt-7"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,0,0,0.85) 50%, transparent)",
        }}
        aria-hidden="true"
      />
      <div className="mt-6 flex justify-center sm:mt-7">
        <ReportDownloadButton userName={userName} size="large" />
      </div>
      <div
        className="mx-auto mt-6 h-px w-full max-w-xl sm:mt-7"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,0,0,0.85) 50%, transparent)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
