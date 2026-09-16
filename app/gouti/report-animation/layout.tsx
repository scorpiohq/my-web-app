"use client";

import BlueprintSearchIntro from "@/components/gouti/BlueprintSearchIntro";
import JourneyEnter from "@/components/gouti/JourneyEnter";
import ReportPageShell from "@/components/ReportPageShell";

export default function ReportAnimation2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JourneyEnter bg="#F7F7F7" className="min-h-screen">
      <ReportPageShell
        userName="Lewis Hamilton"
        showHeader={false}
        showIntro={false}
        showReviews={false}
        showFooter={false}
        contentBlur="4px"
        composeColumn
        // Shared column: generation + report stacked, same width on every breakpoint
        composeColumnClassName="max-w-[40rem] sm:max-w-[44rem] lg:max-w-[48rem]"
        composeReportClassName="mt-[6px]"
        contentClassName="!pt-20 sm:!pt-28 lg:!pt-32"
        // Same size; left-aligned under “Your Blueprint is taking shape…”
        reportWidthFactor={0.54}
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
