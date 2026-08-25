import Image from "next/image";

type BackstoryProps = {
  stacked?: boolean;
  hideHeading?: boolean;
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <span className="text-sm font-semibold leading-none" aria-hidden="true">
      @
    </span>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Backstory({
  stacked = false,
  hideHeading = false,
}: BackstoryProps) {
  const stackedBody = (
    <div className="space-y-5 text-base leading-relaxed text-[#4A4A4A] sm:text-[17px] sm:leading-[1.75]">
      <p>
        <strong className="font-semibold text-black">
          It&apos;s not finished yet. I won&apos;t pretend it is.
        </strong>
      </p>
      <p>I&apos;m building it right now, properly, not rushing it out.</p>
      <p>
        It&apos;ll be ready in the next two weeks. No fake promises, no vague
        &quot;coming soon.&quot;
      </p>
      <p>
        <strong className="font-semibold text-black">
          The first 100 people who reserve it get it for{" "}
          <span className="font-medium text-[#999] line-through">$149</span>{" "}
          $69.
        </strong>
      </p>
      <p>Once those 100 spots are gone, the price goes to $149.</p>
      <p>Permanently. No discounts, no exceptions.</p>
    </div>
  );

  if (stacked) {
    return (
      <section id="backstory" className="max-w-2xl pt-8 sm:pt-10">
        {hideHeading ? null : (
          <h2
            className="m-0 text-[28px] font-normal italic leading-[1.2] text-black sm:text-[36px]"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            The Story behind this
          </h2>
        )}
        <div className={hideHeading ? "" : "mt-6 sm:mt-8"}>{stackedBody}</div>
      </section>
    );
  }

  return (
    <section id="backstory" className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-10 xl:gap-12">
        {/* Founder card — neobrutalist */}
        <div className="mx-auto w-full max-w-[220px] border-2 border-black bg-white shadow-[8px_8px_0_0_#000] sm:max-w-[236px] lg:mx-0 lg:translate-x-[18px]">
          <div className="border-b-2 border-black p-2.5 sm:p-3">
            <Image
              src="/dp.jpg"
              alt="Andy, Founder of Your Blueprint"
              width={680}
              height={680}
              className="aspect-square h-auto w-full object-cover"
              priority={false}
            />
          </div>
          <div className="flex items-center justify-between gap-2 px-3 py-3">
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-bold text-black">
                @creatorandy
              </p>
              <p className="text-[10px] leading-tight text-[#6B6B6B]">
                Founder &amp; Creator
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <a
                href="https://www.instagram.com/creatorandy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center border border-black bg-[#FFC940] text-black transition hover:bg-[#ffd966]"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.threads.com/creatorandy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center border border-black bg-[#FFC940] text-black transition hover:bg-[#ffd966]"
                aria-label="Threads"
              >
                <ThreadsIcon />
              </a>
              <a
                href="mailto:andy@yourblueprint.in"
                className="flex h-7 w-7 items-center justify-center border border-black bg-[#FFC940] text-black transition hover:bg-[#ffd966]"
                aria-label="Email Andy"
              >
                <EmailIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="text-center lg:text-left">
          <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
            <span className="hidden h-px w-8 bg-black sm:block" aria-hidden="true" />
            <p className="text-[11px] font-semibold tracking-[0.16em] text-black sm:text-xs">
              CREATOR-LED
            </p>
          </div>

          <h2
            className="mb-5 text-[clamp(2rem,5vw,3rem)] leading-[0.95] tracking-wide text-black sm:mb-6"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            Meet the founder.
          </h2>

          <div className="space-y-5 text-base leading-relaxed text-[#4A4A4A] sm:text-[17px] sm:leading-[1.75]">
            <p>
              Andy spent years trying to start on social media, stuck between
              fifty ideas, never actually posting. Once he figured out his own
              direction, everything moved fast - real growth, real income, and a
              life he always wanted.
            </p>
            <p>
              He built Your Blueprint because the hardest part was never the
              content. It was knowing where to start. Blueprint isn&apos;t a
              cheat code to help you succeed, it&apos;s a compass, so you can
              start.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
