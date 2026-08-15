import ReportPageShell from "@/components/ReportPageShell";

export default function GameplanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReportPageShell
      userName="Lewis Hamilton"
      showIntro={false}
      showReviews={false}
      scaleReport={false}
    >
      {children}
    </ReportPageShell>
  );
}
