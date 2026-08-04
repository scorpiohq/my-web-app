"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  { id: "name", text: "What should we call you?", type: "text" },
  { id: "age", text: "How old are you?", type: "number" },
  { id: "location", text: "Where are you currently based?", type: "text" },
  {
    id: "gender",
    text: "What is your gender?",
    type: "single_select",
    options: ["Male", "Female", "Other"],
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
  },
  {
    id: "real_experience",
    text: "What\u2019s something you\u2019ve experienced, achieved, or figured out that could genuinely help someone else?",
    type: "long_text",
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

  async function handleSubmit() {
    setSubmitting(true);

    const { name, age, location, gender, ...restAnswers } = responses;

    const payload = {
      name,
      age: Number(age),
      location,
      gender,
      answers: restAnswers,
      profile_image_type: "avatar",
      profile_image_reference: "avatar_default.svg",
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

  return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: 24 }}>
      <p style={{ opacity: 0.5, marginBottom: 8 }}>
        Question {step + 1} of {questions.length}
      </p>
      <h2 style={{ marginBottom: 24 }}>{current.text}</h2>

      {current.type === "text" && (
        <input
          type="text"
          value={responses[current.id] || ""}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ width: "100%", padding: 12, fontSize: 16 }}
        />
      )}

      {current.type === "number" && (
        <input
          type="number"
          value={responses[current.id] || ""}
          onChange={(e) => setAnswer(e.target.value)}
          style={{ width: "100%", padding: 12, fontSize: 16 }}
        />
      )}

      {current.type === "long_text" && (
        <textarea
          value={responses[current.id] || ""}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
          style={{ width: "100%", padding: 12, fontSize: 16 }}
        />
      )}

      {current.type === "single_select" &&
        current.options?.map((opt) => (
          <div key={opt} style={{ marginBottom: 8 }}>
            <button
              onClick={() => setAnswer(opt)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: 12,
                background: responses[current.id] === opt ? "#333" : "#f0f0f0",
                color: responses[current.id] === opt ? "#fff" : "#000",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {opt}
            </button>
          </div>
        ))}

      {current.type === "multi_select" &&
        current.options?.map((opt) => (
          <div key={opt} style={{ marginBottom: 8 }}>
            <button
              onClick={() => toggleMulti(opt)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: 12,
                background: (responses[current.id] || []).includes(opt)
                  ? "#333"
                  : "#f0f0f0",
                color: (responses[current.id] || []).includes(opt)
                  ? "#fff"
                  : "#000",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {opt}
            </button>
          </div>
        ))}

      <div
        style={{
          marginTop: 32,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 0}
          style={{ padding: "10px 20px" }}
        >
          Back
        </button>

        {isLast ? (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{ padding: "10px 20px" }}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button
            onClick={() => setStep(step + 1)}
            style={{ padding: "10px 20px" }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
