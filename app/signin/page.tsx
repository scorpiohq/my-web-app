"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClassName =
  "w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black outline-none transition-shadow placeholder:text-[#BDBDBD] focus:shadow-[2px_2px_0_0_#000]";

export default function SignInPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const canSubmit = Boolean(name.trim() && email.trim());

  async function handleSignIn() {
    if (!canSubmit || loading) {
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/check-signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email }),
    });
    const result = await res.json();
    setLoading(false);

    if (result.found) {
      router.push(`/report/${encodeURIComponent(result.id)}`);
    } else {
      setError("missing");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && canSubmit && !loading) {
      handleSignIn();
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[400px] sm:max-w-[440px]">
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
            Enter your name & email to sign back into your Blueprint.
          </p>

          <div className="mt-5 space-y-3">
            <div>
              <label htmlFor="signin-name" className="sr-only">
                Name
              </label>
              <input
                id="signin-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Your name"
                autoComplete="name"
                className={inputClassName}
              />
            </div>
            <div>
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
                className={inputClassName}
              />
            </div>
          </div>

          {error ? (
            <p className="mt-3 text-xs leading-snug text-[#c0392b] sm:text-sm">
              <span className="block">We couldn&apos;t find you!</span>
              <span className="mt-0.5 block whitespace-nowrap">
                Double-check your name and email, and try again.
              </span>
            </p>
          ) : null}

          <div className="mt-5 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleSignIn}
              disabled={loading || !canSubmit}
              className="btn-brutal btn-brutal-primary w-full px-8 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Checking..." : "Sign in"}
            </button>

            <p className="text-center text-xs leading-snug text-[#6B6B6B]">
              Don&apos;t have a blueprint yet?{" "}
              <Link
                href="/#hero"
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
