import { supabaseAdmin } from "@/lib/supabase-admin";

/** Hero / pricing still say “of 100”. */
export const TOTAL_BLUEPRINT_SPOTS = 100;

/**
 * Displayed claimed spots start at 92 from this paid baseline.
 * Each new paid submission after this increases the counter by 1 (capped at 100).
 * Set PAID_BASELINE to the paid count when this baseline was chosen,
 * so the UI shows 92 until the next sale.
 */
const SPOTS_CLAIMED_AT_BASELINE = 92;
/** Paid submissions count when the 92 baseline was set (was showing ~66 before). */
const PAID_BASELINE = 4;

const FALLBACK_SPOTS_CLAIMED = SPOTS_CLAIMED_AT_BASELINE;

/**
 * Claimed / sold spots for the pricing bar (starts at 92, rises with paid sales).
 */
export async function getSpotsRemaining(): Promise<number> {
  try {
    const { count, error } = await supabaseAdmin
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .eq("payment_status", "paid");

    if (error) {
      console.error("getSpotsRemaining:", error.message);
      return FALLBACK_SPOTS_CLAIMED;
    }

    const paid = count ?? 0;
    const soldSinceBaseline = Math.max(0, paid - PAID_BASELINE);
    return Math.min(
      TOTAL_BLUEPRINT_SPOTS,
      SPOTS_CLAIMED_AT_BASELINE + soldSinceBaseline,
    );
  } catch (error) {
    console.error("getSpotsRemaining:", error);
    return FALLBACK_SPOTS_CLAIMED;
  }
}
