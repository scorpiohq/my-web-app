const cards = [
  {
    step: 1,
    title: "ANSWER 18 QUESTIONS",
    description:
      "Tell us about you, your interests, your goals, where you're starting from.",
  },
  {
    step: 2,
    title: "AI DO THE MAGIC",
    description:
      "It goes to work using our 133-page Creator Brain to build your plan.",
  },
  {
    step: 3,
    title: "DOWNLOAD YOUR BLUEPRINT",
    description:
      "Your personalized Creator Blueprint is ready, Start your Journey.",
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
          className="mb-10 max-w-3xl text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-wide text-black sm:mb-12"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          SIMPLE. JUST 3 STEPS!
        </h2>

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
