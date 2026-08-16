import CopyPromptButton from "@/components/CopyPromptButton";

const GIFT_PROMPT = `You are my guide for turning this Blueprint into real work.

I attached my Personalized Creator Blueprint. Read all of it first. That page is the source of truth — my goal, identity, why this fits, strengths, what's holding me back, next move, and what's still missing.

Do not rewrite the Blueprint. Turn it into a clear guide I can follow. If something is unclear or thin, ask me. Don't guess.

Rules:
- Talk to me as you / your.
- Stay inside my Blueprint. No new niche, no new platform, no invented story.
- Be specific. I should see myself doing the step.
- Simple words. No hype.

Then build this:

1. What this is — who I am here, what I'm building, what week one done looks like.
2. The first piece — the exact first post or video from my Blueprint. What I open, what I say, when I hit send.
3. More from what I have — 5 content ideas from my direction. Title, format, one point each.
4. The first 7 days — one real action per day, from my Next Move. Day 7: "That's your first week. Done."
5. When I get stuck — name my blocker. Give me one move for the moment it shows up.
6. Start anyway — if something is still open, say so. Then the path from what I already have.

After that, ask: "Which day do you want to start — today or tomorrow?" Then wait.`;

type PromptPageContentProps = {
  userName: string;
};

export default function PromptPageContent({ userName }: PromptPageContentProps) {
  const firstName = userName.trim().split(/\s+/)[0] || "there";
  const thanksLine = `Thanks ${firstName} for letting us be part of your journey.`;

  return (
    <article className="w-full pb-16 pl-[18px] pr-2 pt-2 text-left sm:pt-4">
      <p className="m-0 text-[13px] leading-5 text-black/40 sm:text-sm">
        A little gift for you
      </p>
      <h1
        className="mt-2 max-w-full text-[28px] font-normal italic leading-[1.2] text-black whitespace-nowrap sm:text-[36px] max-[900px]:whitespace-normal"
        style={{ fontFamily: "var(--font-garamond)" }}
      >
        {thanksLine}
      </h1>
      <div
        className="mt-10 space-y-5 text-[16px] leading-7 text-black/70 sm:mt-12 sm:text-[17px] sm:leading-8"
        style={{ fontFamily: "var(--font-fuzzy)" }}
      >
        <p className="m-0 max-w-full whitespace-nowrap max-[900px]:whitespace-normal">
          Your report told you where you&apos;re headed. This is how you take
          the first step.
        </p>
        <p className="m-0 max-w-full">
          Works with any AI tool you already use —{" "}
          <strong className="font-bold text-black">
            ChatGPT, Claude, Perplexity, Google AI,
          </strong>{" "}
          whichever you want to go with.
        </p>
        <ol className="m-0 list-decimal space-y-1 pl-6">
          <li>Copy the Prompt that I shared with you.</li>
          <li>Attach your Blueprint with the Prompt.</li>
          <li>Hit the Send Button!</li>
        </ol>
        <p className="m-0">Theirs it is! Voilà!!</p>
      </div>
      <div className="mt-10 min-h-[280px] border-2 border-black bg-white p-5 text-left shadow-[6px_6px_0_0_#000] sm:mt-12 sm:min-h-[320px] sm:p-6 sm:shadow-[8px_8px_0_0_#000]">
        <div className="flex items-center justify-between gap-3">
          <strong
            className="text-[15px] font-bold leading-7 text-black sm:text-[16px] sm:leading-8"
            style={{ fontFamily: "var(--font-fuzzy)" }}
          >
            Here&apos;s your Prompt:
          </strong>
          <CopyPromptButton text={GIFT_PROMPT} />
        </div>
        <p
          className="mt-4 m-0 whitespace-pre-wrap text-[15px] leading-7 text-black/80 sm:text-[16px] sm:leading-8"
          style={{ fontFamily: "var(--font-fuzzy)" }}
        >
          {GIFT_PROMPT}
        </p>
      </div>
      <p
        className="mt-10 m-0 text-[16px] leading-7 text-black/70 sm:mt-12 sm:text-[17px] sm:leading-8"
        style={{ fontFamily: "var(--font-fuzzy)" }}
      >
        From now on, you have no excuse not to start.
      </p>
      <div
        className="mt-2"
        style={{ fontFamily: "var(--font-garamond)" }}
      >
        <p className="m-0 max-w-full text-[22px] font-normal italic leading-[1.2] text-black whitespace-nowrap sm:text-[26px] max-[900px]:whitespace-normal">
          One prompt. One real step. That&apos;s all today needs to be.
        </p>
        <p className="mt-2 m-0 text-[14px] italic leading-5 text-black/70 sm:text-[15px]">
          — Andy
        </p>
      </div>
    </article>
  );
}
