"use client";

import { useState } from "react";

export default function GameplanWaitlistForm({
  defaultEmail = "",
  defaultName = "",
}: {
  defaultEmail?: string;
  defaultName?: string;
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading" || status === "done") return;

    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email.");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/gameplan-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, name: defaultName || undefined }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error || "Could not join waitlist");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Could not join waitlist",
      );
    }
  }

  if (status === "done") {
    return (
      <div className="border-2 border-black bg-white px-6 py-8 text-center shadow-[6px_6px_0_0_#000]">
        <p
          className="m-0 text-[clamp(1.25rem,3vw,1.75rem)] font-normal leading-[1.15] tracking-[-0.02em] text-black"
          style={{ fontFamily: "var(--font-azo-uber), sans-serif" }}
        >
          YOU&apos;RE ON THE LIST
        </p>
        <p
          className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#4A4A4A] sm:text-base"
          style={{
            fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
          }}
        >
          I&apos;ll email you the moment YOUR GAMEPLAN is ready — no spam, just
          the drop.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-black bg-white px-5 py-7 shadow-[6px_6px_0_0_#000] sm:px-7 sm:py-8"
    >
      <p
        className="m-0 text-center text-[clamp(1.25rem,3vw,1.75rem)] font-normal leading-[1.15] tracking-[-0.02em] text-black"
        style={{ fontFamily: "var(--font-azo-uber), sans-serif" }}
      >
        JOIN THE WAITLIST
      </p>
      <p
        className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-[#4A4A4A] sm:text-base"
        style={{
          fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
        }}
      >
        GAMEPLAN isn&apos;t for sale yet. Leave your email and you&apos;ll be
        first in line when it launches.
      </p>
      <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="min-h-[48px] flex-1 border-2 border-black bg-white px-4 text-sm text-black outline-none placeholder:text-[#999] sm:text-base"
          style={{
            fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-brutal btn-brutal-primary min-h-[48px] shrink-0 px-6 text-sm font-semibold tracking-wide text-black disabled:cursor-wait disabled:opacity-70 sm:text-base"
        >
          {status === "loading" ? "Joining…" : "JOIN WAITLIST →"}
        </button>
      </div>
      {error ? (
        <p className="mt-3 text-center text-xs font-medium text-red-700 sm:text-sm">
          {error}
        </p>
      ) : null}
    </form>
  );
}
