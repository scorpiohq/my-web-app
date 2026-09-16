export function PlatformIcon({
  name,
  size = 56,
}: {
  name: "youtube" | "x" | "linkedin" | "threads" | "instagram" | "substack";
  size?: number;
}) {
  const common = { width: size, height: size, viewBox: "0 0 64 64" } as const;

  if (name === "youtube") {
    return (
      <svg {...common} aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#FF0000" />
        <path d="M26 20v24l20-12-20-12z" fill="white" />
      </svg>
    );
  }
  if (name === "x") {
    return (
      <svg {...common} aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#0F0F0F" />
        <path
          d="M18 18h8.2l6.4 8.5L41.5 18H46l-11 12.8L47 46h-8.2l-7-9.3L22.5 46H18l11.8-13.7L18 18z"
          fill="white"
        />
      </svg>
    );
  }
  if (name === "linkedin") {
    return (
      <svg {...common} aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#0A66C2" />
        <path
          d="M20 26h7v22h-7V26zm3.5-11a4 4 0 110 8 4 4 0 010-8zM30 26h6.7v3h.1c.9-1.8 3.2-3.7 6.6-3.7 7 0 8.3 4.6 8.3 10.6V48h-7V37.5c0-2.5 0-5.7-3.5-5.7s-4 2.7-4 5.5V48H30V26z"
          fill="white"
        />
      </svg>
    );
  }
  if (name === "threads") {
    return (
      <svg {...common} aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#101010" />
        <path
          d="M40.5 30.2c-.3-5.5-3.7-9-9.2-9-6.3 0-10.3 4.7-10.3 12.1 0 7.2 3.9 11.9 10.8 11.9 4.1 0 7.5-1.4 9.4-4.1l-3.1-2.3c-1.2 1.7-3.2 2.6-6.1 2.6-4.2 0-6.8-2.8-7-7.6h16.7c0-.5.1-1 .1-1.5 0-.7 0-1.4-.1-2.1h-1.2zm-13.4.7c.6-3.3 2.6-5.2 5.5-5.2 2.8 0 4.6 1.8 5 5.2H27.1z"
          fill="white"
        />
      </svg>
    );
  }
  if (name === "instagram") {
    return (
      <svg {...common} aria-hidden="true">
        <defs>
          <linearGradient id="bp-ig" x1="8" y1="56" x2="56" y2="8">
            <stop stopColor="#F58529" />
            <stop offset=".35" stopColor="#DD2A7B" />
            <stop offset=".7" stopColor="#8134AF" />
            <stop offset="1" stopColor="#515BD4" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#bp-ig)" />
        <rect
          x="18"
          y="18"
          width="28"
          height="28"
          rx="8"
          stroke="white"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="32" cy="32" r="7" stroke="white" strokeWidth="3" fill="none" />
        <circle cx="42" cy="22" r="2.2" fill="white" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#FF6719" />
      <path
        d="M22 16h12c6 0 10 3.8 10 9.5 0 4.4-2.5 7.5-6.6 8.7L43 48h-7.2l-5-12.5H29V48h-7V16zm7 13.2h4.5c2.8 0 4.4-1.4 4.4-3.7s-1.6-3.6-4.4-3.6H29v7.3z"
        fill="white"
      />
    </svg>
  );
}
