import { supabaseAdmin } from "@/lib/supabase-admin";

/** Hero / pricing still say “of 100”. */
export const TOTAL_BLUEPRINT_SPOTS = 100;

/**
 * Displayed claimed spots start at 92 from this paid baseline.
 * Hard-capped at 98 so the bar never shows 100/100 — still looks open.
 * Set PAID_BASELINE to the paid count when this baseline was chosen.
 */
const SPOTS_CLAIMED_AT_BASELINE = 92;
/** Never show more than this, even if real paid sales go past 100. */
const MAX_DISPLAYED_CLAIMED = 98;
/** Paid submissions count when the display baseline was last set. */
const PAID_BASELINE = 4;

const FALLBACK_SPOTS_CLAIMED = SPOTS_CLAIMED_AT_BASELINE;

/**
 * Claimed / sold spots for the pricing bar (starts at 92, capped at 98).
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
      MAX_DISPLAYED_CLAIMED,
      SPOTS_CLAIMED_AT_BASELINE + soldSinceBaseline,
    );
  } catch (error) {
    console.error("getSpotsRemaining:", error);
    return FALLBACK_SPOTS_CLAIMED;
  }
}
