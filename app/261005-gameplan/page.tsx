import Backstory from "@/components/Backstory";
import FAQ from "@/components/FAQ";
import GameplanCheckoutButton from "@/components/GameplanCheckoutButton";
import GameplanInside from "@/components/GameplanInside";
import Pricing from "@/components/Pricing";
import ReportPageShell from "@/components/ReportPageShell";
import { getSubmissionForReportPage } from "@/lib/submissions";

export const dynamic = "force-dynamic";

const gameplanFaqs = [
  {
    question: "WHAT DOES THIS GAMEPLAN ACTUALLY HELP ME WITH?",
    answer:
      "Your Blueprint told you where you're headed. GAMEPLAN is what helps you actually move, starting now, with what you already have. I already gave you the gift to help you start on your own. GAMEPLAN goes further: it hands you the resources, the system, and the exact process I use to turn ideas into real momentum, the same system I've run every single day since November 2024. It works. You won't find it packaged like this anywhere else.",
  },
  {
    question: "WHAT EXACTLY HAPPENS AFTER I PAY?",
    answer:
      "You get a confirmation right away, and your spot is locked in — one of the first 100. The moment GAMEPLAN is ready, you're the first to get it, straight into your account. I'll stay in touch the whole way through — just email, no noise.",
  },
  {
    question: "WHAT IF GAMEPLAN TAKES LONGER THAN TWO WEEKS?",
    answer:
      "Then you get a full refund, no questions asked — and you'll still get GAMEPLAN the moment it's ready, at no extra cost. Two weeks is a promise I'm making to myself as much as to you.",
  },
  {
    question: "IS THIS A ONE-TIME PAYMENT, OR DOES IT RENEW?",
    answer:
      "One-time. You pay once, it's yours for life, No subscription, No renewal, nothing charging you again later. Lifetime access, including future updates.",
  },
  {
    question: "WHAT HAPPENS IF THE FIRST 100 SPOTS SELL OUT WHILE I'M DECIDING?",
    answer: `The price goes to $149, permanently. No second early-bird round, no exceptions. If you're on the fence, that's the real cost of waiting, not pressure, just the honest math.

Still want in after the 100 spots are gone?

Reach out — andy@yourblueprint.in. No promise, but I'll see what I can do.`,
  },
];

export default async function GameplanPage({
  searchParams,
}: {
  searchParams: Promise<{ submission_id?: string }>;
}) {
  const { submission_id: submissionId } = await searchParams;
  const submission = submissionId
    ? await getSubmissionForReportPage(submissionId)
    : null;
  const userName = submission?.name || "Lewis Hamilton";
  const firstName = userName.trim().split(/\s+/)[0] || "there";

  return (
    <ReportPageShell
      userName={userName}
      submissionId={submission?.public_id}
      showIntro={false}
      showReviews={false}
      scaleReport={false}
    >
      <main className="max-w-6xl pl-[18px]">
        <div className="pt-2 text-left text-black">
          <span className="mb-6 inline-block border border-black bg-[#F6E9D8] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-8 sm:text-xs">
            PRE-ORDER NOW
          </span>
          <p
            className="m-0 max-w-5xl text-[22px] font-normal italic leading-[1.25] text-black sm:text-[26px]"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            {firstName}, a lot of people who got their Blueprint have asked for
            one more thing: a way to actually turn it into action.
          </p>
          <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-[#4A4A4A] sm:mt-8 sm:text-[17px] sm:leading-[1.75]">
            <p>
              I already gave you the gift, a prompt file to help you take your
              first step.
            </p>
            <p>
              But people kept asking for something deeper. A real, step-by-step
              plan.
            </p>
            <p>
              So I&apos;m building it. It&apos;s called{" "}
              <strong className="font-semibold text-black">YOUR GAMEPLAN.</strong>
            </p>
            <p>
              This isn&apos;t something to read and feel motivated for an hour.
            </p>
            <p>
              It&apos;s built to move you, from knowing your direction to
              actually being in motion. In days, not weeks or months.
            </p>
          </div>
        </div>
        <GameplanInside />
        <Backstory stacked hideHeading />
      </main>
      <Pricing
        originalPrice="$149"
        salePrice="$69"
        offerBadge="SECURE YOUR SLOT!"
        buttonLabel="SECURE YOUR SLOT →"
        showInstantPdfRow={false}
        checkoutButton={
          <GameplanCheckoutButton
            label="SECURE YOUR SLOT →"
            publicId={submission?.public_id || submissionId}
          />
        }
        showIntro={false}
        features={[
          "Complete GAMEPLAN",
          "7-Day Action Plan (limited to first 100)",
          "My Creator System OS",
          "My Viral Formula",
          "Ready-to-Use Templates",
          "100+ Digital Product Ideas",
          "Lifetime Access, with Future Updates",
        ]}
      />
      <FAQ items={gameplanFaqs} heading="FAQs" showDescription={false} />
    </ReportPageShell>
  );
}
