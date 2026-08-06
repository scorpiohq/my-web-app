"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

const MOBILE_INITIAL_COUNT = 5;

function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="bg-[#FFE566] px-0.5 text-black">{children}</span>
  );
}

function Stars() {
  return (
    <div className="mb-4 flex gap-0.5 text-[#FFC940]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-lg leading-none">
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  company,
}: {
  quote: ReactNode;
  author: string;
  company: string;
}) {
  return (
    <article className="text-left">
      <Stars />
      <blockquote className="mb-4 text-sm leading-relaxed text-[#333] sm:text-[15px] sm:leading-relaxed">
        {quote}
      </blockquote>
      <p className="text-sm font-normal text-[#555] sm:text-base">
        —{author}, {company}
      </p>
    </article>
  );
}

const testimonials: {
  quote: ReactNode;
  author: string;
  company: string;
}[] = [
  {
    quote: (
      <>
        &ldquo;Simply put, we get more work done, quicker, and better.{" "}
        <Highlight>
          Productivity is up. Errors are down. Clients are happier.
        </Highlight>
        &rdquo;
      </>
    ),
    author: "Patrick Sheffield",
    company: "Moore Communications Group",
  },
  {
    quote: (
      <>
        &ldquo;
        <Highlight>
          Information flows like water. A lot more transparency. Everyone is on
          the same page.
        </Highlight>{" "}
        No more secrets and blindspots.&rdquo;
      </>
    ),
    author: "Aaron Bingaman",
    company: "Penn State Office of Emergency Management",
  },
  {
    quote: (
      <>
        &ldquo;Since using Basecamp, our{" "}
        <Highlight>
          communication is drastically better and deadlines are met without
          drama.
        </Highlight>
        &rdquo;
      </>
    ),
    author: "Shannon Kropf",
    company: "Full Sail University",
  },
  {
    quote: (
      <>
        &ldquo;
        <Highlight>We&apos;re much better organised</Highlight> and it&apos;s
        way easier to deal with clients and projects.&rdquo;
      </>
    ),
    author: "Pedro Lopes",
    company: "Coimbra Genomics",
  },
  {
    quote: (
      <>
        &ldquo;
        <Highlight>Basecamp makes us tighter as a group.</Highlight> Basecamp
        makes it easy to create shared understanding in our company.&rdquo;
      </>
    ),
    author: "Teddy Zetterlund",
    company: "Lägenhetsbyte",
  },
  {
    quote: (
      <>
        &ldquo;We don&apos;t have to contact each other about every little
        thing.{" "}
        <Highlight>
          When we need to know something, it&apos;s right there.
        </Highlight>
        &rdquo;
      </>
    ),
    author: "Kelly Hunter",
    company: "Chamber Nation",
  },
  {
    quote: (
      <>
        &ldquo;It eliminated the need for a lot of extra communication and{" "}
        <Highlight>
          reduced a lot of miscommunication between my team.
        </Highlight>
        &rdquo;
      </>
    ),
    author: "Anthony Clark",
    company: "Clark Partners Realty Group",
  },
  {
    quote: (
      <>
        &ldquo;Action items never get lost in the shuffle anymore.{" "}
        <Highlight>
          New ideas and projects actually get off the ground now.
        </Highlight>
        &rdquo;
      </>
    ),
    author: "Andrew Tyne",
    company: "MPI Atlantic Canada Chapter",
  },
  {
    quote: (
      <>
        &ldquo;We are more organized. And because of this{" "}
        <Highlight>
          we can turn around projects much more quickly now than before.
        </Highlight>
        &rdquo;
      </>
    ),
    author: "Kevin Duffy",
    company: "TRUE Marketing",
  },
];

export default function Testimonials() {
  const [showMore, setShowMore] = useState(false);
  const hiddenTestimonials = testimonials.slice(MOBILE_INITIAL_COUNT);

  return (
    <section className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <span className="mb-6 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-7 sm:text-xs">
          TESTIMONIALS
        </span>

        <h2
          className="mb-5 max-w-4xl text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          HELPING REAL USERS ACHIEVE REAL RESULTS
        </h2>

        <p className="mb-10 max-w-2xl text-base leading-relaxed text-[#6B6B6B] sm:mb-12 sm:text-lg">
          Real stories from people who use the platform to teach better grow
          faster and work smarter every day.
        </p>

        {/* Mobile: first batch + expand + CTA stays below */}
        <div className="w-full space-y-8 md:hidden">
          {testimonials.slice(0, MOBILE_INITIAL_COUNT).map((item) => (
            <TestimonialCard key={item.author} {...item} />
          ))}

          {!showMore && (
            <button
              type="button"
              onClick={() => setShowMore(true)}
              className="w-full text-center text-sm font-medium text-black underline underline-offset-4 transition hover:text-black/70"
            >
              Wanna see more...
            </button>
          )}

          {showMore &&
            hiddenTestimonials.map((item) => (
              <TestimonialCard key={item.author} {...item} />
            ))}
        </div>

        {/* Tablet & desktop: full grid */}
        <div className="hidden w-full gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-10">
          {testimonials.map((item) => (
            <TestimonialCard key={item.author} {...item} />
          ))}
        </div>

        <div className="mt-12 flex w-full flex-col items-center sm:mt-14">
          <h3
            className="mb-6 text-[clamp(1.75rem,4vw,2.75rem)] leading-tight tracking-wide text-black"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            IT&apos;S YOUR TIME NOW TO
          </h3>
          <Link
            href="/form"
            className="btn-brutal btn-brutal-primary inline-block px-10 py-4 text-base font-semibold text-black sm:px-12 sm:text-lg"
          >
            Get your Blueprint
          </Link>
        </div>
      </div>
    </section>
  );
}
