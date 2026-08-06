"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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
    type: "number",
    placeholder: "e.g. 24",
  },
  {
    id: "location",
    text: "Where are you currently based?",
    type: "text",
    placeholder: "e.g. Mumbai, India",
  },
  {
    id: "photo_or_avatar",
    text: "How would you like your report to be personalized?",
    type: "image_choice",
    note: "So many people hesitate to share their picture online — that's why we go with avatars instead. It feels safer, and your report still feels personal to you.",
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
    placeholder: "Type your answer here...",
  },
  {
    id: "real_experience",
    text: "What\u2019s something you\u2019ve experienced, achieved, or figured out that could genuinely help someone else?",
    type: "long_text",
    placeholder: "Type your answer here...",
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

const ACCENT = "#FFA126";

export default function FormPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);

  const current = questions[step];
  const isLast = step === questions.length - 1;

  function setAnswer(value: any) {
    setResponses({ ...responses, [current.id]: value });
  }

  function toggleMulti(option: string) {
    const existing: string[] = responses[current.id] || [];
    const updated = existing.includes(option)
      ? existing.filter((o) => o !== option)
      : [...existing, option];
    setAnswer(updated);
  }

  function chooseAvatar(gender: string) {
    setResponses({
      ...responses,
      profile_image_type: "avatar",
      gender: gender.toLowerCase(),
    });
  }

  function goNext() {
    if (isLast) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
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
    const res = await fetch("/api/submit-answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    setSubmitting(false);
    if (result.success) {
      router.push("/form/thank-you");
    } else {
      alert("Something went wrong: " + result.error);
    }
  }

  const questionStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    fontSize: 32,
    color: "#000",
    margin: 0,
  };

  const optionTextStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 300,
    fontSize: 20,
    color: ACCENT,
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* Number badge + question, same grid every time */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <span
            style={{
              background: ACCENT,
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 14,
              width: 28,
              height: 28,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 6,
            }}
          >
            {step + 1}
          </span>
          <h2 style={questionStyle}>{current.text}</h2>
        </div>
        {(current.type === "text" || current.type === "number") && (
          <>
            {current.note && (
              <p style={{ fontSize: 14, color: "#888", marginBottom: 16 }}>
                {current.note}
              </p>
            )}
            <input
              type={current.type}
              value={responses[current.id] || ""}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={current.placeholder}
              style={{
                width: "100%",
                border: "none",
                borderBottom: `1px solid #FFA126`,
                outline: "none",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: 24,
                padding: "10px 0",
                color: "#000",
              }}
            />
          </>
        )}
        {/* Text / number / long_text inputs */}
        {(current.type === "text" || current.type === "number") && (
          <input
            type={current.type}
            value={responses[current.id] || ""}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={current.placeholder}
            style={{
              width: "100%",
              border: "none",
              borderBottom: `1px solid ${ACCENT}`,
              outline: "none",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: 24,
              padding: "10px 0",
              color: "#000",
            }}
          />
        )}

        {current.type === "long_text" && (
          <textarea
            value={responses[current.id] || ""}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={current.placeholder}
            rows={4}
            style={{
              width: "100%",
              border: "none",
              borderBottom: `1px solid ${ACCENT}`,
              outline: "none",
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: 24,
              padding: "10px 0",
              color: "#000",
              resize: "none",
            }}
          />
        )}

        {/* Single select */}
        {current.type === "single_select" && (
          <div style={{ display: "grid", gap: 12 }}>
            {current.options?.map((opt, i) => {
              const selected = responses[current.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => setAnswer(opt)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    textAlign: "left",
                    padding: "18px 20px",
                    background: selected ? "#FFF3E0" : "#FFFAF3",
                    border: `1px solid ${selected ? ACCENT : "transparent"}`,
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      border: `1px solid ${ACCENT}`,
                      color: ACCENT,
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: 13,
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {letters[i]}
                  </span>
                  <span style={optionTextStyle}>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Multi select */}
        {current.type === "multi_select" && (
          <div style={{ display: "grid", gap: 12 }}>
            {current.options?.map((opt, i) => {
              const selected = (responses[current.id] || []).includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleMulti(opt)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    textAlign: "left",
                    padding: "18px 20px",
                    background: selected ? "#FFF3E0" : "#FFFAF3",
                    border: `1px solid ${selected ? ACCENT : "transparent"}`,
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      border: `1px solid ${ACCENT}`,
                      color: ACCENT,
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: 13,
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {letters[i]}
                  </span>
                  <span style={optionTextStyle}>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Image choice / avatar selection */}
        {current.type === "image_choice" && (
          <div style={{ display: "grid", gap: 20 }}>
            {current.note && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: 18,
                  color: "#333",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {current.note}
              </p>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 12,
              }}
            >
              {[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ].map((option) => {
                const selected = responses.gender === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => chooseAvatar(option.value)}
                    style={{
                      padding: "18px 20px",
                      borderRadius: 10,
                      border: `1px solid ${selected ? ACCENT : "transparent"}`,
                      background: selected ? "#FFF3E0" : "#FFFAF3",
                      color: "#000",
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      fontSize: 18,
                      cursor: "pointer",
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Nav */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <button
            onClick={goNext}
            disabled={submitting}
            style={{
              background: ACCENT,
              color: "#000000",
              border: "none",
              borderRadius: 8,
              padding: "14px 32px",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {isLast ? (submitting ? "Submitting..." : "Submit") : "OK"}
          </button>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                background: "transparent",
                border: "none",
                color: "#999",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
