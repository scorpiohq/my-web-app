import Link from "next/link";

export default function ClosingOffer() {
  return (
    <section className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-4xl border-2 border-black bg-white px-6 py-12 text-center shadow-[8px_8px_0_0_#000] sm:px-10 sm:py-14 md:py-16">
        <h2
          className="mx-auto max-w-2xl text-[clamp(1.85rem,5vw,3rem)] leading-tight tracking-wide text-black"
          style={{ fontFamily: "var(--font-hero)" }}
        >
          So, what are you waiting for.
        </h2>

        <p className="mx-auto mt-0.5 max-w-lg text-sm leading-relaxed text-[#6B6B6B] sm:mt-1 sm:text-base md:text-lg">
          Get your blueprint in under 3 minutes.
        </p>

        <Link
          href="/form"
          className="btn-brutal btn-brutal-primary mt-7 inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold tracking-wide text-black sm:mt-8 sm:px-9 sm:py-4 sm:text-base"
        >
          GET YOUR BLUEPRINT →
        </Link>
      </div>
    </section>
  );
}
