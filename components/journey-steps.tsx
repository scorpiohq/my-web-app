export const JOURNEY_STEPS = [
  { icon: "bulb" as const },
  { icon: "1" as const },
  { icon: "2" as const },
  { icon: "download" as const },
];

export type JourneyIcon = (typeof JOURNEY_STEPS)[number]["icon"];
export type JourneyStepState = "completed" | "active" | "pending";

function StepIconContent({
  icon,
  iconSize,
}: {
  icon: JourneyIcon;
  iconSize: string;
}) {
  if (icon === "bulb") {
    return (
      <svg viewBox="0 0 24 24" className={iconSize} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3 10v2h6v-2a6 6 0 0 0-3-10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "download") {
    return (
      <svg viewBox="0 0 24 24" className={iconSize} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v12m0 0l4-4m-4 4L8 11M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <span className="text-xs font-bold" style={{ fontFamily: "var(--font-hero)" }}>
      {icon}
    </span>
  );
}

export function JourneyStepCircle({
  icon,
  state,
  size = "md",
}: {
  icon: JourneyIcon;
  state: JourneyStepState;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  const stateClass =
    state === "completed" || state === "active"
      ? "border-2 border-black bg-[#FFC940] text-black shadow-[2px_2px_0_0_#000]"
      : "border border-[#D0D0D0] bg-white text-[#BDBDBD]";

  return (
    <div
      className={`relative z-10 flex shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-out ${dim} ${stateClass}`}
    >
      <StepIconContent icon={icon} iconSize={iconSize} />
    </div>
  );
}
