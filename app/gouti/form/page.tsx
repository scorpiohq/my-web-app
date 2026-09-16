import { redirect } from "next/navigation";

/**
 * Gouti conversion journey — shared form with journey=gouti submit path.
 * `skip=1` jumps to the last question for animation testing only.
 * Submit → /gouti/report-animation (no Supabase). Remove skip when done.
 */
export default function GoutiFormPage() {
  redirect("/form?journey=gouti&skip=1");
}
