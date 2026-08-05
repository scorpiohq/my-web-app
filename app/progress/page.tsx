"use client";

import ProgressTimeline from "@/components/ProgressTimeline";
import { useEffect, useState } from "react";

export default function ProgressPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      step: 1,
      title: "Getting Started",
      description: "Your form response received",
      status: "completed" as const,
      icon: "checkmark" as const,
    },
    {
      step: 2,
      title: "Questionnaire Complete",
      description: "Processing your 18 answers",
      status: "in-progress" as const,
    },
    {
      step: 3,
      title: "AI Starts Working",
      description: "Our AI is building your personalized blueprint",
      status: "pending" as const,
    },
    {
      step: 4,
      title: "It's Ready",
      description: "Download your personalized report",
      status: "pending" as const,
      icon: "download" as const,
    },
  ];

  // Simulate progression (remove this when real payment/AI is wired)
  useEffect(() => {
    const intervals = [2000, 5000, 8000];
    intervals.forEach((delay, idx) => {
      setTimeout(() => setCurrentStep(idx + 1), delay);
    });
  }, []);

  return (
    <div
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ProgressTimeline steps={steps} currentStep={currentStep} />

      {currentStep === 3 && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ fontSize: 16, color: "#666" }}>
            This typically takes 10-15 seconds...
          </p>
        </div>
      )}

      {currentStep === 3 && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `3px solid #FFA126`,
              borderTopColor: "transparent",
              margin: "0 auto",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
}
