"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function ProfileIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" strokeLinecap="round" />
    </svg>
  );
}

function GiftNotificationBadge() {
  return (
    <span
      className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-black bg-white text-[14px] leading-none shadow-[2px_2px_0_0_#000]"
      aria-hidden="true"
    >
      🎁
    </span>
  );
}

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ReportPageHeaderProps = {
  userName: string;
  reportHref: string;
  giftHref: string;
};

export default function ReportPageHeader({
  userName,
  reportHref,
  giftHref,
}: ReportPageHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const firstName = userName.trim().split(/\s+/)[0] || "Profile";

  return (
    <header className="relative z-30 border-b border-black/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.svg"
            alt="Your Blueprint"
            width={160}
            height={40}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <div className="relative hidden lg:block">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            className="inline-flex items-center gap-2.5 border border-black bg-white px-3 py-2 text-black shadow-[2px_2px_0_0_#c8c8c8] transition hover:shadow-[3px_3px_0_0_#c8c8c8]"
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-[#f3f3f3] text-black/70">
              <ProfileIcon />
            </span>
            <span className="text-[15px] font-medium">{firstName}</span>
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {profileOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-10 cursor-default"
                aria-label="Close profile menu"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[220px] border border-black bg-white py-2 shadow-[4px_4px_0_0_#000]">
                <p className="px-4 py-2 text-xs font-medium uppercase tracking-wide text-black/50">
                  Signed in as
                </p>
                <Link
                  href={reportHref}
                  className="block px-4 pb-3 text-sm font-semibold text-black transition hover:bg-black/5"
                  onClick={() => setProfileOpen(false)}
                >
                  {userName}
                </Link>
                <Link
                  href={giftHref}
                  className="relative mx-3 mb-1 mt-1 block border border-black bg-white px-4 py-2.5 text-center text-sm font-medium uppercase tracking-wide text-black shadow-[2px_2px_0_0_#c8c8c8] transition hover:bg-black/5"
                  onClick={() => setProfileOpen(false)}
                >
                  Your gift
                  <GiftNotificationBadge />
                </Link>
                <Link
                  href="/signin"
                  className="block px-4 py-2.5 text-sm font-medium text-black transition hover:bg-black/5"
                  onClick={() => setProfileOpen(false)}
                >
                  Sign out
                </Link>
              </div>
            </>
          )}
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
        <div className="absolute inset-x-0 top-full z-20 border-t border-black/10 bg-[#f8f8f8] px-5 pb-5 shadow-lg lg:hidden">
          <div className="mx-auto max-w-md pt-4">
            <Link
              href={reportHref}
              className="flex items-center gap-3 border border-black bg-white px-3 py-3 shadow-[2px_2px_0_0_#c8c8c8]"
              onClick={() => setMenuOpen(false)}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/15 bg-[#f3f3f3] text-black/70">
                <ProfileIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-black/50">
                  Your profile
                </p>
                <p className="text-sm font-semibold text-black">{userName}</p>
              </div>
              <ChevronDownIcon className="ml-auto h-4 w-4 text-black/60" />
            </Link>

            <div className="mt-4 space-y-3">
              <Link
                href={giftHref}
                className="btn-brutal btn-brutal-secondary relative block px-4 py-3 text-center text-sm font-medium uppercase tracking-wide text-black"
                onClick={() => setMenuOpen(false)}
              >
                Your gift
                <GiftNotificationBadge />
              </Link>
              <Link
                href="/signin"
                className="btn-brutal btn-brutal-secondary block px-4 py-3 text-center text-sm font-medium text-black"
                onClick={() => setMenuOpen(false)}
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
