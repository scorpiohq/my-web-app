"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function CheckoutTransition({
  note = "Your answers are saved, pay to unlock your report.",
}: {
  note?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-12 text-left">
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      <div
        className={`relative z-10 w-full max-w-[340px] transition-all duration-700 sm:max-w-[360px] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="border-2 border-black bg-white shadow-[6px_6px_0_0_#000]">
          <div className="flex h-9 items-center border-b-2 border-black bg-[#EDEDED] px-3">
            <div className="flex items-center gap-[6px]" aria-hidden="true">
              <span className="h-[11px] w-[11px] rounded-full bg-[#FF5F57]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#28C840]" />
            </div>
          </div>

          <div className="px-5 py-6 sm:px-6 sm:py-7">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold leading-snug text-black sm:text-xl">
                Almost there!!
              </p>
              <Image
                src="/logo-dp.svg"
                alt="Your Blueprint"
                width={36}
                height={36}
                className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
              />
            </div>

            <p className="mt-2 text-left text-xs leading-snug text-[#6B6B6B] sm:text-sm">
              Secure your checkout to complete…
            </p>

            <div className="mt-5 h-1.5 overflow-hidden border border-black bg-[#F3F3F3]">
              <div className="checkout-progress-fill h-full bg-[#FFC940]" />
            </div>

            <p className="mt-4 text-left text-[11px] leading-snug text-[#999] sm:text-xs">
              {note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
