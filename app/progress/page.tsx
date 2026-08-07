import BlueprintProgressScreen from "@/components/BlueprintProgressScreen";

export default async function ProgressPage({
  searchParams,
}: {
  searchParams: Promise<{ submission_id?: string }>;
}) {
  const params = await searchParams;

  return <BlueprintProgressScreen submissionId={params.submission_id} />;
}
