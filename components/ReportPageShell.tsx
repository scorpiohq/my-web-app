import type { ReactNode } from "react";
import ReportDownloadThanksBanner from "@/components/ReportDownloadThanksBanner";
import ReportPageFooter from "@/components/ReportPageFooter";
import ReportPageHeader from "@/components/ReportPageHeader";
import ReportReviewSection from "@/components/ReportReviewSection";
import ReportScaleFrame from "@/components/ReportScaleFrame";

function getPromptHref(userName: string, submissionId?: string) {
  const params = new URLSearchParams();

  if (submissionId) {
    params.set("submission_id", submissionId);
  }

  const trimmedName = userName.trim();
  if (trimmedName) {
    params.set("name", trimmedName);
  }

  const query = params.toString();
  return query ? `/prompt?${query}` : "/prompt";
}

function getReportHref(submissionId?: string) {
  return submissionId
    ? `/report/${encodeURIComponent(submissionId)}`
    : "/261005-report-preview";
}

type ReportPageShellProps = {
  userName: string;
  children: ReactNode;
  showIntro?: boolean;
  showDownloadButton?: boolean;
  showReviews?: boolean;
  scaleReport?: boolean;
  submissionId?: string;
  giftHref?: string | false;
};

export default function ReportPageShell({
  userName,
  children,
  showIntro = true,
  showDownloadButton = true,
  showReviews = true,
  scaleReport = true,
  submissionId,
  giftHref,
}: ReportPageShellProps) {
  const promptHref = getPromptHref(userName, submissionId);
  const reportHref = getReportHref(submissionId);
  const resolvedGiftHref =
    giftHref !== undefined ? giftHref : promptHref;
  return (
    <div className="report-page-shell grid-bg flex min-h-screen flex-col">
      <ReportPageHeader
        userName={userName}
        reportHref={reportHref}
        giftHref={promptHref}
      />
      {showIntro ? (
        <ReportDownloadThanksBanner
          userName={userName}
          submissionId={submissionId}
          showDownloadButton={showDownloadButton}
          giftHref={resolvedGiftHref}
        />
      ) : null}
      <div
        className={`flex-1 px-4 sm:px-6 lg:px-8 ${
          showReviews ? "pb-[18px]" : "pb-4"
        } ${showIntro ? "pt-6 sm:pt-7" : "pt-6 sm:pt-8 lg:pt-10"}`}
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
          {showReviews ? (
            <ReportReviewSection submissionId={submissionId} />
          ) : null}
        </div>
      </div>
      <ReportPageFooter />
    </div>
  );
}
