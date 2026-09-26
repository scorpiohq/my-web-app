"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { setGenerationStatus } from "@/components/gouti/BlueprintSearchIntro";
import { journeyFadeTo } from "@/components/gouti/journeyFade";
import { isUnlockReady } from "@/lib/unlock-ready";
import { markGoingToCheckout } from "@/lib/checkout-nav";

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
  checkoutSubmissionId,
}: {
  unlockHref?: string;
  checkoutSubmissionId?: string;
} = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const instantReady = isUnlockReady(searchParams);
  const iconRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const startingCheckout = useRef(false);

  useLayoutEffect(() => {
    const icon = iconRef.current;
    const button = buttonRef.current;
    if (!icon || !button) return;

    if (instantReady) {
      gsap.set(icon, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        visibility: "visible",
      });
      gsap.set(button, {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        visibility: "visible",
      });
      gsap.to(icon, {
        y: -4,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      return () => {
        gsap.killTweensOf(icon);
        gsap.killTweensOf(button);
      };
    }

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
  }, [instantReady]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
    >
      {/* ~after identity description / before “Why This Direction…” */}
      <div
        className="absolute left-1/2 top-[38%] flex w-max -translate-x-[calc(50%+10px)] flex-col items-center gap-3 sm:gap-3.5"
        data-report-ready-anchor
      >
        <div
          ref={iconRef}
          className={instantReady ? "" : "opacity-0"}
          style={{ visibility: instantReady ? "visible" : "hidden" }}
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
          onClick={async () => {
            if (!checkoutSubmissionId) {
              journeyFadeTo(unlockHref, router, { durationMs: 520 });
              return;
            }
            if (startingCheckout.current) return;
            startingCheckout.current = true;
            try {
              const res = await fetch("/api/start-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  submissionId: checkoutSubmissionId,
                  journey: "gouti",
                }),
              });
              const result = await res.json();
              if (result.alreadyPaid && result.progressUrl) {
                markGoingToCheckout();
                journeyFadeTo(result.progressUrl, router, { durationMs: 520 });
                return;
              }
              if (!res.ok || !result.checkoutUrl) {
                throw new Error(result.error || "Could not start checkout");
              }
              markGoingToCheckout();
              window.location.assign(result.checkoutUrl);
            } catch (error) {
              startingCheckout.current = false;
              alert(
                error instanceof Error
                  ? error.message
                  : "Something went wrong starting checkout.",
              );
            }
          }}
          className={`btn-brutal btn-brutal-primary pointer-events-auto inline-flex min-h-[40px] min-w-[180px] items-center justify-center px-5 py-2 text-xs font-bold uppercase tracking-wide text-black sm:min-h-[44px] sm:min-w-[200px] sm:px-6 sm:text-sm${instantReady ? "" : " opacity-0"}`}
          style={{
            visibility: instantReady ? "visible" : "hidden",
            fontFamily: "var(--font-bricolage), \"Bricolage Grotesque\", sans-serif",
          }}
          tabIndex={-1}
          aria-hidden="true"
        >
          UNLOCK MY BLUEPRINT
        </button>
      </div>
    </div>
  );
}
