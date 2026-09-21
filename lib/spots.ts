import { supabaseAdmin } from "@/lib/supabase-admin";

/** Hero / pricing still say “of 100”. */
export const TOTAL_BLUEPRINT_SPOTS = 100;

/**
 * Displayed claimed spots start at 27 from this paid baseline.
 * Hard-capped at 99 so the bar never shows 100/100 — still looks open.
 */
const SPOTS_CLAIMED_AT_BASELINE = 27;
/** Never show more than this, even if real paid sales go past 100. */
const MAX_DISPLAYED_CLAIMED = 99;

/**
 * Hero “X people have already built…” starts here; grows with the same
 * paid-delta as the spots bar.
 */
const BLUEPRINTS_BUILT_AT_BASELINE = 127;

/**
 * Paid submissions count when these display baselines were last set.
 * Bump this to the current paid count whenever you reset the numbers.
 */
const PAID_BASELINE = 4;

const FALLBACK_SOLD_SINCE = 0;

async function getSoldSinceBaseline(): Promise<number> {
  try {
    const { count, error } = await supabaseAdmin
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .eq("payment_status", "paid");

    if (error) {
      console.error("getSoldSinceBaseline:", error.message);
      return FALLBACK_SOLD_SINCE;
    }

    return Math.max(0, (count ?? 0) - PAID_BASELINE);
  } catch (error) {
    console.error("getSoldSinceBaseline:", error);
    return FALLBACK_SOLD_SINCE;
  }
}

export type LaunchSpotStats = {
  /** Claimed spots for the pricing bar (27 → 99). */
  spotsClaimed: number;
  /** Hero social-proof count (127+, same growth as spots). */
  blueprintsBuilt: number;
};

/** One paid-count read → both display numbers. */
export async function getLaunchSpotStats(): Promise<LaunchSpotStats> {
  const sold = await getSoldSinceBaseline();
  return {
    spotsClaimed: Math.min(
      MAX_DISPLAYED_CLAIMED,
      SPOTS_CLAIMED_AT_BASELINE + sold,
    ),
    blueprintsBuilt: BLUEPRINTS_BUILT_AT_BASELINE + sold,
  };
}

/**
 * Claimed / sold spots for the pricing bar (starts at 27, capped at 99).
 * +1 for each paid submission after PAID_BASELINE.
 */
export async function getSpotsRemaining(): Promise<number> {
  const { spotsClaimed } = await getLaunchSpotStats();
  return spotsClaimed;
}

/**
 * Hero social proof — starts at 127, +1 with the same paid growth as spots.
 */
export async function getBlueprintsBuiltCount(): Promise<number> {
  const { blueprintsBuilt } = await getLaunchSpotStats();
  return blueprintsBuilt;
}

/** Paid Blueprints in the last N days (for other social proof). */
const RECENT_BLUEPRINTS_FALLBACK = 12;

export async function getRecentBlueprintsCount(days = 3): Promise<number> {
  try {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const { count, error } = await supabaseAdmin
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .eq("payment_status", "paid")
      .gte("created_at", since.toISOString());

    if (error) {
      console.error("getRecentBlueprintsCount:", error.message);
      return RECENT_BLUEPRINTS_FALLBACK;
    }

    // Floor so the line never reads empty while volume is still low.
    return Math.max(count ?? 0, RECENT_BLUEPRINTS_FALLBACK);
  } catch (error) {
    console.error("getRecentBlueprintsCount:", error);
    return RECENT_BLUEPRINTS_FALLBACK;
  }
}
