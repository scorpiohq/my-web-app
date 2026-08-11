import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Policies | Your Blueprint",
  description:
    "Here's how we deliver your Blueprint, handle your data, manage refunds, and support you — all in plain language.",
};

const sections = [
  {
    icon: "✅",
    title: "Refund Policy",
    paragraphs: [
      "Because your Blueprint is personalized and generated instantly based on your answers, all sales are final and we don't offer refunds once it's been generated. If something goes wrong on our end - a payment issue, a broken link, anything technical - reach out and we'll make it right.",
    ],
  },
  {
    icon: "📃",
    title: "Blueprint Access",
    paragraphs: [
      "As soon as you complete your purchase, your Blueprint is ready within seconds - right on your screen. A copy is also sent to the email you provided. Don't see it? Check your spam or promotions folder.",
      "Still nothing? Just sign in - your Blueprint will be right there.",
      "So far, no one's had an access issue. But if you do, I'm here.",
    ],
  },
  {
    icon: "📄",
    title: "Terms of Use",
    paragraphs: [
      "This is a personalized Creator Blueprint, built specifically for you. It won't make sense to anyone else, and it won't work the same way for them either. You're welcome to share it on social and if you tag us, we'll genuinely appreciate it.",
      "Use what you learn here to build your own journey. If you have a win, I'd love to celebrate it on our page, I've put real time and effort into this, and I trust you'll treat it the same way.",
    ],
  },
  {
    icon: "🔐",
    title: "Privacy Policy",
    paragraphs: [
      "Any information you share stays within the tool until your Blueprint is generated, after which it's securely archived. We don't sell your data, don't pass it to third parties, and don't ask for anything we don't need. What we do collect is used only to deliver your product and, occasionally, to send a relevant update.",
      "No spam. No weird stuff. Just what's essential.",
    ],
  },
  {
    icon: "🛠️",
    title: "Support",
    paragraphs: [
      "You're not alone in this.",
      "DM us on Instagram @yourblueprnt — we usually reply within 1–2 hours.",
      "Or email andy@yourblueprint.in — we'll get back to you within a few hours.",
      "Support covers access issues, payment problems, or anything related to your Blueprint. If you need help, we've got you.",
    ],
  },
];

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  );
}

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

export default function PoliciesPage() {
  return (
    <>
      <Header />
      <main className="grid-bg flex-1 px-6 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
            <span className="mb-5 inline-flex items-center gap-2 border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-6 sm:text-xs">
              <LockIcon />
              OUR POLICIES
            </span>

            <h1
              className="mb-4 text-[clamp(2.25rem,6vw,3.5rem)] leading-none tracking-wide text-black"
              style={{ fontFamily: "var(--font-hero)" }}
            >
              OUR POLICIES
            </h1>

            <p className="mb-6 max-w-xl text-sm leading-relaxed text-[#6B6B6B] sm:mb-7 sm:text-base">
              Here&apos;s how we deliver your Blueprint, handle your data,
              manage refunds, and support you — all in plain language.
            </p>

            <span className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-medium text-black shadow-[2px_2px_0_0_#000] sm:text-sm">
              <ClockIcon />
              Last Updated on August 10, 2026
            </span>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            {sections.map((section) => (
              <section
                key={section.title}
                className="border-2 border-black bg-white px-5 py-7 shadow-[4px_4px_0_0_#000] sm:px-7 sm:py-8"
              >
                <h2
                  className="mb-4 flex items-center gap-2.5 text-xl tracking-wide text-black sm:text-2xl"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  <span aria-hidden="true">{section.icon}</span>
                  {section.title.toUpperCase()}
                </h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-relaxed text-[#333] sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
