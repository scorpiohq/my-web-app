"use client";

import { useState } from "react";

const faqs = [
  {
    question: "CAN I CANCEL ANYTIME?",
    answer:
      "Yes, you can cancel your plan whenever you want from your account settings and you won't be charged again after the current billing period.",
  },
  {
    question: "DO I NEED TO DOWNLOAD OR INSTALL ANYTHING?",
    answer:
      "No. Everything runs in your browser — answer the questionnaire, get your Blueprint, and download your PDF. No apps or installs required.",
  },
  {
    question: "IS THERE A FREE TRIAL AVAILABLE?",
    answer:
      "We offer a one-time payment instead of a subscription. You pay once and get lifetime access to your personalized Blueprint.",
  },
  {
    question: "CAN I UPLOAD VIDEOS AND DOCUMENTS?",
    answer:
      "Your Blueprint is built from your questionnaire answers. You receive a personalized report as an instant PDF download — no uploads needed.",
  },
  {
    question: "HOW MANY STUDENTS CAN I ADD?",
    answer:
      "Your Blueprint is personal to you — it's a creator roadmap built around your goals, strengths, and starting point.",
  },
  {
    question: "DO STUDENTS NEED THEIR OWN ACCOUNT?",
    answer:
      "This is for creators getting their own Blueprint. One purchase, one report, one account — no extra logins required.",
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <h2
          className="mb-5 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          COMMON QUESTIONS
          <br />
          ANSWERED CLEARLY
        </h2>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-[#6B6B6B] sm:mb-12 sm:text-lg">
          Here are clear answers to the most common questions we get from
          creators coaches and teams using the platform.
        </p>

        <div className="flex w-full flex-col gap-4 sm:gap-5">
          {faqs.map((faq, index) => {
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
                    <p className="text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
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
