"use client";

import { useState } from "react";
import CheckoutTransition from "@/components/CheckoutTransition";

export default function GameplanCheckoutButton({
  label,
  publicId,
}: {
  label: string;
  publicId?: string;
}) {
  const [starting, setStarting] = useState(false);

  async function startCheckout() {
    setStarting(true);
    const transitionStart = Date.now();

    try {
      const res = await fetch("/api/create-gameplan-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: publicId }),
      });
      const result = await res.json();

      if (!res.ok || !result.checkoutUrl) {
        throw new Error(result.error || "Could not start checkout");
      }

      const remaining = Math.max(0, 1700 - (Date.now() - transitionStart));
      await new Promise((resolve) => setTimeout(resolve, remaining));
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setStarting(false);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong starting checkout.",
      );
    }
  }

  return (
    <>
      {starting ? (
        <CheckoutTransition note="Pay to lock in your Gameplan slot." />
      ) : null}
      <button
        type="button"
        onClick={startCheckout}
        disabled={starting}
        className="btn-brutal btn-brutal-primary w-full px-6 py-4 text-sm font-bold tracking-wide text-black disabled:cursor-wait sm:text-base"
        style={{ fontFamily: "var(--font-hero)" }}
      >
        {label}
      </button>
    </>
  );
}
