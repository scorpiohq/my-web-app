import type { ReactNode } from "react";
import ReportPageFooter from "@/components/ReportPageFooter";
import ReportPageHeader from "@/components/ReportPageHeader";
import ReportPageIntro from "@/components/ReportPageIntro";
import ReportReviewSection from "@/components/ReportReviewSection";

type ReportPageShellProps = {
  userName: string;
  children: ReactNode;
  showIntro?: boolean;
  submissionId?: string;
};

export default function ReportPageShell({
  userName,
  children,
  showIntro = true,
  submissionId,
}: ReportPageShellProps) {
  return (
    <div className="report-page-shell grid-bg flex min-h-screen flex-col">
      <ReportPageHeader userName={userName} />
      <div className="flex-1 pt-6 pb-4 sm:pt-8 lg:pt-10">
        <div className="mx-auto w-[330px] md:w-[630px] xl:w-[1000px]">
          {showIntro ? <ReportPageIntro userName={userName} /> : null}
          {children}
          <ReportReviewSection submissionId={submissionId} />
        </div>
      </div>
      <ReportPageFooter />
    </div>
  );
}
