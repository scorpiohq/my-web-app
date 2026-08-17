type Status = "in-progress" | "working-soon" | "completed";

const items: {
  badge: string;
  title: string;
  description: string;
  status: Status;
}[] = [
  {
    badge: "01",
    title: "A Complete Step-by-Step GAMEPLAN",
    description:
      "→ Everything you need to turn your Blueprint into reality, No fluff, No filler. Every step is actionable, not just informative. This isn't here to teach you and let you forget it. It's here to get you moving.",
    status: "in-progress",
  },
  {
    badge: "02",
    title: "A 7-Day Action Plan",
    description:
      "→ A day-by-day to-do list, so you're never guessing what's next. Just open it, follow it, do the work. No guessing, no room to procrastinate.",
    status: "working-soon",
  },
  {
    badge: "03",
    title: "My Creator System OS",
    description:
      "→ The exact system I've used daily since November 2024 - built myself, refined over time, and honestly one of the most important parts of how I work. Now it's yours too.",
    status: "completed",
  },
  {
    badge: "04",
    title: "My Viral Formula",
    description:
      "→ What's gotten me 100M+ views, adapted to your platform. It's not just worked for me. It's worked for others who've used it too.",
    status: "completed",
  },
  {
    badge: "05",
    title: "Ready-to-Use Templates",
    description:
      "→ Start and finish faster, without building from scratch. You don't need design skills or writing skills, just plug in and go.",
    status: "in-progress",
  },
  {
    badge: "06",
    title: "100+ Digital Product Ideas",
    description:
      "→ Everyone wants to make money online. Almost no one knows what to actually sell. So I made the list for you, 100+ ideas, ready to start selling.",
    status: "completed",
  },
];

const statusStyles: Record<
  Status,
  { label: string; wrap: string; dot: string; text: string }
> = {
  "in-progress": {
    label: "In Progress",
    wrap: "bg-[#E7F3F8]",
    dot: "bg-[#2383E2]",
    text: "text-[#1874C5]",
  },
  "working-soon": {
    label: "Working Soon",
    wrap: "bg-[#FBF3DB]",
    dot: "bg-[#C29243]",
    text: "text-[#9F6B53]",
  },
  completed: {
    label: "Completed!",
    wrap: "bg-[#DBEDDB]",
    dot: "bg-[#448361]",
    text: "text-[#2E6B4F]",
  },
};

function StatusBadge({ status }: { status: Status }) {
  const style = statusStyles[status];

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 ${style.wrap}`}
    >
      <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden="true" />
      <span
        className={`text-xs font-medium leading-none ${style.text} sm:text-[13px]`}
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        {style.label}
      </span>
    </span>
  );
}

export default function GameplanInside() {
  return (
    <section className="w-full pt-8 sm:pt-10">
      <h2
        className="m-0 text-[28px] font-normal italic leading-[1.2] text-black sm:text-[36px]"
        style={{ fontFamily: "var(--font-garamond)" }}
      >
        Here&apos;s what you&apos;ll get inside
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:gap-x-8">
        {items.map((item) => (
          <article
            key={item.badge}
            className="relative flex h-full flex-col border-2 border-black bg-[#F3EEE8] px-4 py-6 text-left shadow-[4px_4px_0_0_#000] sm:px-5 sm:py-7"
          >
            <span className="absolute left-3 top-0 -translate-y-1/2 border border-black bg-[#e5c4a1] px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.12em] text-black shadow-[2px_2px_0_0_#000] sm:left-4 sm:text-[10px]">
              {item.badge}
            </span>
            <h3 className="m-0 flex flex-wrap items-center gap-2">
              <span className="text-base font-semibold leading-snug text-black sm:text-[17px]">
                {item.title}
              </span>
              <StatusBadge status={item.status} />
            </h3>
            {item.description ? (
              <p className="mt-2 m-0 text-xs leading-relaxed text-black/80 sm:mt-2.5 sm:text-sm">
                {item.description}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
