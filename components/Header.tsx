"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="Your Blueprint" className="h-8 w-auto" />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <Link
            href="#"
            className="text-sm font-medium text-black hover:text-gray-700"
          >
            How it works
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-black hover:text-gray-700"
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-black hover:text-gray-700"
          >
            The Backstory
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/signin"
            className="rounded-full border border-black bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-50"
          >
            Sign In
          </Link>
          <Link
            href="/form"
            className="rounded-full bg-[#FFA126] px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-400"
          >
            Get your Blueprint
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center justify-center rounded-md border border-black p-2 text-black md:hidden"
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
        <div className="absolute inset-x-0 top-full z-20 bg-white px-4 pb-4 shadow-xl md:hidden">
          <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 ease-out">
            <div className="flex items-center justify-between">
              <div />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold text-black transition hover:text-gray-700"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="#"
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-black transition duration-200 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                How it works
              </Link>
              <Link
                href="#"
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-black transition duration-200 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-black transition duration-200 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                The Backstory
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/signin"
                className="block rounded-2xl border border-black bg-white px-4 py-3 text-center text-sm font-medium text-black transition duration-200 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/form"
                className="block rounded-2xl bg-[#FFA126] px-4 py-3 text-center text-sm font-semibold text-black transition duration-200 hover:bg-orange-400"
                onClick={() => setMenuOpen(false)}
              >
                Get your Blueprint
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
