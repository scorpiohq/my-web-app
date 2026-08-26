import { supabaseAdmin } from "@/lib/supabase-admin";

/** Hero / pricing still say “of 100”. */
export const TOTAL_BLUEPRINT_SPOTS = 100;

/**
 * Counter starts at 19 from this paid baseline.
 * Each new paid submission after this decreases spots by 1.
 * (You were at ~2 paid when this was set — 100 − 2 = 98 on the old formula.)
 */
const SPOTS_AT_BASELINE = 19;
const PAID_BASELINE = 2;

const FALLBACK_SPOTS_REMAINING = SPOTS_AT_BASELINE;

/**
 * Spots left from the 19 baseline, decreasing as paid count rises.
 */
export async function getSpotsRemaining(): Promise<number> {
  try {
    const { count, error } = await supabaseAdmin
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .eq("payment_status", "paid");

    if (error) {
      console.error("getSpotsRemaining:", error.message);
      return FALLBACK_SPOTS_REMAINING;
    }

    const paid = count ?? 0;
    const soldSinceBaseline = Math.max(0, paid - PAID_BASELINE);
    return Math.max(0, SPOTS_AT_BASELINE - soldSinceBaseline);
  } catch (error) {
    console.error("getSpotsRemaining:", error);
    return FALLBACK_SPOTS_REMAINING;
  }
}
