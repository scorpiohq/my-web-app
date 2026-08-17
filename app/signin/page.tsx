"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/check-signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const result = await res.json();
    setLoading(false);

    if (result.found) {
      router.push(`/report/${encodeURIComponent(result.id)}`);
    } else {
      setError(
        "Access denied — either you entered the wrong email, or you haven\u2019t made your blueprint yet.",
      );
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && email && !loading) {
      handleSignIn();
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[300px] sm:max-w-[320px]">
        <div className="border-2 border-black bg-white px-5 py-6 shadow-[6px_6px_0_0_#000] sm:px-6 sm:py-7">
          <Link href="/" className="mb-5 inline-block">
            <Image
              src="/logo.svg"
              alt="Your Blueprint"
              width={140}
              height={32}
              className="h-7 w-auto sm:h-8"
            />
          </Link>

          <h1 className="text-lg font-semibold leading-snug text-black sm:text-xl">
            Sign in
          </h1>
          <p className="mt-1 text-xs leading-snug text-[#6B6B6B] sm:text-sm">
            Enter the email you used to get your blueprint.
          </p>

          <div className="mt-5">
            <label htmlFor="signin-email" className="sr-only">
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="you@email.com"
              autoComplete="email"
              className="w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black outline-none transition-shadow placeholder:text-[#BDBDBD] focus:shadow-[2px_2px_0_0_#000]"
            />
          </div>

          {error && (
            <p className="mt-3 text-xs leading-relaxed text-[#c0392b] sm:text-sm">
              {error}
            </p>
          )}

          <div className="mt-5 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleSignIn}
              disabled={loading || !email}
              className="btn-brutal btn-brutal-primary w-full px-8 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Checking..." : "Sign in"}
            </button>

            <p className="text-center text-xs leading-snug text-[#6B6B6B]">
              Don&apos;t have a blueprint yet?{" "}
              <Link
                href="/form"
                className="font-semibold text-black underline underline-offset-2"
              >
                Get yours
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
