import {
  getReportPdfDownloadUrl,
  getReportPdfFileName,
} from "@/lib/client-download-report";

type ReportDownloadButtonProps = {
  userName: string;
  submissionId?: string;
  size?: "compact" | "large";
};

export default function ReportDownloadButton({
  userName,
  submissionId,
  size = "compact",
}: ReportDownloadButtonProps) {
  const href = getReportPdfDownloadUrl({ userName, submissionId });
  const fileName = getReportPdfFileName(userName);

  if (size === "large") {
    return (
      <a
        href={href}
        download={fileName}
        className="inline-flex h-[44px] w-[196px] flex-col items-center justify-center rounded-none border-2 border-black bg-[#ffc940] font-semibold text-black shadow-[3px_3px_0_0_#000] transition hover:bg-[#ffd966] sm:h-[50px] sm:w-[224px] sm:shadow-[4px_4px_0_0_#000] md:h-[56px] md:w-[250px]"
      >
        <span className="text-[11px] font-bold leading-none tracking-wide sm:text-xs md:text-[13px]">
          DOWNLOAD YOUR BLUEPRINT
        </span>
        <span className="mt-0.5 text-[8px] font-semibold leading-none sm:mt-1 sm:text-[9px] md:text-[10px]">
          as pdf
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      download={fileName}
      className="inline-flex h-[14px] w-[62px] shrink-0 -translate-x-[8px] flex-col items-center justify-center rounded-none border-2 border-black bg-[#ffc940] font-semibold text-black shadow-[1px_1px_0_0_#000] transition hover:bg-[#ffd966] md:h-[26px] md:w-[119px] md:shadow-[2px_2px_0_0_#000] xl:h-[42px] xl:w-[189px] xl:shadow-[4px_4px_0_0_#000]"
    >
      <span className="text-[4.5px] font-bold leading-none md:text-[8.5px] xl:text-[14px]">
        DOWNLOAD
      </span>
      <span className="text-[2.8px] font-semibold leading-none md:text-[5px] xl:text-[8px]">
        as pdf
      </span>
    </a>
  );
}
