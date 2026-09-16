import GameplanWaitlistForm from "@/components/GameplanWaitlistForm";
import ReportPageShell from "@/components/ReportPageShell";
import { getSubmissionForReportPage } from "@/lib/submissions";

export const dynamic = "force-dynamic";

/**
 * GAMEPLAN waitlist copy of /gouti/gameplan.
 * Original selling page stays at /gouti/gameplan.
 */

export default async function GameplanWaitlistPage({
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
      shellClassName="bg-[#F7F7F7]"
      showGiftLink={false}
      giftHref={
        submission?.public_id
          ? `/gouti/prompt?submission_id=${encodeURIComponent(submission.public_id)}&name=${encodeURIComponent(userName)}`
          : `/gouti/prompt?name=${encodeURIComponent(userName)}`
      }
      reportHref={
        submission?.public_id
          ? `/report/${encodeURIComponent(submission.public_id)}`
          : "/gouti/report-preview"
      }
    >
      <main className="max-w-6xl pl-[18px]">
        <div className="pt-2 text-left text-black">
          <span className="mb-6 inline-block border border-black bg-[#F6E9D8] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-8 sm:text-xs">
            JOIN THE WAITLIST
          </span>
          <p
            className="m-0 max-w-5xl text-[clamp(1.35rem,3.5vw,2.1rem)] font-normal leading-[1.15] tracking-[-0.02em] text-black"
            style={{ fontFamily: "var(--font-azo-uber), sans-serif" }}
          >
            {firstName}, a lot of people who got their Blueprint have asked for
            one more thing: a way to actually turn it into action.
          </p>
          <div
            className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-[#4A4A4A] sm:mt-8 sm:text-[17px] sm:leading-[1.75]"
            style={{
              fontFamily:
                "var(--font-geist-sans), Arial, Helvetica, sans-serif",
            }}
          >
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
              It isn&apos;t ready to buy yet — I won&apos;t rush it. Join the
              waitlist and you&apos;ll be first when it launches.
            </p>
          </div>
        </div>
      </main>

      <section
        id="waitlist"
        className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16"
      >
        <GameplanWaitlistForm defaultName={userName} />
      </section>
    </ReportPageShell>
  );
}
