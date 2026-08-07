"use client";

import { useEffect, useState } from "react";

export default function CheckoutTransition() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-12">
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      <div
        className={`relative z-10 w-full max-w-[300px] transition-all duration-700 sm:max-w-[320px] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="border-2 border-black bg-white px-5 py-6 shadow-[6px_6px_0_0_#000] sm:px-6 sm:py-7">
          <p className="text-lg font-semibold leading-snug text-black sm:text-xl">
            Almost there
          </p>
          <p className="mt-1 text-xs leading-snug text-[#6B6B6B] sm:text-sm">
            Redirecting you to secure checkout to complete your $24 Blueprint
            purchase.
          </p>

          <div className="mt-5 h-1.5 overflow-hidden border border-black bg-[#F3F3F3]">
            <div className="checkout-progress-bar h-full bg-[#FFC940]" />
          </div>

          <p className="mt-4 text-center text-xs text-[#999]">
            Your answers are saved — payment unlocks your report.
          </p>
        </div>
      </div>
    </div>
  );
}
