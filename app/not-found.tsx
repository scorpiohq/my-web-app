import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center bg-white px-6 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <h1
          className="text-[clamp(1.75rem,6vw,2.75rem)] leading-tight tracking-wide text-black"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          SEEMS LIKE YOU ARE LOST
        </h1>

        <p
          className="mt-1 text-[clamp(4.5rem,18vw,7.5rem)] leading-none tracking-wide text-black [text-shadow:4px_4px_0_rgba(0,0,0,0.12),8px_8px_0_rgba(0,0,0,0.06)] sm:mt-1.5"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          404!
        </p>

        <p className="mt-1 max-w-lg text-sm leading-relaxed text-[#444] sm:mt-1.5 sm:text-base">
          I know the feeling. I was lost too, unsure where to start while
          everyone else seemed to be moving forward. That&apos;s one of the
          reasons I built{" "}
          <span className="font-semibold text-black">Your Blueprint.</span>
        </p>

        <Link
          href="/"
          className="btn-brutal btn-brutal-primary mt-10 inline-block px-8 py-3.5 text-sm font-semibold tracking-wide text-black sm:mt-12"
        >
          ← BACK TO YOUR BLUEPRINT
        </Link>
      </div>
    </main>
  );
}
