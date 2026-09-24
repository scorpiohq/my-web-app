"use client";

import { useRouter } from "next/navigation";
import { journeyFadeTo } from "@/components/gouti/journeyFade";

export default function GoutiFormCta({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={className}
      onClick={() => journeyFadeTo(href, router, { durationMs: 420 })}
    >
      {children}
    </button>
  );
}
