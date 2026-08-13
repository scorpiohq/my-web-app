import type { ReactNode } from "react";
import ReportDownloadThanksBanner from "@/components/ReportDownloadThanksBanner";
import ReportPageFooter from "@/components/ReportPageFooter";
import ReportPageHeader from "@/components/ReportPageHeader";
import ReportReviewSection from "@/components/ReportReviewSection";
import ReportScaleFrame from "@/components/ReportScaleFrame";

type ReportPageShellProps = {
  userName: string;
  children: ReactNode;
  showIntro?: boolean;
  scaleReport?: boolean;
  submissionId?: string;
};

export default function ReportPageShell({
  userName,
  children,
  showIntro = true,
  scaleReport = true,
  submissionId,
}: ReportPageShellProps) {
  return (
    <div className="report-page-shell grid-bg flex min-h-screen flex-col">
      <ReportPageHeader userName={userName} />
      {showIntro ? <ReportDownloadThanksBanner userName={userName} /> : null}
      <div
        className={`flex-1 px-4 pb-4 sm:px-6 lg:px-8 ${
          showIntro ? "pt-6 sm:pt-7" : "pt-6 sm:pt-8 lg:pt-10"
        }`}
      >
        <div className="mx-auto w-full max-w-[1280px]">
          {scaleReport ? (
            <ReportScaleFrame>{children}</ReportScaleFrame>
          ) : (
            children
          )}
          {scaleReport ? (
            <div
              className="mx-auto mt-6 h-px w-full max-w-xl sm:mt-7"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,0,0,0.85) 50%, transparent)",
              }}
              aria-hidden="true"
            />
          ) : null}
          <ReportReviewSection submissionId={submissionId} />
        </div>
      </div>
      <ReportPageFooter />
    </div>
  );
}
