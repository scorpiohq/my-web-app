"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BlueprintSearchIntro from "@/components/gouti/BlueprintSearchIntro";
import JourneyEnter from "@/components/gouti/JourneyEnter";
import ReportReadyScroll from "@/components/gouti/ReportReadyScroll";
import ReportPageShell from "@/components/ReportPageShell";

const FALLBACK_NAME = "Lewis Hamilton";

function useFormUserName() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("n")?.trim();
  return raw && raw.length > 0 ? raw : FALLBACK_NAME;
}

function ReportAnimationLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const userName = useFormUserName();

  return (
    <JourneyEnter bg="#F7F7F7" className="min-h-screen">
      <ReportReadyScroll />
      <ReportPageShell
        userName={userName}
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
        aboveContent={<BlueprintSearchIntro userName={userName} />}
      >
        {children}
      </ReportPageShell>
    </JourneyEnter>
  );
}

/**
 * Report animation — chat reply beat (bubble → status → report),
 * framed evenly + auto-scroll to UNLOCK when ready.
 * Name comes from the form via `?n=` (passed through /gouti/building).
 */
export default function ReportAnimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F7F7]" />}>
      <ReportAnimationLayoutInner>{children}</ReportAnimationLayoutInner>
    </Suspense>
  );
}
