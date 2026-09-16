/**
 * Cross-page white fade for the gouti journey.
 * Overlay lives on document.body so it survives Next client navigations.
 */

const OVERLAY_ID = "gouti-journey-fade";
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function ensureOverlay(): HTMLElement {
  let overlay = document.getElementById(OVERLAY_ID);
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.cssText = [
    "position:fixed",
    "inset:0",
    "z-index:99999",
    "background:#ffffff",
    "opacity:0",
    "pointer-events:none",
    `transition:opacity 0.55s ${EASE}`,
  ].join(";");
  document.body.appendChild(overlay);
  return overlay;
}

type RouterLike = {
  push: (href: string) => void;
  replace: (href: string) => void;
};

/**
 * Fade to white, then navigate. Call `journeyFadeIn()` on the destination.
 */
export function journeyFadeTo(
  href: string,
  router: RouterLike,
  options?: { replace?: boolean; durationMs?: number },
) {
  if (typeof window === "undefined") {
    router.push(href);
    return;
  }

  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const durationMs = prefersReduced ? 0 : (options?.durationMs ?? 520);
  const overlay = ensureOverlay();
  overlay.style.pointerEvents = "auto";

  // Force reflow so the opacity transition always plays
  void overlay.offsetHeight;
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });

  window.setTimeout(() => {
    if (options?.replace) router.replace(href);
    else router.push(href);
  }, durationMs);
}

/**
 * Fade the white cover away after the next page has mounted.
 */
export function journeyFadeIn(durationMs = 580) {
  if (typeof window === "undefined") return;

  const overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) return;

  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ms = prefersReduced ? 0 : durationMs;

  overlay.style.pointerEvents = "none";
  requestAnimationFrame(() => {
    overlay.style.opacity = "0";
  });

  window.setTimeout(() => {
    overlay.remove();
  }, ms + 40);
}
