import ReportPageShell from "@/components/ReportPageShell";

export default function ReportPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReportPageShell userName="Lewis Hamilton">{children}</ReportPageShell>
  );
}
