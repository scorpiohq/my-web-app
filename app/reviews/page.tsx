import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinalOffer from "@/components/FinalOffer";
import { TestimonialCard, allTestimonials } from "@/components/testimonial-data";

export const metadata: Metadata = {
  title: "What People Are Saying | Your Blueprint",
  description:
    "See what people had to say after receiving their personalized blueprint.",
};

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <main className="grid-bg flex-1 px-6 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
            <span className="mb-5 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-6 sm:text-xs">
              REVIEWS
            </span>

            <h1
              className="mb-4 text-[clamp(2.25rem,6vw,3.5rem)] leading-none tracking-wide text-black"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              WHAT PEOPLE ARE SAYING
            </h1>

            <p className="mb-6 max-w-xl text-sm leading-relaxed text-[#6B6B6B] sm:mb-7 sm:text-base">
              See what people had to say after receiving their personalized
              blueprint.
            </p>

            <span className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-medium text-black shadow-[2px_2px_0_0_#000] sm:text-sm">
              <ClockIcon />
              Last Updated on August 10, 2026
            </span>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            {allTestimonials.map((item) => (
              <section
                key={`${item.author}-${item.company}`}
                className="border-2 border-black bg-white px-5 py-7 shadow-[4px_4px_0_0_#000] sm:px-7 sm:py-8"
              >
                <TestimonialCard {...item} />
              </section>
            ))}
          </div>
        </div>
      </main>
      <FinalOffer />
      <Footer />
    </>
  );
}
