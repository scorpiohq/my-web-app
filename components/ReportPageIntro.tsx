import ReportDownloadButton from "@/components/ReportDownloadButton";
import { reportCardEdgePadding } from "@/lib/report-layout";

type ReportPageIntroProps = {
  userName: string;
};

export default function ReportPageIntro({ userName }: ReportPageIntroProps) {
  const firstName = userName.trim().split(/\s+/)[0] || "there";

  return (
    <div
      className="mb-2 flex w-full items-start justify-between gap-3 md:mb-2.5 xl:mb-3"
      style={reportCardEdgePadding}
    >
      <div>
        <p className="m-0 text-[10px] font-bold leading-[12px] tracking-[-0.04em] text-black md:text-[19px] md:leading-[23px] xl:text-[31px] xl:leading-[37px]">
          Hi {firstName},
        </p>
        <p className="m-0 text-[10px] font-bold leading-[12px] tracking-[-0.04em] text-black md:text-[19px] md:leading-[23px] xl:text-[31px] xl:leading-[37px]">
          Here&apos;s your Blueprint
        </p>
      </div>
      <ReportDownloadButton userName={userName} />
    </div>
  );
}
