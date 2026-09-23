"use client";

import JourneyEnter from "@/components/gouti/JourneyEnter";
import ReportPageShell from "@/components/ReportPageShell";

export default function ReportPreview2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JourneyEnter bg="#F7F7F7" className="min-h-screen">
      <ReportPageShell
        userName="Lewis Hamilton"
        shortThanks
        feedbackAsPopup
        showPeekCaption
        actionsBelowReport
        footerSurface="soft"
        shellClassName="bg-[#F7F7F7]"
        giftHref="/gouti/prompt?name=Lewis%20Hamilton"
        reportHref="/gouti/report-preview2"
        showGiftLink={false}
      >
        {children}
      </ReportPageShell>
    </JourneyEnter>
  );
}
