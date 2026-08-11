"use client";

import { useState } from "react";
import { TestimonialCard, testimonials } from "@/components/testimonial-data";

const MOBILE_INITIAL_COUNT = 5;

export default function Testimonials() {
  const [showMore, setShowMore] = useState(false);
  const hiddenTestimonials = testimonials.slice(MOBILE_INITIAL_COUNT);

  return (
    <section className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <span className="mb-6 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-7 sm:text-xs">
          WHAT OUR USERS SAY
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

        {/* Mobile: first batch + expand */}
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
      </div>
    </section>
  );
}
