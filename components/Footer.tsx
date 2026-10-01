import Link from "next/link";

function sectionNav(sectionPath: string) {
  const prefix =
    sectionPath === "/" ? "/#" : `${sectionPath.replace(/\/$/, "")}#`;
  return [
    { href: `${prefix}how-it-works`, label: "How it works" },
    { href: `${prefix}pricing`, label: "Pricing" },
    { href: `${prefix}backstory`, label: "About" },
    { href: "/policies", label: "Our Policies" },
  ];
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <span className="text-lg font-semibold leading-none" aria-hidden="true">
      @
    </span>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://instagram.com/yourbluepriint",
    label: "Instagram",
    external: true,
    Icon: InstagramIcon,
  },
  {
    href: "https://www.threads.com/yourbluepriint",
    label: "Threads",
    external: true,
    Icon: ThreadsIcon,
  },
  {
    href: "mailto:hello@yourblueprint.in",
    label: "Email",
    external: false,
    Icon: EmailIcon,
  },
] as const;

export default function Footer({
  surface = "grid",
  /** Page path for section anchors. Use `/gouti/landing` on that page. */
  sectionPath = "/",
}: {
  surface?: "grid" | "soft";
  sectionPath?: string;
} = {}) {
  const soft = surface === "soft";
  const navLinks = sectionNav(sectionPath);
  const dmSans = {
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  } as const;
  const bricolage = {
    fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", sans-serif',
  } as const;

  return (
    <footer
      className={`site-footer border-t border-black/[0.08] ${
        soft ? "bg-white" : "grid-bg bg-white"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-8 sm:px-8 sm:pt-9 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <Link href="/" className="shrink-0">
            <img
              src="/logo.svg"
              alt="Your Blueprint"
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <p
            className="shrink-0 text-[15px] text-black/55 sm:text-right sm:text-base"
            style={dmSans}
          >
            Built for Creators, by Creator. ♡
          </p>
        </div>

        <div className="mt-6 border-t border-black/10 pt-5 sm:mt-7 sm:pt-6">
          <nav className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8 sm:gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-nav-link text-[15px] font-semibold text-black transition hover:text-black/70 sm:text-base"
                style={bricolage}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 pb-6 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:pb-7 sm:pt-6 lg:px-10">
          <p className="footer-copy text-[15px] text-black/70" style={dmSans}>
            ©Your Blueprint, 2026. All rights reserved.
          </p>

          <div className="flex items-center gap-3.5">
            {socialLinks.map(({ href, label, external, Icon }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#FFC940] text-black transition hover:bg-[#ffd966]"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
    </footer>
  );
}
