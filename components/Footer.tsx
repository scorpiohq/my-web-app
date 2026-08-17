import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/#how-it-works", label: "How it work" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#backstory", label: "The BackStory" },
  { href: "/reviews", label: "What people are saying" },
  { href: "/policies", label: "Our Policies" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <span className="text-base font-semibold leading-none" aria-hidden="true">
      @
    </span>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="grid-bg border-t border-black/20">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-12 sm:px-8 sm:py-14">
        <Link href="/" className="mb-8 sm:mb-10">
          <Image
            src="/logo.svg"
            alt="Your Blueprint"
            width={160}
            height={40}
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="mb-8 flex flex-col items-center gap-4 sm:mb-10 sm:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-black transition hover:text-black/70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mb-8 flex items-center gap-4 sm:mb-10">
          <a
            href="https://instagram.com/yourbluepriint"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#FFC940] text-black transition hover:bg-[#ffd966]"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.threads.com/yourbluepriint"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#FFC940] text-black transition hover:bg-[#ffd966]"
            aria-label="Threads"
          >
            <ThreadsIcon />
          </a>
          <a
            href="mailto:hello@yourblueprint.in"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#FFC940] text-black transition hover:bg-[#ffd966]"
            aria-label="Email"
          >
            <EmailIcon />
          </a>
        </div>

        <p className="text-sm text-black/70">©Your Blueprint, 2026. All rights reserved.</p>
      </div>
    </footer>
  );
}
