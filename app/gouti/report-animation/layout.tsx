"use client";

import BlueprintSearchIntro from "@/components/gouti/BlueprintSearchIntro";
import JourneyEnter from "@/components/gouti/JourneyEnter";
import ReportReadyScroll from "@/components/gouti/ReportReadyScroll";
import ReportPageShell from "@/components/ReportPageShell";

/**
 * Report animation — chat reply beat (bubble → status → report),
 * framed evenly + auto-scroll to UNLOCK when ready.
 */
export default function ReportAnimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JourneyEnter bg="#F7F7F7" className="min-h-screen">
      <ReportReadyScroll />
      <ReportPageShell
        userName="Lewis Hamilton"
        showHeader={false}
        showIntro={false}
        showReviews={false}
        showFooter={false}
        contentBlur="4px"
        composeColumn
        // Chat column sits in the middle of the viewport (not a skinny centered stack)
        composeColumnClassName="mt-[100px] max-w-[36rem] sm:max-w-[40rem] lg:max-w-[44rem]"
        composeReportClassName="mt-[6px]"
        contentClassName="!pt-16 sm:!pt-20 md:!pt-24 lg:!pt-28"
        // Report under the status line — same reply alignment as original
        reportWidthFactor={0.62}
        reportAlign="start"
        reportStartInset="calc(20px + 0.82rem)"
        reportLocked
        shellClassName="bg-[#F7F7F7]"
        aboveContent={<BlueprintSearchIntro />}
      >
        {children}
      </ReportPageShell>
    </JourneyEnter>
  );
}
