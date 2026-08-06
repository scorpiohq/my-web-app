const cards = [
  {
    step: 1,
    title: "TOO MANY TOOLS BREAK FLOW",
    description:
      "Jumping between platforms for videos quizzes emails and files breaks your flow every day.",
  },
  {
    step: 2,
    title: "NO CLEAR VIEW OF PROGRESS",
    description:
      "You don't know who is learning who is stuck or who already dropped out of the course.",
  },
  {
    step: 3,
    title: "MOST STUDENTS LOSE FOCUS FAST",
    description:
      "Learners get bored lose motivation and drop out before finishing even your best content.",
  },
];

function StepIcon({ step }: { step: number }) {
  return (
    <div
      className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-[#FFC940] text-2xl font-bold text-black"
      style={{ fontFamily: "var(--font-hero)" }}
    >
      {step}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <span className="mb-6 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-7 sm:text-xs">
          HOW IT WORKS
        </span>

        <h2
          className="mb-5 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          A SIMPLE 3-STEP PROCESS
        </h2>

        <p className="mb-10 max-w-2xl text-base leading-relaxed text-[#6B6B6B] sm:mb-12 sm:text-lg">
          Many teachers and teams waste time switching tools lose track of
          students and struggle to keep courses engaging.
        </p>

        <div className="grid w-full gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col border-2 border-black bg-white px-6 py-10 shadow-[8px_8px_0_0_#000]"
            >
              <StepIcon step={card.step} />
              <h3
                className="mb-4 text-xl leading-tight tracking-wide text-black"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
