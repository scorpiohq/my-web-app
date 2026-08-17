"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function formatWhen(iso?: string) {
  const date = iso ? new Date(iso) : new Date();
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${day} • ${time}`;
}

function userIdFromPublicId(publicId?: string) {
  if (!publicId) {
    return "8472910351628";
  }

  return publicId
    .replace(/-/g, "")
    .replace(/[a-f]/gi, (char) => String(Number.parseInt(char, 16) % 10))
    .slice(0, 13);
}

function SuccessCheck() {
  return (
    <div
      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E] shadow-[0_10px_24px_rgba(34,197,94,0.28)]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-8 w-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.5 9.5 17 19 7.5" />
      </svg>
    </div>
  );
}

export default function PaymentThankYouTicket({
  publicId,
  paidAt,
}: {
  publicId?: string;
  paidAt?: string;
}) {
  const [visible, setVisible] = useState(false);
  const [when, setWhen] = useState("");

  useEffect(() => {
    setWhen(formatWhen(paidAt));
    requestAnimationFrame(() => setVisible(true));
  }, [paidAt]);

  const progressHref = publicId
    ? `/progress?submission_id=${encodeURIComponent(publicId)}`
    : "/progress";

  return (
    <div
      className={`w-full max-w-sm text-center transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <SuccessCheck />

      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-black">
        Payment Successful
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-[#8A8A8A]">
        You're in. Your Blueprint is being built right now.
      </p>

      <dl className="mt-8 space-y-5">
        <div>
          <dt className="text-xs text-[#9A9A9A]">USER ID</dt>
          <dd className="mt-1 text-sm text-black">{userIdFromPublicId(publicId)}</dd>
        </div>
        <div>
          <dt className="text-xs text-[#9A9A9A]">DATE & TIME</dt>
          <dd className="mt-1 text-sm text-black">{when || "—"}</dd>
        </div>
        <div>
          <dt className="text-xs text-[#9A9A9A]">Amount</dt>
          <dd className="mt-1 text-sm text-black">$18.00</dd>
        </div>
      </dl>

      <Link
        href={progressHref}
        className="btn-brutal btn-brutal-secondary mt-10 inline-block px-5 py-2.5 text-sm font-medium text-black"
      >
        View progress →
      </Link>
    </div>
  );
}
