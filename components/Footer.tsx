import Link from "next/link";

const navLinks = [
  { href: "#how-it-works", label: "How it work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#backstory", label: "The BackStory" },
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
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.767-2.114 1.647-1.813 1.484-4.289 1.087-5.892-.488-1.992-2.032-3.013-3.546-3.378-1.117-.27-2.316-.312-3.512-.157v-.028c.343-1.653 1.528-2.644 3.293-2.856 1.094-.134 2.266.008 3.401.431 1.603.587 2.745 1.827 3.143 3.883.479 2.546.122 5.427-2.592 7.444-1.714 1.345-4.012 2.062-7.215 2.083zm-.007-10.338c-1.285-.042-2.648.156-3.778.574-1.896.705-3.036 2.241-3.036 4.218 0 2.474 2.054 4.287 4.821 4.287 1.653 0 3.094-.562 4.076-1.583.982-1.021 1.523-2.433 1.523-3.974 0-2.286-1.96-3.522-3.606-3.522z" />
    </svg>
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
          <img src="/logo.svg" alt="Your Blueprint" className="h-9 w-auto sm:h-10" />
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
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#FFC940] text-black transition hover:bg-[#ffd966]"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://threads.net"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#FFC940] text-black transition hover:bg-[#ffd966]"
            aria-label="Threads"
          >
            <ThreadsIcon />
          </a>
          <a
            href="mailto:hello@yourblueprint.com"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#FFC940] text-black transition hover:bg-[#ffd966]"
            aria-label="Email"
          >
            <EmailIcon />
          </a>
        </div>

        <p className="text-sm text-black/70">© 2026. All rights reserved.</p>
      </div>
    </footer>
  );
}
