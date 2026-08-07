import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid-bg flex flex-col items-center justify-center px-6 py-14 sm:px-8 sm:py-16">
      <div className="flex w-full max-w-4xl flex-col items-center text-center">
        <span className="mb-8 inline-block border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-10 sm:text-xs">
          OVER 50K COURSES LAUNCHED
        </span>

        <h1
          className="mb-6 max-w-3xl text-[clamp(2.75rem,8vw,5rem)] leading-[0.95] tracking-wide text-black sm:mb-8"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          LAUNCH AND RUN YOUR
          <br />
          COURSE WITH EASE
        </h1>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-[#6B6B6B] sm:mb-12 sm:text-lg">
          Everything you need is in one place, so you can focus on creating
          great lessons, supporting your students, and building a lasting
          learning experience.
        </p>

        <Link
          href="/form"
          className="btn-brutal btn-brutal-primary inline-block min-w-[180px] px-8 py-3.5 text-sm font-semibold text-black"
        >
          Get your Blueprint →
        </Link>

        <p className="mt-8 text-sm text-[#8A8A8A] sm:mt-10">
          <span aria-hidden="true">⌛ </span>
          14 day money back guarantee!
        </p>
      </div>
    </section>
  );
}
