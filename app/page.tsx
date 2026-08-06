"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

const directions = [
  "Travel Creator",
  "Finance Creator",
  "Fitness Creator",
  "Tech Creator",
  "Lifestyle Creator",
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % directions.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "100vh",
          background: "#F4F0EF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "var(--font-body)",
          color: "#1A1A1A",
        }}
      >
        <p
          style={{
            textTransform: "uppercase",
            letterSpacing: 2,
            fontSize: 13,
            color: "#5C6B5D",
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          Your Personalized Creator Blueprint
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(36px, 6vw, 64px)",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          You might already be a
          <br />
          <span
            style={{ color: "#E8A33D", display: "inline-block", minWidth: 320 }}
          >
            {directions[index]}
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            maxWidth: 480,
            textAlign: "center",
            margin: "28px 0 40px",
            color: "#4A4A4A",
            lineHeight: 1.6,
          }}
        >
          Answer a few honest questions. Get a report built around who you
          actually are — your strengths, your direction, and your first real
          move.
        </p>

        <Link
          href="/form"
          style={{
            background: "#1A1A1A",
            color: "#F4F0EF",
            padding: "16px 32px",
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 16,
            textDecoration: "none",
            transition: "transform 0.15s ease",
          }}
        >
          Get My Personalized Blueprint →
        </Link>

        <p style={{ marginTop: 20, fontSize: 13, color: "#8a8577" }}>
          Takes about 4 minutes · No experience needed
        </p>
      </div>
    </>
  );
}
