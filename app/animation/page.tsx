import { redirect } from "next/navigation";

/** Old URL — report building now lives on /building. */
export default async function AnimationRedirectPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value.length > 0) {
      query.set(key, value);
    }
  }

  const qs = query.toString();
  redirect(qs ? `/building?${qs}` : "/building");
}
