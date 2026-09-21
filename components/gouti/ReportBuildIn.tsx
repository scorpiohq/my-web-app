"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import {
  BLUEPRINT_SEARCH_COMPLETE,
  hasBlueprintSearchCompleted,
} from "@/components/gouti/BlueprintSearchIntro";
import { REPORT_LOCK_REVEAL, REPORT_BUILD_COMPLETE } from "@/components/gouti/ReportLockOverlay";

const BUILD_COUNT = 10;
const FRAME_W = 2214;
const FRAME_H = 3365;
const FRAME_RADIUS = 25;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function ensureSkeletonStyles() {
  if (document.getElementById("report-build-skeleton-style")) return;
  const style = document.createElement("style");
  style.id = "report-build-skeleton-style";
  style.textContent = `
    @keyframes report-skel-shimmer {
      0% { background-position: 100% 0; }
      100% { background-position: -100% 0; }
    }
    [data-report-skel-bar] {
      border-radius: 999px;
      background: linear-gradient(
        90deg,
        #e8e6e4 0%,
        #f4f2f0 45%,
        #e8e6e4 90%
      );
      background-size: 200% 100%;
      animation: report-skel-shimmer 1.05s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}

function typeDuration(charCount: number) {
  // Slightly slower for animation3 feel.
  return Math.min(1.15, Math.max(0.38, charCount * 0.028));
}

function mountLineSkeleton(el: HTMLElement) {
  ensureSkeletonStyles();
  const height = Math.max(el.offsetHeight || 48, 40);
  const width = el.dataset.skelW || "70%";
  el.style.minHeight = `${height}px`;
  el.style.position = el.style.position || "relative";

  const bar = document.createElement("div");
  bar.dataset.reportSkelBar = "1";
  bar.setAttribute("aria-hidden", "true");
  bar.style.cssText = [
    "position:absolute",
    "left:0",
    "top:50%",
    "transform:translateY(-50%)",
    `width:${width}`,
    `height:${Math.round(height * 0.72)}px`,
    "pointer-events:none",
    "z-index:2",
  ].join(";");
  el.appendChild(bar);
  return bar;
}

function skeletonThenType(
  tl: gsap.core.Timeline,
  el: HTMLElement,
  fullText: string,
  restoreHtml: string,
  at: string | number,
) {
  let bar: HTMLElement | null = null;

  tl.add(() => {
    el.innerHTML = "";
    gsap.set(el, { opacity: 1 });
    bar = mountLineSkeleton(el);
    gsap.fromTo(
      bar,
      { opacity: 0, x: 10 },
      { opacity: 1, x: 0, duration: 0.32, ease: "power3.out" },
    );
  }, at);

  tl.to({}, { duration: 0.28 });

  tl.add(() => {
    if (!bar) return;
    const b = bar;
    gsap.to(b, {
      opacity: 0,
      duration: 0.14,
      onComplete: () => b.remove(),
    });
    bar = null;
  });

  tl.to({}, { duration: 0.1 });

  const state = { n: 0 };
  const dur = typeDuration(fullText.length);

  tl.add(() => {
    el.textContent = "";
    gsap.set(el, { opacity: 1 });
  });

  tl.to(state, {
    n: fullText.length,
    duration: dur,
    ease: "none",
    onUpdate: () => {
      el.textContent = fullText.slice(0, Math.round(state.n));
    },
    onComplete: () => {
      el.innerHTML = restoreHtml;
      el.style.minHeight = "";
      el.style.opacity = "1";
    },
  });
}

/**
 * 1) Waits for generation intro (`blueprint-search-complete`)
 * 2) Report card soft-fades in under the status
 * 3) Header → logo → photo → skeleton→type details → rest
 *
 * `gentleScroll` (report-animation): tiny page nudges from the first
 * typed line onward so the viewport drifts with the build — not a big scroll.
 */
export default function ReportBuildIn({
  gentleScroll = false,
}: {
  gentleScroll?: boolean;
} = {}) {
  useLayoutEffect(() => {
    const frame = document.querySelector<HTMLElement>("[data-report-frame]");
    const content = document.querySelector<HTMLElement>("[data-report-content]");
    const article = document.querySelector<HTMLElement>("[data-report-article]");
    const camera = document.querySelector<HTMLElement>("[data-report-camera]");
    const root = document.getElementById("report-pdf-source");
    if (!frame || !content || !article || !camera || !root) return;
    if (prefersReducedMotion()) return;

    const nudgePage = (px: number) => {
      if (!gentleScroll || px === 0) return;
      window.scrollBy({ top: px, left: 0, behavior: "smooth" });
    };

    const groups = Array.from({ length: BUILD_COUNT }, (_, i) =>
      root.querySelectorAll(`[data-report-build="${i + 1}"]`),
    );
    const required = [1, 2, 6, 7, 8, 9, 10];
    if (required.some((step) => groups[step - 1].length === 0)) return;

    const photoGroup = root.querySelector<HTMLElement>(
      "[data-report-photo-group]",
    );
    const typeLines = Array.from(
      root.querySelectorAll<HTMLElement>("[data-report-type-line]"),
    );
    if (typeLines.length === 0) return;

    const lineOriginals = typeLines.map((el) => ({
      el,
      html: el.innerHTML,
      text: (el.textContent ?? "").replace(/\s+/g, " ").trim(),
    }));

    // Exact final frame look (matches Tailwind on data-report-frame)
    const applyFinalFrameStyles = () => {
      frame.style.width = "";
      frame.style.height = "";
      frame.style.borderRadius = "";
      frame.style.borderColor = "";
      frame.style.borderWidth = "";
      frame.style.borderStyle = "";
      frame.style.boxShadow = "";
      frame.style.backgroundColor = "";
      frame.style.overflow = "";
      frame.style.setProperty("background-color", "#ffffff");
    };

    const lockFullFrame = () => {
      frame.style.width = `${FRAME_W}px`;
      frame.style.height = `${FRAME_H}px`;
      frame.style.borderRadius = `${FRAME_RADIUS}px`;
      frame.style.backgroundColor = "#ffffff";
      frame.style.borderColor = "#000000";
      frame.style.borderWidth = "0.3px";
      frame.style.borderStyle = "solid";
      frame.style.boxShadow = "0 4px 4px rgba(0,0,0,0.25)";
      frame.style.overflow = "hidden";
      applyFinalFrameStyles();
    };

    let ctx: gsap.Context | null = null;
    let started = false;

    const cleanupVisuals = () => {
      root.querySelectorAll("[data-report-skel-bar]").forEach((n) => n.remove());
      lineOriginals.forEach(({ el, html }) => {
        el.innerHTML = html;
        el.style.minHeight = "";
        el.style.opacity = "1";
      });
      frame.style.width = "";
      frame.style.height = "";
      frame.style.borderRadius = "";
      frame.style.borderColor = "";
      frame.style.borderWidth = "";
      frame.style.boxShadow = "";
      frame.style.overflow = "";
      content.style.opacity = "";
      gsap.set(camera, { clearProps: "transform,opacity,filter" });
      ctx?.revert();
    };

    const startBuild = () => {
      if (started) return;
      started = true;
      camera.classList.remove("opacity-0");

      ctx = gsap.context(() => {
        // Soft rise-in (no hard slide from off-screen)
        lockFullFrame();
        gsap.set(content, { opacity: 0 });
        typeLines.forEach((el) => gsap.set(el, { opacity: 0 }));

        [1, 2, 6, 7, 8, 9, 10].forEach((step) => {
          gsap.set(groups[step - 1], {
            opacity: 0,
            y: 14,
            filter: "blur(6px)",
          });
        });

        if (photoGroup) {
          gsap.set(photoGroup, {
            opacity: 0,
            y: 14,
            filter: "blur(6px)",
          });
        }

        // Soft rise-in (no hard slide from off-screen)
        gsap.set(camera, { opacity: 0, y: 22, filter: "blur(8px)" });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            applyFinalFrameStyles();
            gsap.set(camera, { clearProps: "transform,opacity,filter" });
            lineOriginals.forEach(({ el, html }) => {
              el.innerHTML = html;
              el.style.minHeight = "";
              el.style.opacity = "1";
            });
            window.dispatchEvent(new Event(REPORT_BUILD_COMPLETE));
          },
        });

        const fadeUp = (
          nodes: NodeListOf<Element> | Element[],
          at: string | number,
          duration = 0.75,
        ) => {
          tl.to(
            nodes,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration,
              clearProps: "transform,filter",
            },
            at,
          );
        };

        // ——— Report eases in under the generation status ———
        tl.to(
          camera,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
          },
          0.05,
        );

        // Content builds inside the card
        tl.to(content, { opacity: 1, duration: 0.28 }, "+=0.08");

        fadeUp(groups[0], "+=0.1");
        fadeUp(groups[1], "-=0.28");

        if (photoGroup) {
          fadeUp([photoGroup], "+=0.14");
        }

        // Typing starts here — begin the gentle page drift
        lineOriginals.forEach(({ el, text, html }, i) => {
          if (i === 0) {
            tl.add(() => nudgePage(22), "+=0.02");
          } else if (i % 2 === 1) {
            tl.add(() => nudgePage(10), "+=0");
          }
          skeletonThenType(tl, el, text, html, i === 0 ? "+=0.08" : "+=0.12");
        });

        tl.add(() => nudgePage(16), "+=0.05");
        fadeUp(groups[5], "+=0.22");

        // Lock reveals after identity description lands (before “Why This Direction…”)
        tl.add(() => {
          nudgePage(14);
          window.dispatchEvent(new Event(REPORT_LOCK_REVEAL));
        }, "+=0.2");

        tl.add(() => nudgePage(12), "+=0.08");
        fadeUp(groups[6], "+=0.35");
        fadeUp(groups[7], "-=0.12");
        tl.add(() => nudgePage(10), "-=0.05");
        fadeUp(groups[8], "-=0.12");
        tl.add(() => nudgePage(12), "+=0.1");
        fadeUp(groups[9], "+=0.36");
      }, article);
    };

    // Hidden while generation plays above — soft reveal when build starts
    lockFullFrame();
    gsap.set(content, { opacity: 0 });
    gsap.set(camera, { opacity: 0, y: 22, filter: "blur(8px)" });

    window.addEventListener(BLUEPRINT_SEARCH_COMPLETE, startBuild);
    // Fallback if intro never fires (e.g. remount race)
    const fallback = window.setTimeout(startBuild, 14000);
    if (hasBlueprintSearchCompleted()) {
      startBuild();
    }

    return () => {
      window.removeEventListener(BLUEPRINT_SEARCH_COMPLETE, startBuild);
      window.clearTimeout(fallback);
      cleanupVisuals();
    };
  }, [gentleScroll]);

  return null;
}
