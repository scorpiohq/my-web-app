"use client";

import { useEffect, useState } from "react";
import { Blobatar } from "@blobatar/react";
import { surprised } from "blobatar/expression";
import "blobatar/motion.css";
import "@/app/gouti/building/building.css";

const DEFAULT_HOLD_MS = 1800;

/**
 * Same Blobatar + Loading… + fill bar as /gouti/building (img 4).
 */
export default function BlueprintLoadingBridge({
  name = "Your Blueprint",
  holdMs = DEFAULT_HOLD_MS,
}: {
  name?: string;
  holdMs?: number;
}) {
  const [size, setSize] = useState(112);

  useEffect(() => {
    const sync = () => {
      setSize(window.matchMedia("(min-width: 640px)").matches ? 128 : 96);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <div className="flex w-full max-w-[200px] flex-col items-center sm:max-w-[220px]">
        <Blobatar
          name={name}
          size={size}
          traits={{ shape: 0.11 }}
          hue={78}
          expression={surprised}
          animate="always"
        />

        <p
          className="mt-4 text-[15px] font-medium tracking-[-0.01em] text-[#1A1A1A] sm:mt-5 sm:text-[16px]"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
        >
          Loading...
        </p>

        <div
          className="mt-3 h-1.5 w-[72%] overflow-hidden rounded-full bg-[#EDEDED] sm:mt-3.5 sm:h-[6px]"
          role="progressbar"
          aria-label="Loading"
        >
          <div
            className="bp-building-fill h-full rounded-full bg-[#FFA126]"
            style={{ animationDuration: `${holdMs}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
