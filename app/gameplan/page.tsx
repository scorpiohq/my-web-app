import Backstory from "@/components/Backstory";
import ReportDownloadThanksBanner from "@/components/ReportDownloadThanksBanner";

export default function GameplanPage() {
  return (
    <main className="max-w-6xl pl-[18px]">
      <ReportDownloadThanksBanner
        userName="Lewis Hamilton"
        align="left"
        showEarlyBirdBadge
        showDownloadButton={false}
      />
      <Backstory stacked />
    </main>
  );
}
