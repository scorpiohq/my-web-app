"use client";

import { Reveal } from "@/components/gouti/Reveal";

const WAVE_HEIGHTS = [
  0.24, 0.24, 0.35, 0.47, 0.71, 0.24, 0.24, 0.35, 0.82, 1.06, 0.82, 1.18,
  1.06, 1.53, 1.06, 1.06, 1.18, 0.71, 0.47, 0.24, 0.47, 0.71, 0.59, 0.82,
  1.18, 1.29, 0.94, 0.59, 0.82, 0.82, 1.06, 1.41, 0.94, 1.65, 2.0, 1.41,
  1.06, 1.18, 0.59, 0.24,
];

function BlueprintAvatar({ size = 28 }: { size?: number }) {
  return (
    <img
      src="/logo-dp.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="shrink-0 rounded-full"
      draggable={false}
    />
  );
}

/**
 * Stanley-style “whole loop” chat section — adapted for Blueprint.
 * Look from https://x.getstanley.ai/welcome — used on /gouti/landing before pricing.
 */
export default function BlueprintLoop() {
  return (
    <section
      id="blueprint-loop"
      className="mx-auto max-w-[1100px] bg-white px-5 py-14 sm:px-8 sm:py-20"
    >
      <Reveal className="mx-auto max-w-[640px] text-center">
        <h2 className="m-0 text-[#121212]">
          That&apos;s why{" "}
          <span className="bp-loop__mark relative inline-block whitespace-nowrap rounded-[0.2em] px-[0.2em]">
            <span
              className="bp-loop__mark-fill absolute inset-[0.14em_0_0.02em] -z-10 rounded-[inherit] bg-[#e8dffc]"
              aria-hidden="true"
            />
            Your Blueprint
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-[#666] sm:text-[16px]">
          Questions in. Clarity out. Your identity, strengths, blockers, and
          first move — all in one Blueprint.
        </p>
      </Reveal>

      <Reveal className="mx-auto mt-10 max-w-[400px] sm:mt-12" delayMs={60}>
        <div
          className="space-y-2.5"
          role="region"
          aria-label="How Your Blueprint turns answers into a clear first move"
        >
          <p className="text-center text-[11px] text-[#999]">Today at 4:15 PM</p>

          {/* Voice note — me */}
          <div className="flex justify-end">
            <div className="max-w-[78%] rounded-[20px] rounded-br-[6px] bg-[#007AFF] px-3.5 py-2.5 text-white shadow-sm">
              <span
                className="flex items-center gap-2"
                role="img"
                aria-label="Voice note, 0:41"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white" aria-hidden="true">
                    <path d="M9.2 7.1c0-.9 1-1.5 1.8-1l7.4 4.9c.7.5.7 1.5 0 2l-7.4 4.9c-.8.5-1.8-.1-1.8-1z" />
                  </svg>
                </span>
                <span className="flex h-5 flex-1 items-center gap-[2px]" aria-hidden="true">
                  {WAVE_HEIGHTS.map((h, i) => (
                    <i
                      key={i}
                      className="inline-block w-[2px] rounded-full bg-white/90"
                      style={{ height: `${h * 0.55}em` }}
                    />
                  ))}
                </span>
                <span className="shrink-0 text-[12px] font-medium tabular-nums">
                  0:41
                </span>
              </span>
            </div>
          </div>

          {/* Blueprint reply */}
          <div className="flex items-end gap-2">
            <BlueprintAvatar size={28} />
            <div className="max-w-[85%] rounded-[20px] rounded-bl-[6px] bg-[#E9E9EB] px-3.5 py-2.5 text-[13px] leading-snug text-[#111]">
              love it. apartment-tour energy fits Instagram 😂 your Blueprint
              says start there — hooks from real life. ready?
            </div>
          </div>

          {/* User confirm */}
          <div className="flex justify-end">
            <div className="max-w-[55%] rounded-[20px] rounded-br-[6px] bg-[#007AFF] px-3.5 py-2 text-[13px] text-white">
              let&apos;s go
            </div>
          </div>

          {/* Blueprint scheduled */}
          <div className="flex items-end gap-2">
            <span className="h-7 w-7 shrink-0" aria-hidden="true" />
            <div className="relative max-w-[85%] rounded-[20px] rounded-bl-[6px] bg-[#E9E9EB] px-3.5 py-2.5 text-[13px] leading-snug text-[#111]">
              locked in ✅ building your Blueprint now
            </div>
          </div>

          {/* Final + heart tapback */}
          <div className="flex items-end gap-2">
            <BlueprintAvatar size={28} />
            <div className="relative max-w-[88%] rounded-[20px] rounded-bl-[6px] bg-[#E9E9EB] px-3.5 py-2.5 text-[13px] leading-snug text-[#111]">
              done. identity named. strengths mapped. first move clear — go
              post.
              <span
                className="absolute -right-1 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                aria-hidden="true"
              >
                ❤️
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
