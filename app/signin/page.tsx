"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

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
      router.push(`/report/${result.id}`);
    } else {
      setError(
        "Access denied — either you entered the wrong email, or you haven\u2019t made your blueprint yet.",
      );
    }
  }

  return (
    <>
      <Header />
      <div
        style={{
          maxWidth: 420,
          margin: "100px auto",
          padding: 24,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            marginBottom: 12,
          }}
        >
          Sign In
        </h1>
        <p style={{ color: "#666", marginBottom: 32 }}>
          Enter the email you used to get your blueprint.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          style={{
            width: "100%",
            padding: "14px 16px",
            fontSize: 16,
            border: "1px solid #ddd",
            borderRadius: 8,
            marginBottom: 16,
            fontFamily: "var(--font-body)",
          }}
        />

        <button
          onClick={handleSignIn}
          disabled={loading || !email}
          style={{
            width: "100%",
            background: "#FFA126",
            color: "#000",
            border: "none",
            borderRadius: 8,
            padding: "14px 0",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          {loading ? "Checking..." : "Sign In"}
        </button>

        {error && (
          <p
            style={{
              color: "#c0392b",
              marginTop: 20,
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            {error}
          </p>
        )}
      </div>
    </>
  );
}
