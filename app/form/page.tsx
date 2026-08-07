"use client";

import BlueprintJourneyIntro from "@/components/BlueprintJourneyIntro";
import CheckoutTransition from "@/components/CheckoutTransition";
import FormHeader from "@/components/FormHeader";
import { useEffect, useState, type ReactNode } from "react";

function getOptionLetter(index: number): string {
  return String.fromCharCode(65 + index);
}

const questions = [
  {
    id: "name",
    text: "What should we call you?",
    type: "text",
    placeholder: "e.g. Sam Williams",
  },
  {
    id: "email",
    text: "What\u2019s your email?",
    type: "text",
    placeholder: "e.g. sam@email.com",
    note: "We\u2019ll use this to send your report and let you sign back in anytime.",
  },
  {
    id: "age",
    text: "How old are you?",
    type: "text",
    placeholder: "e.g. 24",
    inputMode: "numeric" as const,
  },
  {
    id: "location",
    text: "Where are you currently based?",
    type: "text",
    placeholder: "e.g. New York, United States",
  },
  {
    id: "photo_or_avatar",
    text: "Which best describes you?",
    type: "image_choice",
    note: "It\u2019s for your report personalization \u2014 some people told us they don\u2019t want to share their personal images, so we decided to go with avatars.",
  },
  {
    id: "current_situation",
    text: "How would you describe your current situation right now?",
    type: "single_select",
    options: [
      "Studying and looking to build something online.",
      "Working, but looking for more freedom.",
      "I\u2019m ready to start, but don\u2019t know where to begin.",
      "I\u2019m currently not working on anything, but I want to build something online.",
      "Just curious to see if this is the right path for me.",
    ],
  },
  {
    id: "primary_goal",
    text: "What\u2019s your primary goal with starting this journey?",
    type: "single_select",
    options: [
      "Create an income online",
      "Build a personal brand",
      "Turn my knowledge into something valuable",
      "Create more freedom in my life",
      "Build a long-term business online",
      "Prove to myself that I can do it",
    ],
  },
  {
    id: "worth_it",
    text: "What would make this journey feel worth it for you?",
    type: "single_select",
    options: [
      "Making my first income online",
      "Building an audience that supports my work",
      "Learning valuable skills",
      "Creating something I\u2019m proud of",
      "Having more freedom in my life",
      "Turning this into a long-term business",
    ],
  },
  {
    id: "excited_topic",
    text: "If you had to start creating content today, which topic would you be most excited to build around?",
    type: "single_select",
    options: [
      "Business & Entrepreneurship",
      "Making Money & Personal Finance",
      "Self-Improvement & Psychology",
      "Productivity & Habits",
      "Fitness & Health",
      "Travel",
      "Education & Learning",
      "AI & Technology",
      "Lifestyle",
      "Creative Skills",
      "I\u2019m not sure yet",
    ],
  },
  {
    id: "freetime_topic",
    text: "What topics do you naturally spend your free time learning about?",
    type: "single_select",
    options: [
      "Business & Entrepreneurship",
      "Making Money & Personal Finance",
      "Self-Improvement & Psychology",
      "Productivity & Habits",
      "Fitness & Health",
      "Travel",
      "Education & Learning",
      "AI & Technology",
      "Lifestyle",
      "Creative Skills",
      "I\u2019m not sure yet",
    ],
  },
  {
    id: "stop_scroll",
    text: "What kind of posts or videos always make you stop scrolling?",
    type: "multi_select",
    options: [
      "People sharing their personal journey",
      "Step-by-step tutorials",
      "Practical tips & life hacks",
      "Business or money ideas",
      "Self-improvement advice",
      "Fitness transformations",
      "Travel experiences",
      "AI & new technology",
      "Educational content",
      "Behind-the-scenes of someone\u2019s work",
      "Anything, not specified",
    ],
  },
  {
    id: "talk_forever",
    text: "What is something you could talk about, teach, or share for months without getting bored?",
    type: "long_text",
    placeholder: `Ex: Business. I think about it 24/7 — how companies grow, how people make their first sale, how to escape a 9-to-5. I never get tired of this.

Ex: Fitness and nutrition. I could talk about workouts, diet mistakes, and mindset around body image forever — it's just part of who I am now.`,
  },
  {
    id: "real_experience",
    text: "What\u2019s something you\u2019ve experienced, achieved, or figured out that could genuinely help someone else?",
    type: "long_text",
    placeholder: `Ex: I lost 22kg over a year without any crash diet, just consistency. I can help people who feel lost and think they need to starve themselves to see results.

Ex: I traveled to 5 states on a tight budget by figuring out how to cut costs without cutting the experience. I can help people travel more without needing a big income.`,
  },
  {
    id: "platform",
    text: "Which platform do you want to start on?",
    type: "single_select",
    options: ["Instagram", "YouTube", "TikTok", "Threads / X", "Not sure yet"],
  },
  {
    id: "time_per_day",
    text: "How much time can you realistically give each day?",
    type: "single_select",
    options: [
      "Less than 1 hour",
      "1\u20132 hours",
      "2\u20134 hours",
      "4+ hours",
    ],
  },
  {
    id: "consistency",
    text: "How consistent can you realistically be?",
    type: "single_select",
    options: [
      "2\u20133 days per week",
      "4\u20135 days per week",
      "6 days per week",
      "Daily",
    ],
  },
  {
    id: "investment",
    text: "If needed, how much are you willing to invest in learning or tools?",
    type: "single_select",
    options: ["$0\u2013100", "$100\u2013300", "$300\u2013500", "$500+"],
  },
  {
    id: "blocker",
    text: "What\u2019s the biggest thing stopping you right now?",
    type: "single_select",
    options: [
      "Confusion",
      "Lack of direction",
      "Fear of failure",
      "Fear of judgment",
      "Overthinking",
      "Waiting for the perfect time",
    ],
  },
  {
    id: "help_type",
    text: "What kind of help would you want after this report?",
    type: "single_select",
    options: [
      "A step-by-step action plan",
      "Clear strategies to get started",
      "Content ideas and direction",
      "Accountability and structure",
      "All of the above",
    ],
  },
  {
    id: "readiness",
    text: "If given a clear plan, are you ready to start?",
    type: "single_select",
    options: ["Yes, absolutely", "Mostly yes", "Not sure yet"],
  },
];

type FormAnswer = string | string[];
type FormResponses = Record<string, FormAnswer> & {
  gender?: string;
  profile_image_type?: string;
};

function ChoiceOption({
  label,
  letter,
  selected,
  onClick,
}: {
  label: string;
  letter: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.995] sm:gap-3 sm:px-3.5 sm:py-2.5 ${
        selected
          ? "border border-[#FFA126] bg-[#FFF3E0]"
          : "border border-transparent bg-[#FFFAF3] hover:bg-[#FFF6EB]"
      }`}
    >
      <span className="form-option-text flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#FFA126] text-xs text-[#FFA126]">
        {letter}
      </span>
      <span className="form-option-text text-sm leading-snug text-[#FFA126] sm:text-[15px]">
        {label}
      </span>
    </button>
  );
}

function OptionsList({
  children,
  scrollable,
}: {
  children: ReactNode;
  scrollable?: boolean;
}) {
  if (scrollable) {
    return (
      <div className="max-h-[min(38vh,260px)] overflow-y-auto overscroll-contain sm:max-h-[min(42vh,300px)]">
        <div className="grid gap-1.5 pr-1">{children}</div>
      </div>
    );
  }

  return <div className="grid gap-1.5">{children}</div>;
}

function FormExampleHints({ text }: { text: string }) {
  const items = text
    .split(/\n\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (items.length <= 1) {
    return (
      <p className="form-step-item form-step-item-3 form-placeholder-text mt-1.5 text-sm leading-relaxed text-[#999]">
        {text}
      </p>
    );
  }

  return (
    <ul className="form-step-item form-step-item-3 form-placeholder-text mt-1.5 space-y-2.5 text-sm text-[#999]">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-left leading-relaxed">
          <span
            className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#CFCFCF]"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function FormPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [stepDirection, setStepDirection] = useState<"forward" | "back">("forward");
  const [responses, setResponses] = useState<FormResponses>({});
  const [submitting, setSubmitting] = useState(false);
  const [showCheckoutTransition, setShowCheckoutTransition] = useState(false);
  const [stepVisible, setStepVisible] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (!showIntro) {
      requestAnimationFrame(() => setFormVisible(true));
    }
  }, [showIntro]);

  const current = questions[step];
  const isLast = step === questions.length - 1;
  const optionCount = current.options?.length ?? 0;
  const scrollOptions = optionCount > 5;

  function setAnswer(value: FormAnswer) {
    setResponses({ ...responses, [current.id]: value });
  }

  function toggleMulti(option: string) {
    const existing = responses[current.id];
    const existingList = Array.isArray(existing) ? existing : [];
    const updated = existingList.includes(option)
      ? existingList.filter((o) => o !== option)
      : [...existingList, option];
    setAnswer(updated);
  }

  function chooseAvatar(gender: string) {
    const value = gender.toLowerCase();
    setResponses({
      ...responses,
      [current.id]: value,
      profile_image_type: "avatar",
      gender: value,
    });
  }

  function navigateTo(nextStep: number, direction: "forward" | "back") {
    if (isNavigating) return;
    setIsNavigating(true);
    setStepDirection(direction);
    setStepVisible(false);

    window.setTimeout(() => {
      setStep(nextStep);
      setStepVisible(true);
      window.setTimeout(() => setIsNavigating(false), 920);
    }, 460);
  }

  function goNext() {
    if (isLast) {
      handleSubmit();
    } else {
      navigateTo(step + 1, "forward");
    }
  }

  function goBack() {
    navigateTo(step - 1, "back");
  }

  async function handleSubmit() {
    setSubmitting(true);
    setShowCheckoutTransition(true);

    const {
      name,
      email,
      age,
      location,
      gender,
      profile_image_type,
      ...restAnswers
    } = responses;

    const payload = {
      name,
      email,
      age: Number(age),
      location,
      gender: gender || null,
      answers: restAnswers,
      profile_image_type: profile_image_type || "avatar",
    };

    const transitionStart = Date.now();

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok || !result.checkoutUrl) {
        throw new Error(result.error || "Could not start checkout");
      }

      const elapsed = Date.now() - transitionStart;
      const remaining = Math.max(0, 900 - elapsed);
      await new Promise((resolve) => setTimeout(resolve, remaining));

      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setShowCheckoutTransition(false);
      setSubmitting(false);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong starting checkout.",
      );
    }
  }

  if (showIntro) {
    return (
      <BlueprintJourneyIntro
        onComplete={() => {
          setShowIntro(false);
        }}
      />
    );
  }

  return (
    <div
      className="form-journey flex min-h-screen flex-col bg-white transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ opacity: formVisible ? 1 : 0 }}
    >
      {showCheckoutTransition && <CheckoutTransition />}
      <FormHeader activeStep={1} />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 pb-10 pt-6 sm:px-8 sm:pb-12 lg:max-w-4xl xl:max-w-5xl">
        <div
          key={step}
          className={`form-step-panel w-full ${
            !stepVisible
              ? `form-step-panel-hidden form-step-exit-${stepDirection}`
              : stepDirection === "forward"
                ? "form-step-enter-forward"
                : "form-step-enter-back"
          }`}
        >
          <div className="flex flex-col">
            <span className="form-step-item form-step-item-1 mb-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#FFA126] text-sm font-medium text-white">
              {step + 1}
            </span>

            <h1 className="form-step-item form-step-item-2 form-question text-lg leading-snug text-black sm:text-xl lg:text-[1.35rem] lg:whitespace-nowrap xl:text-[1.45rem]">
              {current.text}
            </h1>

            {(current.type === "text" ||
              current.type === "number" ||
              current.type === "long_text") &&
              current.placeholder &&
              (current.type === "long_text" ? (
                <FormExampleHints text={current.placeholder} />
              ) : (
                <p className="form-step-item form-step-item-3 form-placeholder-text mt-1.5 text-sm text-[#999]">
                  {current.placeholder}
                </p>
              ))}

            {current.note && (
              <p className="form-step-item form-step-item-3 form-placeholder-text mt-1.5 text-sm leading-relaxed text-[#888]">
                {current.note}
              </p>
            )}

            <div className="form-step-item form-step-item-4 mt-4">
            {(current.type === "text" || current.type === "number") && (
              <input
                type={current.type === "number" ? "number" : "text"}
                inputMode={
                  "inputMode" in current ? current.inputMode : undefined
                }
                value={responses[current.id] || ""}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="form-option-text w-full border-0 border-b border-[#FFA126] bg-transparent py-2 text-xl text-black outline-none transition-[border-color] duration-500 placeholder:font-light placeholder:text-[#FFD4A8] focus:border-[#FF8C00] sm:text-2xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                autoFocus
              />
            )}

            {current.type === "long_text" && (
              <input
                type="text"
                value={responses[current.id] || ""}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="form-option-text w-full border-0 border-b border-[#FFA126] bg-transparent py-2 text-xl text-black outline-none transition-[border-color] duration-500 placeholder:font-light placeholder:text-[#FFD4A8] focus:border-[#FF8C00] sm:text-2xl"
                autoFocus
              />
            )}

            {current.type === "single_select" && (
              <OptionsList scrollable={scrollOptions}>
                {current.options?.map((opt, i) => (
                  <ChoiceOption
                    key={opt}
                    label={opt}
                    letter={getOptionLetter(i)}
                    selected={responses[current.id] === opt}
                    onClick={() => setAnswer(opt)}
                  />
                ))}
              </OptionsList>
            )}

            {current.type === "multi_select" && (
              <OptionsList scrollable={scrollOptions}>
                {current.options?.map((opt, i) => (
                  <ChoiceOption
                    key={opt}
                    label={opt}
                    letter={getOptionLetter(i)}
                    selected={(responses[current.id] || []).includes(opt)}
                    onClick={() => toggleMulti(opt)}
                  />
                ))}
              </OptionsList>
            )}

            {current.type === "image_choice" && (
              <div className="grid max-w-md grid-cols-1 gap-1.5 sm:max-w-lg">
                {[
                  { label: "Male", value: "Male", letter: "A" },
                  { label: "Female", value: "Female", letter: "B" },
                ].map((option) => {
                  const selected =
                    (responses.gender || "").toLowerCase() ===
                    option.value.toLowerCase();
                  return (
                    <ChoiceOption
                      key={option.value}
                      label={option.label}
                      letter={option.letter}
                      selected={selected}
                      onClick={() => chooseAvatar(option.value)}
                    />
                  );
                })}
              </div>
            )}
            </div>

            <div className="form-step-item form-step-item-5 mt-5 flex items-center gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={goBack}
                disabled={isNavigating || submitting}
                className="form-action-btn rounded-md bg-[#FFA126] px-8 py-3 text-base font-medium text-white disabled:opacity-60"
                aria-label="Go back"
              >
                ‹
              </button>
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={submitting || isNavigating}
              className="form-action-btn rounded-md bg-[#FFA126] px-8 py-3 text-base font-medium text-white disabled:opacity-60"
            >
              {isLast ? (submitting ? "Redirecting..." : "Submit") : "OK"}
            </button>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
