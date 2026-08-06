"use client";

import { useEffect, useState } from "react";
import { JOURNEY_STEPS, JourneyStepCircle } from "@/components/journey-steps";

export default function FormProgressStepper({
  activeStep,
}: {
  /** 0 = preparing, 1 = questions, 2 = AI, 3 = download */
  activeStep: number;
}) {
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    if (activeStep < 1) {
      setLineProgress(0);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 800;

    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setLineProgress(p * 100);
      if (p < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [activeStep]);

  function circleState(index: number): "completed" | "active" | "pending" {
    if (index < activeStep) return "completed";
    if (index === activeStep) return "active";
    return "pending";
  }

  return (
    <div className="flex items-center">
      {JOURNEY_STEPS.map((step, index) => {
        const isLast = index === JOURNEY_STEPS.length - 1;
        const state = circleState(index);

        let connectorFill = "0%";
        if (index === 0 && activeStep >= 1) {
          connectorFill = `${lineProgress}%`;
        } else if (index < activeStep) {
          connectorFill = "100%";
        }

        return (
          <div key={step.icon} className="flex items-center">
            <JourneyStepCircle icon={step.icon} state={state} size="sm" />
            {!isLast && (
              <div className="relative mx-0.5 h-0.5 w-5 overflow-hidden bg-[#E5E5E5] sm:mx-1 sm:w-7">
                <div
                  className="absolute inset-y-0 left-0 bg-black transition-[width] duration-700 ease-out"
                  style={{ width: connectorFill }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
