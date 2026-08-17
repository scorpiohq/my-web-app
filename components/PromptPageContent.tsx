import CopyPromptButton from "@/components/CopyPromptButton";

const GIFT_PROMPT = `You are my guide for turning this Blueprint into real work.

I've attached my Personalized Creator Blueprint above. Read all of it first, it's the source of truth: my goal, my identity, why this direction fits me, my strengths, what's holding me back, my next move, and what's still missing.

Do not rewrite the Blueprint. Turn it into a guide I can actually follow.

If anything is unclear or too thin to build from, ask me, don't guess or invent details.

**Rules:**

- Talk to me as "you" - speak directly to me, not about me
- Stay inside my Blueprint. No new niche, no new platform, no invented backstory
- Be specific enough that I can picture myself doing the step
- Simple words. No hype, no fluff

**Then build this, in order:**

1. **What this is** — who I am here, what I'm building, and what "week one done" actually looks like
2. **The first piece** — the exact first post or video, pulled from my Blueprint. What I open with, what I say, when I hit send.
3. **More to work with** — 5 content ideas from my direction, each with a title, format, and one clear point
4. **The first 7 days** — one real action per day, built from my Next Move. Day 7 ends with: "That's your first week. Done."
5. **When I get stuck** — name my actual blocker, and give me one specific move for the exact moment it shows up
6. **Start anyway** — if anything's still unclear, say so honestly, then show me the path forward with what I already have

Help me to start from here, like blueprint already giving me the start, not i need actionable steps that I start taking from here, and actually start building my journey..

If you need any other query, Just Ask me..`;

function renderPromptText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={index} className="font-bold text-black">
          {bold[1]}
        </strong>
      );
    }
    return part;
  });
}

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
        className="mt-10 space-y-6 text-[16px] leading-8 tracking-[0.01em] text-black/70 sm:mt-12 sm:space-y-7 sm:text-[17px] sm:leading-9"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        <p className="m-0 max-w-full whitespace-nowrap max-[900px]:whitespace-normal">
          Your report told you where you&apos;re headed. This is how you take
          the first step.
        </p>
        <p className="m-0 max-w-full">
          Works with any AI tool you already use:
        </p>
        <p className="m-0 max-w-full">
          <strong className="font-bold text-black">
            ChatGPT, Claude, Perplexity, Google AI,
          </strong>{" "}
          whichever you want to go with.
        </p>
        <p className="m-0 max-w-full">
          I suggest you to go with{" "}
          <strong className="font-bold text-black">Claude</strong>, it&apos;s
          good with this kinda work.
        </p>
        <ol className="m-0 list-decimal space-y-2 pl-6">
          <li>Copy the Prompt that I shared with you.</li>
          <li>Attach your Blueprint with the Prompt.</li>
          <li>Hit the Send Button!</li>
        </ol>
        <p className="m-0">Theirs it is! Voilà!!</p>
      </div>
      <div
        className="mt-8 border-2 border-black bg-white p-5 text-left shadow-[6px_6px_0_0_#000] sm:mt-10 sm:p-6 sm:shadow-[8px_8px_0_0_#000]"
        style={{ fontFamily: "var(--font-bethany)" }}
      >
        <div className="flex items-center justify-between gap-3">
          <strong className="text-[16px] font-bold leading-none text-black sm:text-[18px]">
            Here&apos;s your Prompt:
          </strong>
          <CopyPromptButton text={GIFT_PROMPT} />
        </div>
        <p
          className="mt-5 m-0 whitespace-pre-wrap text-[16px] leading-[1.85] tracking-[0.03em] text-black/80 sm:text-[17px] sm:leading-[1.95]"
          style={{ wordSpacing: "0.08em" }}
        >
          {renderPromptText(GIFT_PROMPT)}
        </p>
      </div>
      <p
        className="mt-10 m-0 text-[16px] leading-8 text-black/70 sm:mt-12 sm:text-[17px] sm:leading-9"
        style={{ fontFamily: "var(--font-geist-sans)" }}
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
