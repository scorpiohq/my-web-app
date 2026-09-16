"use client";

import { useEffect, useState, type ReactNode } from "react";
import { journeyFadeIn } from "@/components/gouti/journeyFade";

/**
 * Soft page enter for gouti journey screens.
 * Clears any cross-page white cover, then fades content up.
 */
export default function JourneyEnter({
  children,
  className = "",
  bg,
}: {
  children: ReactNode;
  className?: string;
  bg?: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    journeyFadeIn();
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        ready
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0"
      } ${className}`}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      {children}
    </div>
  );
}
