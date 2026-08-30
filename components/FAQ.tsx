"use client";

import { useState } from "react";

const faqs = [
  {
    question: "WHO IS THIS BLUEPRINT FOR?",
    answer:
      "It's designed for beginners, aspiring creators, and anyone who wants to start building on social media but isn't sure where to begin. Whether you're starting from scratch or changing direction, the blueprint adapts to where you are today.",
  },
  {
    question: "WHAT EXACTLY DO I GET?",
    answer:
      "You'll receive a personalized Creator Blueprint built around your answers, including your best-fit direction, strengths, potential roadblocks, and practical next steps to help you start with confidence.",
  },
  {
    question: "IS THIS REALLY PERSONALIZED?",
    answer:
      "Yes. It's built entirely from your answers, not a template, two rounds of AI reasoning go into understanding your situation before your Blueprint is generated. No two Blueprints are the same.",
  },
  {
    question: "IS MY INFORMATION KEPT PRIVATE?",
    answer:
      "Yes. Your answers are only used to generate your Blueprint. We don't sell your data or share it with third parties.",
  },
  {
    question: "HOW LONG DOES IT TAKE?",
    answer:
      "The questionnaire takes about 1–3 minutes, and your personalized Blueprint is usually ready within seconds after payment.",
  },
  {
    question: "WHAT HAPPENS AFTER I RECEIVE MY BLUEPRINT?",
    answer:
      "You'll be able to view and download your Blueprint as a PDF, instantly, with lifetime access to revisit it anytime.",
  },
  {
    question: "DO YOU OFFER REFUNDS?",
    answer:
      "Yes. If your Blueprint doesn't give you a clear next step, email us within 7 days of purchase for a full refund.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 text-black transition-transform duration-200 ${open ? "rotate-90" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items?: FAQItem[];
  excludeQuestions?: string[];
  heading?: string;
  showDescription?: boolean;
};

export default function FAQ({
  items = faqs,
  excludeQuestions = [],
  heading,
  showDescription = true,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const visibleFaqs = items.filter(
    (faq) => !excludeQuestions.includes(faq.question),
  );

  return (
    <section className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <h2
          className={`max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black ${
            showDescription ? "mb-3 sm:mb-4" : "mb-10 sm:mb-12"
          }`}
          style={{ fontFamily: "var(--font-hero)" }}
        >
          {heading ?? "Frequently asked."}
        </h2>

        {showDescription ? (
          <p className="mb-10 max-w-xl text-base leading-relaxed text-[#6B6B6B] sm:mb-12 sm:text-lg">
            Still have questions? Email{" "}
            <a
              href="mailto:hello@yourblueprint.in"
              className="font-medium text-black underline underline-offset-2 transition-colors hover:text-[#555]"
            >
              hello@yourblueprint.in
            </a>
          </p>
        ) : null}

        <div className="flex w-full flex-col gap-4 sm:gap-5">
          {visibleFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="border-2 border-black bg-white text-left shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  aria-expanded={isOpen}
                >
                  <span
                    className="pt-0.5 text-base leading-snug tracking-wide text-black sm:text-lg"
                    style={{ fontFamily: "var(--font-hero)" }}
                  >
                    {faq.question}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-[#FFC940] sm:h-9 sm:w-9">
                    <ChevronIcon open={isOpen} />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-black/10 px-5 pb-5 pt-1 sm:px-6 sm:pb-6">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
