import Link from "next/link";
import { Reveal } from "@/components/gouti/Reveal";

const bullets = [
  {
    title: "Your Creator Identity",
    body: "Not a niche. Your own identity — the one you'll become known for once you start creating, and the exact reason it fits you. Basically, becoming \"that guy\" on the internet, tagline and all.",
  },
  {
    title: "Your Strengths",
    body: "The edge you already have in the creator space. Everyone has one, you're just not aware of yours yet.",
  },
  {
    title: "What's Holding You Back",
    body: "It's not a skill issue. It's not a consistency issue. It's something else entirely and once you fix it, real progress starts.",
  },
  {
    title: "Your Next Move",
    body: "Everyone wants to start. Then your brain talks you out of it, and nothing moves. This is the exact next step, so \"starting\" stops being a thing.",
  },
  {
    title: "What's Still on You",
    body: "A Blueprint gets you a clear plan. It doesn't take the action for you. That part's yours.",
  },
] as const;

/**
 * “Why now” — centered copy + CTA (visual assets removed).
 */
export default function WhyNow({ ctaHref }: { ctaHref: string }) {
  return (
    <section
      id="why-now"
      className="px-5 py-12 sm:px-8 sm:py-16"
      aria-label="Why Your Blueprint, why now"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <Reveal className="flex w-full flex-col items-center">
          <span className="mb-4 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-5 sm:text-xs">
            WHAT YOU GET
          </span>

          <h2 className="why-now__title mt-0 m-0 max-w-[44rem] font-bold tracking-[-0.02em] text-[#252720]">
            <span className="why-now__line text-[#9A9A9A]">
              People used to get stuck not knowing
            </span>
            <span className="why-now__line">
              <span className="text-[#9A9A9A]">where to start. </span>
              <span className="why-now__highlight">Now they have a Blueprint.</span>
            </span>
          </h2>

          <ul className="mt-8 w-full max-w-2xl space-y-7 text-left sm:mt-10 sm:space-y-8">
            {bullets.map((item) => (
              <li key={item.title}>
                <p className="why-now__body m-0 text-[17px] leading-[1.7] text-[#6B6B6B] sm:text-[18px]">
                  <span className="why-now__point-title font-semibold text-[#252720]">
                    <span className="why-now__star" aria-hidden>
                      ✰
                    </span>{" "}
                    {item.title}:
                  </span>{" "}
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <Link
            href={ctaHref}
            className="btn-brutal btn-brutal-primary mt-8 inline-flex min-h-[52px] min-w-[240px] items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black sm:mt-9 sm:min-h-[56px] sm:min-w-[280px] sm:px-10 sm:text-base"
          >
            Let&apos;s Build Your Blueprint →
          </Link>

          <p
            className="mt-4 text-[14px] text-[#5A5A5A] sm:mt-5 sm:text-[15px]"
            style={{ fontFamily: "var(--font-garamond), Georgia, serif" }}
          >
            It takes just a few minutes to get yours.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
