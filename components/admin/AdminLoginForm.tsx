"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClassName =
  "w-full border-2 border-black bg-white px-3 py-2.5 text-sm text-black outline-none transition-shadow placeholder:text-[#BDBDBD] focus:shadow-[2px_2px_0_0_#000]";

export default function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const canSubmit = Boolean(username.trim() && code.trim());

  async function handleSubmit() {
    if (!canSubmit || loading) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.trim(),
        code: code.trim(),
      }),
    });
    const result = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(
        typeof result.error === "string"
          ? result.error
          : "Could not sign in.",
      );
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[400px] sm:max-w-[440px]">
        <div className="border-2 border-black bg-white px-5 py-6 shadow-[6px_6px_0_0_#000] sm:px-6 sm:py-7">
          <Image
            src="/logo.svg"
            alt="Your Blueprint"
            width={140}
            height={32}
            className="mb-5 h-7 w-auto sm:h-8"
          />

          <h1 className="text-lg font-semibold leading-snug text-black sm:text-xl">
            Admin
          </h1>
          <p className="mt-1 text-xs leading-snug text-[#6B6B6B] sm:text-sm">
            Enter your username and code to open the recording studio.
          </p>

          <div className="mt-5 space-y-3">
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="Username"
              className={inputClassName}
            />
            <input
              type="password"
              autoComplete="current-password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="Code"
              className={inputClassName}
            />
          </div>

          {error ? (
            <p className="mt-3 text-sm text-[#B42318]" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className="btn-brutal btn-brutal-primary mt-5 inline-flex w-full items-center justify-center px-5 py-3 text-sm font-bold tracking-wide text-black disabled:opacity-60"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </div>
      </div>
    </div>
  );
}
