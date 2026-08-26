const UTM_STORAGE_KEY = "yb_first_touch_utm";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export type PurchaseProduct = "blueprint" | "gameplan";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function captureUtmsFromUrl(): void {
  if (typeof window === "undefined") return;

  try {
    if (window.localStorage.getItem(UTM_STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const utms: UtmParams = {};
    let hasAny = false;

    for (const key of UTM_KEYS) {
      const value = params.get(key)?.trim();
      if (value) {
        utms[key] = value;
        hasAny = true;
      }
    }

    if (!hasAny) return;
    window.localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
}

export function getStoredUtms(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as UtmParams;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function pushGtag(...args: unknown[]) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }

  // Queue until gtag.js loads (same shape gtag uses)
  window.dataLayer.push(args);
}

export function trackPurchase({
  product,
  transactionId,
}: {
  product: PurchaseProduct;
  transactionId: string;
}): boolean {
  if (typeof window === "undefined") return false;

  const dedupeKey = `ga_purchase_${transactionId}`;
  try {
    if (window.sessionStorage.getItem(dedupeKey)) return false;
    window.sessionStorage.setItem(dedupeKey, "1");
  } catch {
    // Continue even if sessionStorage is blocked
  }

  const value = product === "gameplan" ? 69 : 9;
  const itemName = product === "gameplan" ? "Gameplan" : "Blueprint";
  const utms = getStoredUtms();

  pushGtag("event", "purchase", {
    transaction_id: transactionId,
    value,
    currency: "USD",
    items: [
      {
        item_id: product,
        item_name: itemName,
        price: value,
        quantity: 1,
      },
    ],
    ...(utms.utm_source ? { campaign_source: utms.utm_source } : {}),
    ...(utms.utm_medium ? { campaign_medium: utms.utm_medium } : {}),
    ...(utms.utm_campaign ? { campaign: utms.utm_campaign } : {}),
    ...(utms.utm_content ? { campaign_content: utms.utm_content } : {}),
    ...(utms.utm_term ? { campaign_term: utms.utm_term } : {}),
  });

  return true;
}
