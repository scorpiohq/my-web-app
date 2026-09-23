import Image from "next/image";
import { Reveal } from "@/components/gouti/Reveal";

/**
 * DataFast-style “Meet the founder”.
 * `countryName` + `flag` come from visitor IP geo (Vercel/Cloudflare).
 * `salePrice` stays in sync with the Pricing section.
 */
export default function MeetFounder({
  countryName,
  flag,
  salePrice = "$15",
}: {
  countryName?: string | null;
  flag?: string | null;
  salePrice?: string;
} = {}) {
  const placeLabel = countryName
    ? `${countryName}${flag ? ` ${flag}` : ""}`
    : null;

  return (
    <section
      id="backstory"
      className="meet-founder px-5 py-14 sm:px-8 sm:py-20"
      aria-label="Meet the founder"
    >
      <div className="mx-auto w-full max-w-[42rem]">
        <Reveal className="mb-8 flex justify-center sm:mb-10">
          <span className="inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:text-xs">
            ABOUT CREATOR
          </span>
        </Reveal>

        <Reveal className="meet-founder__inner">
          <aside className="meet-founder__badge">
            <div className="meet-founder__badge-card">
              <Image
                src="/dp.jpg"
                alt="Andy, Founder of Your Blueprint"
                width={416}
                height={416}
                className="meet-founder__avatar"
              />
            </div>
            <p className="meet-founder__caption">Andy, the guy behind this.</p>
          </aside>

          <div className="meet-founder__copy">
          <p className="meet-founder__greet">
            {placeLabel ? (
              <>
                Hey bruh, how you doing in{" "}
                <span className="meet-founder__place">
                  {placeLabel}
                  <span className="meet-founder__place-arrow" aria-hidden>
                    ↓
                  </span>
                </span>
                ?
              </>
            ) : (
              <>Hey bruh, how you doing?</>
            )}
          </p>

          <p>
            I&apos;m Andy. About 3 years ago, I was exactly like you, stuck, not
            sure how to start. I wasted 2 years figuring it out before I finally
            started.
          </p>

          <p>
            Since then, I&apos;ve grown to 100k followers and made well over
            $40k. It&apos;s not much compared to others, but for me, it was way
            more than I ever expected.
          </p>

          <p>
            If I hadn&apos;t wasted those 2 years, I might&apos;ve done even
            better. But we can&apos;t go back in time.
          </p>

          <p>That&apos;s why I built Your Blueprint, for 3 reasons:</p>

          <ol className="meet-founder__reasons">
            <li>
              <strong>Nobody starts the same,</strong>{" "}
              Different skills, different interests, different starting points,
              that&apos;s why courses don&apos;t work for many. This gives you a
              starting point built from what you actually have, not someone
              else&apos;s path.
            </li>
            <li>
              <strong>Courses and mentorships become money-machine,</strong>{" "}
              then actually valuable for people..{" "}
              <strong>Real Help Shouldn&apos;t cost $499,</strong> This get you
              a real starting point for just {salePrice}.
            </li>
            <li>
              <strong>The hardest part was just starting.</strong>{" "}
              Once I did, everything after got easier. That&apos;s the one thing
              I actually wanted to give you.
            </li>
          </ol>

          <p>
            This isn&apos;t a course. It&apos;s not made to teach you things,
            it&apos;s a Blueprint. It helps you actually start with what you
            have, from where you&apos;re at.
          </p>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
