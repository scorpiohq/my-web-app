"use client";

import {
  useEffect,
  useRef,
  useState,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from "react";
import gsap from "gsap";

export const BLUEPRINT_SEARCH_COMPLETE = "blueprint-search-complete";

/** True after the intro has finished at least once this page load. */
let searchIntroDone = false;

export function hasBlueprintSearchCompleted() {
  return searchIntroDone;
}

/** Single active status line — never stack “Reading…” and “taking shape…” */
export function setGenerationStatus(nextText: string) {
  const generation = document.querySelector("blueprint-generation");
  const root = generation?.shadowRoot;
  if (!root) return;

  const first = root.querySelector<HTMLElement>(".first");
  const second = root.querySelector<HTMLElement>(".second");
  if (!first || !second) return;

  // CSS `forwards` was keeping .first visible — kill it so GSAP owns opacity
  first.style.animation = "none";
  second.style.animation = "none";
  gsap.killTweensOf([first, second]);

  const secondActive = second.dataset.statusActive === "1";
  const from = secondActive ? second : first;

  gsap.to(from, {
    opacity: 0,
    y: -5,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      gsap.set(first, { opacity: 0, y: 0, visibility: "hidden" });
      first.dataset.statusActive = "0";

      second.dataset.statusActive = "1";
      second.style.visibility = "visible";
      second.textContent = nextText;
      gsap.fromTo(
        second,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    },
  });
}

function markSearchComplete() {
  searchIntroDone = true;
  // Report generation is starting — move status to “taking shape…”
  setGenerationStatus("Your Blueprint is taking shape…");
  window.dispatchEvent(new Event(BLUEPRINT_SEARCH_COMPLETE));
}

/**
 * Hold “Reading your answers…” longer, then start the report build
 * (status swaps to “taking shape…” when that event fires).
 * First line appears ~2.42s into the generation CSS timeline.
 */
const INTRO_DURATION_MS = 5600;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "blueprint-generation": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "user-name"?: string;
        "user-message"?: string;
        "first-line"?: string;
        "second-line"?: string;
        autoplay?: string;
      };
    }
  }
}

function loadBlueprintGenerationScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (customElements.get("blueprint-generation")) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-blueprint-generation]',
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(), { once: true });
      // Already loaded
      if (customElements.get("blueprint-generation")) resolve();
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/blueprint-generation.js";
    script.async = true;
    script.dataset.blueprintGeneration = "1";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load blueprint-generation.js"));
    document.body.appendChild(script);
  });
}

/**
 * Wraps public/blueprint-generation.js (ChatGPT artifact) for /gouti/report-animation.
 * Fires `blueprint-search-complete` when the built-in CSS timeline finishes.
 */
export default function BlueprintSearchIntro({
  userName = "Lewis Hamilton",
  userMessage = "Build my Blueprint!",
  firstLine = "Reading your answers…",
  secondLine = "Your Blueprint is taking shape…",
}: {
  userName?: string;
  userMessage?: string;
  firstLine?: string;
  secondLine?: string;
}) {
  const [ready, setReady] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    searchIntroDone = false;
    let cancelled = false;

    loadBlueprintGenerationScript()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        // If the script fails, don't block the report forever.
        if (!cancelled) markSearchComplete();
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || startedRef.current) return;
    startedRef.current = true;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const delay = prefersReduced ? 80 : INTRO_DURATION_MS;
    const timer = window.setTimeout(() => {
      markSearchComplete();
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [ready]);

  return (
    <div className="relative z-20 w-full bg-transparent [&_blueprint-generation]:block [&_blueprint-generation]:w-full [&_blueprint-generation]:bg-transparent">
      {ready ? (
        // Custom element from /public/blueprint-generation.js
        <blueprint-generation
          user-name={userName}
          user-message={userMessage}
          first-line={firstLine}
          second-line={secondLine}
        />
      ) : (
        <div className="min-h-[7.5rem] w-full sm:min-h-[8.5rem]" aria-hidden />
      )}
    </div>
  );
}
