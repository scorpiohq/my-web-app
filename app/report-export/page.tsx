import { ReportTemplate } from "@/app/report-preview/page";
import { previewReportData } from "@/lib/report-preview-data";

export default function ReportExportPage() {
  return (
    <div className="report-export-mode bg-white">
      <ReportTemplate data={previewReportData} gameplanHref="#" exportMode />
    </div>
  );
}
