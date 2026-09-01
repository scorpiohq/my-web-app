"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/reviews", label: "Reviews" },
  { href: "/#pricing", label: "Pricing" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="grid-bg relative">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link href="/" className="flex shrink-0 items-center">
          <img src="/logo.svg" alt="Your Blueprint" className="h-9 w-auto sm:h-10" />
        </Link>

        <div className="hidden items-center gap-8 lg:flex lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center text-[15px] font-medium text-black transition hover:text-black/70"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/signin"
            className="btn-brutal btn-brutal-secondary inline-block px-5 py-2.5 text-sm font-medium text-black"
          >
            Sign in
          </Link>
          <Link
            href="/#pricing"
            className="btn-brutal btn-brutal-primary inline-block px-5 py-2.5 text-sm font-semibold text-black"
          >
            Get your Blueprint →
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center justify-center border border-black bg-white p-2 text-black shadow-[2px_2px_0_0_#c8c8c8] lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <span className="text-xl leading-none">×</span>
          ) : (
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-6 bg-black" />
              <span className="block h-0.5 w-6 bg-black" />
              <span className="block h-0.5 w-6 bg-black" />
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="grid-bg absolute inset-x-0 top-full z-20 border-t border-black/10 px-5 pb-5 shadow-lg lg:hidden">
          <div className="mx-auto max-w-md pt-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center px-2 py-3 text-sm font-medium text-black transition hover:bg-black/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              <Link
                href="/signin"
                className="btn-brutal btn-brutal-secondary block px-4 py-3 text-center text-sm font-medium text-black"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/#pricing"
                className="btn-brutal btn-brutal-primary block px-4 py-3 text-center text-sm font-semibold text-black"
                onClick={() => setMenuOpen(false)}
              >
                Get your Blueprint →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
