import Image from "next/image";
import { Reveal } from "@/components/gouti/Reveal";

/**
 * With vs Without compare — adapted from StanleyCompare for Blueprint.
 * Used on /gouti/landing after reviews.
 */
export default function BlueprintCompare() {
  return (
    <section
      className="bg-white px-5 py-12 sm:px-8 sm:py-16"
      aria-label="Starting without Your Blueprint versus with one"
    >
      <div className="mx-auto grid max-w-[1000px] gap-5 md:grid-cols-2">
        <Reveal>
          <div className="rounded-[28px] border border-black/[0.06] bg-[#FAFAFA] p-6 sm:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#999]">
              Without Your Blueprint
            </p>
            <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-[14px] font-medium text-[#121212]">Untitled draft</p>
              <p className="mt-1 text-[12px] text-[#999]">Opened 14 times · never posted</p>
              <div className="mt-4 rounded-xl bg-[#F5F5F5] px-3 py-3">
                <p className="text-[13px] text-[#333]">
                  Figure out what to post (again)
                </p>
                <p className="mt-1 text-[11px] text-[#999]">
                  Tonight · postponed weekly
                </p>
              </div>
              <p className="mt-4 text-[12px] text-[#999]">
                Ideas · 47 notes · still stuck
              </p>
            </div>
            <p className="mt-5 text-[15px] text-[#666]">
              Endless tabs and a feed you never start.
            </p>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="rounded-[28px] border border-[#FFA126]/25 bg-[#FFF8F0] p-6 sm:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#FFA126]">
              With Your Blueprint
            </p>
            <div className="mt-5 space-y-3">
              {[
                {
                  time: "Day 1",
                  text: "Your identity named in one clear line.",
                },
                {
                  time: "Day 1",
                  text: "Strengths, blockers, and first move mapped.",
                },
                {
                  time: "This week",
                  text: "You know exactly where to start — and why.",
                },
              ].map((m) => (
                <div
                  key={m.text}
                  className="flex items-start gap-2.5 rounded-2xl bg-white p-3.5 shadow-sm"
                >
                  <Image
                    src="/logo-dp.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="mt-0.5 h-7 w-7 rounded-full"
                  />
                  <div>
                    <p className="text-[12px] font-semibold text-[#121212]">
                      Your Blueprint
                    </p>
                    <p className="mt-0.5 text-[13px] leading-snug text-[#333]">
                      {m.text}
                    </p>
                    <p className="mt-1 text-[11px] text-[#999]">{m.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[15px] font-medium text-[#121212]">
              Clarity first. Then you move.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
