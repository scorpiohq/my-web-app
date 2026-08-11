import Link from "next/link";
import Image from "next/image";

export default function Backstory() {
  return (
    <section id="backstory" className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-16 xl:gap-20">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-black">
          The Story behind this
        </h2>

        <div className="space-y-5 text-base leading-relaxed text-[#4A4A4A] sm:text-[17px] sm:leading-[1.75]">
          <p>Hey there…</p>

          <p>There&apos;s a good chance I know why you&apos;re here.</p>

          <p>
            You&apos;ve got the ideas. You&apos;ve got the motivation.
            Money&apos;s not even the problem. But you still haven&apos;t
            started your social media journey, while people just like you are
            already doing it successfully.
          </p>

          <p>
            I know that feeling of blaming yourself for it. Wondering why they
            can figure it out and you can&apos;t. I was there too, almost 3
            years ago.
          </p>

          <p>
            I used to just dream about it, having a following, making real
            money, living the life I saw everyone else living online. But I
            never actually started. Not because I didn&apos;t want to, but
            because I didn&apos;t know <em>how</em>. Where do you even take the
            first step? That uncertainty stressed me out so much, I started
            losing interest in my own life.
          </p>

          <p>
            Then one day, one piece of content changed that. I made my first
            post. Nothing crazy happened - but I finally had a path. And this
            time, I didn&apos;t quit.
          </p>

          <p>
            Today I&apos;ve grown to 100k+ followers across multiple platforms,
            built enough income to be financially free from it, and honestly -
            I&apos;ve gotten my excitement for life back too.
          </p>

          <p>
            Here&apos;s what I learned along the way: not everyone has the same
            resources, the same skills, or the same starting point, which is
            exactly why generic courses and mentorships don&apos;t work for most
            people.
          </p>

          <p>
            They&apos;re built around one idea of &quot;how to start,&quot; and
            if that idea doesn&apos;t fit you, you just end up spending money
            and time with nothing to show for it.
          </p>

          <p>
            So I built something different: a way to help you start{" "}
            <em>your</em> journey with what you have in the way that actually
            works for you.
          </p>

          <p>
            <Link
              href="/#pricing"
              className="underline underline-offset-2"
            >
              Your Blueprint
            </Link>{" "}
            to Start!!
          </p>

          <div className="flex items-center gap-4 pt-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[10px] border-2 border-black">
              <Image
                src="/dp.jpg"
                alt="Andy"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-base text-black">
                <span className="font-semibold">Andy</span>,{" "}
                <Link
                  href="mailto:andy@yourblueprint.in"
                  className="underline underline-offset-2"
                >
                  andy@yourblueprint.in
                </Link>
              </p>
              <p className="text-sm text-[#6B6B6B]">Founder &amp; Creator</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
