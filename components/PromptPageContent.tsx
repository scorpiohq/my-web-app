import CopyPromptButton from "@/components/CopyPromptButton";

const GIFT_PROMPT = `Fetch the submission row from Supabase using the [id] URL parameter — use the exact same data-fetching pattern already used in app/report/[id]/page.tsx (same supabaseAdmin import, same query style, same error handling for a missing row). Get the "name" field from that row.

Render, for now, just:
1. The exact same Header component already used elsewhere in this project (import it, don't recreate it)
2. A headline: "Thanks {name}, for letting us be part of your journey."
3. A subheading below it: "A prompt you can use with any AI tool to turn your Blueprint into your first real step."

Style with Tailwind, matching the existing design system already in this codebase (same shadow-brutal classes, same border and color patterns already used on other pages — don't invent new colors or shadow values, reuse the existing ones exactly as they're already defined in this project).

Show me the file.`;

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
