"use client";

import { useState } from "react";
import { PlatformIcon } from "@/components/gouti/PlatformIcons";
import { Reveal } from "@/components/gouti/Reveal";

const platforms = [
  { id: "youtube", label: "YouTube" },
  { id: "x", label: "X" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "threads", label: "Threads" },
  { id: "instagram", label: "Instagram" },
  { id: "substack", label: "Substack" },
] as const;

/**
 * Stanley-style statement section — staggered left headline + platforms.
 * Look from https://x.getstanley.ai/welcome — Blueprint logo in place of mascot.
 */
export default function BlueprintThread() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="blueprint-thread"
      className="bp-thread mx-auto max-w-[1100px] bg-white px-5 py-14 sm:px-8 sm:py-20"
    >
      <Reveal>
        <h2 className="bp-thread__title m-0 text-[#121212]">
          <span className="bp-thread__line bp-thread__line--1">
            <span>One path,</span>
          </span>{" "}
          <span className="bp-thread__line bp-thread__line--2">
            <span>
              <img
                className="bp-thread__mascot"
                src="/logo-dp.svg"
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
                draggable={false}
              />
              across platforms,
            </span>
          </span>{" "}
          <span className="bp-thread__line bp-thread__line--3">
            <span>
              <span className="bp-thread__mark">
                <span className="bp-thread__mark-fill" aria-hidden="true" />
                always clear.
              </span>
            </span>
          </span>
        </h2>

        <p className="bp-thread__sub mx-auto mt-5 max-w-[520px] text-center text-[15px] leading-relaxed text-[#666] sm:mt-6 sm:text-[16px]">
          Your Blueprint tells you where to start — Instagram, YouTube, TikTok,
          Threads, or wherever you&apos;re headed — built around you, not a
          generic playbook.
        </p>
      </Reveal>

      <Reveal delayMs={80}>
        <div
          className="bp-thread__platforms mt-10 flex justify-center sm:mt-12"
          role="region"
          aria-label="Platforms you can start on"
        >
          <div className="bp-thread__tilt flex flex-wrap items-end justify-center gap-3 sm:gap-4">
            {platforms.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={p.label}
                aria-pressed={active === p.id}
                onClick={() => setActive(active === p.id ? null : p.id)}
                className={`bp-thread__tile bp-thread__tile--${i + 1} relative aspect-square w-[56px] rounded-[18%] border-0 bg-transparent p-0 shadow-[0_10px_28px_rgba(0,0,0,0.11)] transition-[transform,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:brightness-105 active:scale-[0.96] sm:w-[72px] ${
                  active === p.id ? "ring-2 ring-[#FFA126] ring-offset-2" : ""
                }`}
              >
                <span className="block h-full w-full overflow-hidden rounded-[18%]">
                  <PlatformIcon name={p.id} size={72} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
