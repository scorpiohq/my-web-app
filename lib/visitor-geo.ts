import { headers } from "next/headers";

export type VisitorGeo = {
  code: string | null;
  countryName: string | null;
  flag: string | null;
};

/** ISO 3166-1 alpha-2 → regional indicator flag emoji (e.g. IN → 🇮🇳). */
export function countryFlag(code: string): string {
  const cc = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return "";
  return String.fromCodePoint(
    ...[...cc].map((c) => 127397 + c.charCodeAt(0)),
  );
}

export function countryDisplayName(code: string): string | null {
  const cc = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc)) return null;
  try {
    const name = new Intl.DisplayNames(["en"], { type: "region" }).of(cc);
    return name && name !== cc ? name : null;
  } catch {
    return null;
  }
}

/**
 * Visitor country from host geo headers (Vercel / Cloudflare).
 * Local `next dev` usually has no geo → returns nulls (section falls back gracefully).
 */
export async function getVisitorGeo(): Promise<VisitorGeo> {
  const h = await headers();
  const raw =
    h.get("x-vercel-ip-country") ||
    h.get("cf-ipcountry") ||
    h.get("x-country-code");

  const code = raw?.trim().toUpperCase() ?? null;

  // Vercel/Cloudflare unknowns
  if (!code || code === "XX" || code === "T1" || code === "A1" || code === "A2") {
    return { code: null, countryName: null, flag: null };
  }

  const countryName = countryDisplayName(code);
  const flag = countryFlag(code);

  if (!countryName) {
    return { code: null, countryName: null, flag: null };
  }

  return { code, countryName, flag: flag || null };
}
