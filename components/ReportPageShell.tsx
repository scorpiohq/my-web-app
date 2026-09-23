import type { ReactNode } from "react";
import ReportDownloadThanksBanner from "@/components/ReportDownloadThanksBanner";
import ReportPageActions from "@/components/ReportPageActions";
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
    : "/gouti/report-preview";
}

function ReportPeekCaption() {
  return (
    <p className="mb-1.5 flex items-center justify-center gap-1.5 text-[15px] leading-none text-[#5A5A5A] sm:mb-2 sm:gap-2 sm:text-[16px] md:text-[17px]">
      <span style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}>
        Your Blueprint. Go ahead, look.
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/arrow.svg"
        alt=""
        width={24}
        height={30}
        className="h-6 w-auto shrink-0 -rotate-180 text-[#5A5A5A] sm:h-7"
        aria-hidden
      />
    </p>
  );
}

type ReportPageShellProps = {
  userName: string;
  children: ReactNode;
  showIntro?: boolean;
  showDownloadButton?: boolean;
  showReviews?: boolean;
  /** When false, header is not rendered (no reserved space). */
  showHeader?: boolean;
  /** Hide intro UI but keep its vertical space (report stays put). */
  hideIntroKeepSpace?: boolean;
  /** Hide review UI but keep its vertical space. */
  hideReviewsKeepSpace?: boolean;
  /** Hide header UI but keep its vertical space. */
  hideHeaderKeepSpace?: boolean;
  scaleReport?: boolean;
  submissionId?: string;
  giftHref?: string | false;
  /** Blur only the main report area (footer stays sharp). e.g. "8px" */
  contentBlur?: string;
  /** Extra classes on the main content wrapper (padding, etc.). */
  contentClassName?: string;
  /** Renders above the report area, outside contentBlur (e.g. search intro). */
  aboveContent?: ReactNode;
  /**
   * Keep aboveContent + report in one shared column so placement stays aligned.
   * Blur (if set) applies only to the report block, not the intro.
   */
  composeColumn?: boolean;
  /** Classes for the shared compose column (max-width, gap, etc.). */
  composeColumnClassName?: string;
  /** Extra classes on the blurred report block inside composeColumn. */
  composeReportClassName?: string;
  /** Scale report preview width as a fraction of the area (e.g. 0.54). */
  reportWidthFactor?: number;
  /** Horizontal align for reduced-width preview. */
  reportAlign?: "center" | "start";
  /** Left offset for start-aligned preview (e.g. under a heading). */
  reportStartInset?: string;
  /** Centered lock overlay on the report preview (lock stays unblurred). */
  reportLocked?: boolean;
  /** When set, UNLOCK starts Stripe/Lemon for this pending submission. */
  checkoutSubmissionId?: string;
  /** When false, footer is not rendered. */
  showFooter?: boolean;
  /** Extra classes on the outer shell (e.g. solid bg instead of grid). */
  shellClassName?: string;
  /** Short “Thanks {name}” — Bricolage + DM Sans (gouti). */
  shortThanks?: boolean;
  /** Feedback beside download as popup; hides the inline review block. */
  feedbackAsPopup?: boolean;
  /** Override report link in the header (defaults from submission id). */
  reportHref?: string;
  /** Profile menu “Your gift” entry (default true). */
  showGiftLink?: boolean;
  /** “A real Blueprint. Go ahead, peek.” + arrow above the report. */
  showPeekCaption?: boolean;
  /** Put download / feedback buttons below the report instead of in the intro. */
  actionsBelowReport?: boolean;
  /** Soft milky footer (matches policies / soft pages). */
  footerSurface?: "grid" | "soft";
};

export default function ReportPageShell({
  userName,
  children,
  showIntro = true,
  showDownloadButton = true,
  showReviews = true,
  showHeader = true,
  hideIntroKeepSpace = false,
  hideReviewsKeepSpace = false,
  hideHeaderKeepSpace = false,
  scaleReport = true,
  submissionId,
  giftHref,
  contentBlur,
  contentClassName = "",
  aboveContent,
  composeColumn = false,
  composeColumnClassName = "",
  composeReportClassName = "",
  reportWidthFactor = 1,
  reportAlign = "center",
  reportStartInset,
  reportLocked = false,
  checkoutSubmissionId,
  showFooter = true,
  shellClassName = "",
  shortThanks = false,
  feedbackAsPopup = false,
  reportHref: reportHrefProp,
  showGiftLink = true,
  showPeekCaption = false,
  actionsBelowReport = false,
  footerSurface = "grid",
}: ReportPageShellProps) {
  const promptHref = getPromptHref(userName, submissionId);
  const reportHref = reportHrefProp ?? getReportHref(submissionId);
  const resolvedGiftHref =
    giftHref !== undefined ? giftHref : promptHref;
  const headerGiftHref =
    typeof resolvedGiftHref === "string" ? resolvedGiftHref : promptHref;
  const renderHeader = showHeader || hideHeaderKeepSpace;
  const renderIntro = showIntro || hideIntroKeepSpace;
  const renderReviews =
    !feedbackAsPopup && (showReviews || hideReviewsKeepSpace);
  const introShowsDownload = showDownloadButton && !actionsBelowReport;
  const belowShowsDownload = showDownloadButton && actionsBelowReport;

  const reportBlock = (
    <>
      {showPeekCaption ? <ReportPeekCaption /> : null}
      {scaleReport ? (
        <ReportScaleFrame
          widthFactor={reportWidthFactor}
          align={reportAlign}
          startInset={reportStartInset}
          locked={reportLocked}
          checkoutSubmissionId={checkoutSubmissionId}
          contentBlur={reportLocked ? contentBlur : undefined}
        >
          {children}
        </ReportScaleFrame>
      ) : (
        children
      )}
      {belowShowsDownload ? (
        <>
          <div
            className="mx-auto mt-8 h-px w-full max-w-xl sm:mt-10"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,0,0,0.55) 50%, transparent)",
            }}
            aria-hidden="true"
          />
          <ReportPageActions
            userName={userName}
            submissionId={submissionId}
            feedbackAsPopup={feedbackAsPopup}
            singleLine
            className="mt-8 mb-2 sm:mt-10 sm:mb-3"
          />
        </>
      ) : null}
      {scaleReport && renderReviews && !hideReviewsKeepSpace ? (
        <div
          className="mx-auto mt-6 h-px w-full max-w-xl sm:mt-7"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(0,0,0,0.85) 50%, transparent)",
          }}
          aria-hidden="true"
        />
      ) : null}
      {renderReviews ? (
        <div
          className={
            hideReviewsKeepSpace
              ? "invisible pointer-events-none select-none"
              : undefined
          }
          aria-hidden={hideReviewsKeepSpace || undefined}
        >
          <ReportReviewSection submissionId={submissionId} />
        </div>
      ) : null}
    </>
  );

  const contentTopPad = showPeekCaption
    ? "pt-2 sm:pt-2.5"
    : renderIntro
      ? "pt-6 sm:pt-7"
      : "pt-4 sm:pt-5";

  return (
    <div
      className={`report-page-shell flex min-h-screen flex-col ${
        shellClassName || "grid-bg"
      }`.trim()}
    >
      {renderHeader ? (
        <div
          className={
            hideHeaderKeepSpace
              ? "invisible pointer-events-none select-none"
              : undefined
          }
          aria-hidden={hideHeaderKeepSpace || undefined}
        >
          <ReportPageHeader
            userName={userName}
            reportHref={reportHref}
            giftHref={headerGiftHref}
            showGiftLink={showGiftLink}
            submissionId={submissionId}
            showDownloadAction={showDownloadButton}
            showReviewAction={feedbackAsPopup || showReviews}
          />
        </div>
      ) : null}
      {renderIntro ? (
        <div
          className={
            hideIntroKeepSpace
              ? "invisible pointer-events-none select-none"
              : undefined
          }
          aria-hidden={hideIntroKeepSpace || undefined}
        >
          <ReportDownloadThanksBanner
            userName={userName}
            submissionId={submissionId}
            showDownloadButton={introShowsDownload}
            giftHref={resolvedGiftHref}
            shortThanks={shortThanks}
            feedbackAsPopup={feedbackAsPopup}
          />
        </div>
      ) : null}

      {composeColumn ? (
        <div
          className={`flex-1 px-4 sm:px-6 lg:px-8 ${
            renderReviews || belowShowsDownload
              ? belowShowsDownload
                ? "pb-16 sm:pb-20 md:pb-24"
                : "pb-[18px]"
              : "pb-4"
          } ${contentTopPad} ${contentClassName}`.trim()}
        >
          <div
            className={`mx-auto w-full ${composeColumnClassName}`.trim()}
          >
            {aboveContent}
            <div
              className={`${
                contentBlur && !reportLocked ? "select-none" : ""
              } ${composeReportClassName}`.trim()}
              style={
                contentBlur && !reportLocked
                  ? {
                      filter: `blur(${contentBlur})`,
                      userSelect: "none" as const,
                    }
                  : undefined
              }
            >
              {reportBlock}
            </div>
          </div>
        </div>
      ) : (
        <>
          {aboveContent}
          <div
            className={`flex-1 px-4 sm:px-6 lg:px-8 ${
              renderReviews || belowShowsDownload
              ? belowShowsDownload
                ? "pb-16 sm:pb-20 md:pb-24"
                : "pb-[18px]"
              : "pb-4"
            } ${contentTopPad} ${contentBlur ? "select-none" : ""} ${contentClassName}`.trim()}
            style={
              contentBlur
                ? {
                    filter: `blur(${contentBlur})`,
                    userSelect: "none" as const,
                  }
                : undefined
            }
          >
            <div className="mx-auto w-full max-w-[1280px]">{reportBlock}</div>
          </div>
        </>
      )}
      {showFooter ? <ReportPageFooter surface={footerSurface} /> : null}
    </div>
  );
}
