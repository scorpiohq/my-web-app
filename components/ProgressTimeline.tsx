type TimelineStep = {
  step: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  icon?: "checkmark" | "download";
};

interface ProgressTimelineProps {
  steps: TimelineStep[];
  currentStep: number;
}

export default function ProgressTimeline({
  steps,
  currentStep,
}: ProgressTimelineProps) {
  const ACCENT = "#FFA126";

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {steps.map((s, idx) => (
          <div
            key={idx}
            style={{ display: "flex", gap: 20, position: "relative" }}
          >
            {/* Timeline circle */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background:
                    s.status === "completed"
                      ? ACCENT
                      : s.status === "in-progress"
                        ? "#FFF3E0"
                        : "#f5f5f5",
                  border: `2px solid ${s.status === "completed" ? ACCENT : s.status === "in-progress" ? ACCENT : "#ddd"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 18,
                  color:
                    s.status === "completed"
                      ? "#fff"
                      : s.status === "in-progress"
                        ? ACCENT
                        : "#999",
                }}
              >
                {s.icon === "checkmark" && "✓"}
                {s.icon === "download" && "↓"}
                {!s.icon && s.step}
              </div>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    width: 2,
                    height: 80,
                    background: s.status === "completed" ? ACCENT : "#ddd",
                    marginTop: 8,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingTop: 8, flex: 1 }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#000",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 14,
                  color: "#888",
                  lineHeight: 1.4,
                }}
              >
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
