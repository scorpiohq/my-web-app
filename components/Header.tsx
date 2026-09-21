"use client";

import { useState } from "react";
import Link from "next/link";

function sectionNav(sectionPath: string) {
  const prefix =
    sectionPath === "/" ? "/#" : `${sectionPath.replace(/\/$/, "")}#`;
  return [
    { href: `${prefix}how-it-works`, label: "How it works" },
    { href: `${prefix}pricing`, label: "Pricing" },
    { href: `${prefix}backstory`, label: "About" },
  ];
}

export default function Header({
  ctaHref = "/#pricing",
  surface = "grid",
  /** Page path for section anchors. Use `/gouti/landing` on that page. */
  sectionPath = "/",
}: {
  ctaHref?: string;
  /** `soft` = solid white bar (milky page canvas). Default keeps grid. */
  surface?: "grid" | "soft";
  sectionPath?: string;
} = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const soft = surface === "soft";
  const navLinks = sectionNav(sectionPath);
  const navFont = soft
    ? { fontFamily: "var(--font-bricolage), \"Bricolage Grotesque\", sans-serif" }
    : undefined;

  return (
    <header
      className={`relative ${soft ? "border-b border-black/[0.08] bg-white" : "grid-bg"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8 sm:py-5">
        <Link href="/" className="flex shrink-0 items-center">
          {/* Mobile: mark only — Desktop: full wordmark */}
          <img
            src="/logo-dp.svg"
            alt="Your Blueprint"
            className="h-9 w-9 lg:hidden"
          />
          <img
            src="/logo.svg"
            alt="Your Blueprint"
            className="hidden h-10 w-auto lg:block"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center text-[15px] font-medium text-black transition hover:text-black/70"
              style={navFont}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/signin"
            className="btn-brutal btn-brutal-secondary inline-block px-5 py-2.5 text-sm font-medium text-black"
            style={navFont}
          >
            Sign in
          </Link>
          <Link
            href={ctaHref}
            className="btn-brutal btn-brutal-primary inline-block px-5 py-2.5 text-sm font-semibold text-black"
            style={navFont}
          >
            Build my Blueprint →
          </Link>
        </div>

        {/* Mobile: CTA + menu (Youform-style) */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link
            href={ctaHref}
            className="btn-brutal btn-brutal-primary inline-flex items-center justify-center px-3 py-2 text-[12px] font-semibold tracking-wide text-black sm:px-3.5 sm:text-[13px]"
            style={navFont}
          >
            Build my Blueprint →
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={
              soft
                ? "inline-flex items-center justify-center bg-transparent p-2 text-black"
                : "inline-flex items-center justify-center border border-black bg-white p-2 text-black shadow-[2px_2px_0_0_#c8c8c8]"
            }
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <span className="text-xl leading-none">×</span>
            ) : (
              <span className="flex flex-col gap-1">
                <span className="block h-0.5 w-5 bg-black" />
                <span className="block h-0.5 w-5 bg-black" />
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className={`absolute inset-x-0 top-full z-20 border-t border-black/10 px-5 pb-5 shadow-lg lg:hidden ${
            soft ? "bg-white" : "grid-bg"
          }`}
        >
          <div className="mx-auto max-w-md pt-4">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex w-full items-center px-2 py-3 text-sm font-medium text-black transition hover:bg-black/5"
                  style={navFont}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-4">
              <Link
                href="/signin"
                className="btn-brutal btn-brutal-secondary block px-4 py-3 text-center text-sm font-medium text-black"
                style={navFont}
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
