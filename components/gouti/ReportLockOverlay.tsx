"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { setGenerationStatus } from "@/components/gouti/BlueprintSearchIntro";
import { journeyFadeTo } from "@/components/gouti/journeyFade";

export const REPORT_LOCK_REVEAL = "report-lock-reveal";
export const REPORT_BUILD_COMPLETE = "report-build-complete";

/**
 * Lock sits over the report (sharp). Hidden until `report-lock-reveal`
 * after the identity-description section builds in.
 * UNLOCK! button appears after the full background report build completes.
 *
 * Starts CSS-hidden so it never flashes on first paint (GSAP alone was too late).
 */
export default function ReportLockOverlay({
  unlockHref = "/gouti/checkout-preview",
}: {
  unlockHref?: string;
} = {}) {
  const router = useRouter();
  const iconRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const icon = iconRef.current;
    const button = buttonRef.current;
    if (!icon || !button) return;

    // Belts-and-suspenders: hide before paint, even if CSS is overridden
    gsap.set(icon, {
      opacity: 0,
      scale: 0.72,
      y: 10,
      filter: "blur(6px)",
      visibility: "hidden",
    });
    gsap.set(button, {
      opacity: 0,
      scale: 0.92,
      y: 8,
      filter: "blur(4px)",
      visibility: "hidden",
    });

    const revealLock = () => {
      gsap.set(icon, { visibility: "visible" });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(icon, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "back.out(1.6)",
        })
        .to(
          icon,
          {
            y: -4,
            duration: 1.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          },
          "+=0.15",
        );
    };

    const revealButton = () => {
      gsap.set(button, { visibility: "visible" });
      gsap.to(button, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        ease: "back.out(1.4)",
      });

      setGenerationStatus("Your Blueprint is ready…");
    };

    window.addEventListener(REPORT_LOCK_REVEAL, revealLock);
    window.addEventListener(REPORT_BUILD_COMPLETE, revealButton);
    return () => {
      window.removeEventListener(REPORT_LOCK_REVEAL, revealLock);
      window.removeEventListener(REPORT_BUILD_COMPLETE, revealButton);
      gsap.killTweensOf(icon);
      gsap.killTweensOf(button);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
    >
      {/* ~after identity description / before “Why This Direction…” */}
      <div className="absolute left-1/2 top-[38%] flex -translate-x-1/2 flex-col items-center gap-3 sm:gap-3.5">
        <div
          ref={iconRef}
          className="opacity-0"
          style={{ visibility: "hidden" }}
        >
          <Image
            src="/lock.svg"
            alt=""
            width={56}
            height={56}
            className="h-[clamp(32px,8vw,52px)] w-auto drop-shadow-[0_4px_14px_rgba(0,0,0,0.4)]"
            priority
          />
        </div>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => journeyFadeTo(unlockHref, router, { durationMs: 520 })}
          className="pointer-events-auto inline-flex items-center justify-center border-2 border-black bg-[#FFA126] px-5 py-2 text-[15px] font-bold tracking-[-0.02em] text-black opacity-0 shadow-[4px_4px_0_0_#000] transition hover:bg-[#ffb044] sm:px-6 sm:py-2.5 sm:text-[16px]"
          style={{ visibility: "hidden" }}
          tabIndex={-1}
          aria-hidden="true"
        >
          UNLOCK!
        </button>
      </div>
    </div>
  );
}
