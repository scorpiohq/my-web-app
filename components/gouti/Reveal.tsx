"use client";

import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  eager = false,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  /** Play on mount — use for above-the-fold hero so the first paint is not blank. */
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (eager) {
      const id = window.setTimeout(() => el.classList.add("is-in"), delayMs);
      return () => window.clearTimeout(id);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => el.classList.add("is-in"), delayMs);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={`st-scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
