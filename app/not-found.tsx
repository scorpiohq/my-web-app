import Link from "next/link";
import Image from "next/image";
import "@/app/gouti/landing/landing.css";

export default function NotFound() {
  return (
    <main className="gouti-landing flex min-h-screen flex-1 flex-col items-center justify-center">
      <section className="yf-hero relative flex w-full flex-1 flex-col items-center justify-center px-3.5 py-16 sm:px-8 sm:py-24">
        <div
          className="yf-hero__grain pointer-events-none absolute inset-0"
          aria-hidden
        />

        <div className="relative mx-auto flex w-full max-w-[980px] flex-col items-center justify-center text-center">
          <Link href="/" className="mb-7 sm:mb-8">
            <Image
              src="/logo-dp.svg"
              alt="Your Blueprint"
              width={48}
              height={48}
              className="h-11 w-11 sm:h-12 sm:w-12"
              priority
            />
          </Link>

          <h1 className="yf-hero__title not-found__title m-0">
            <span className="yf-hero__title-line block">
              Page Not Found!
            </span>
          </h1>

          <p className="yf-hero__sub mx-auto mt-5 max-w-[34rem] text-[15px] leading-[1.65] text-[#6B6B6B] text-balance sm:mt-6 sm:text-[17px] sm:leading-[1.7]">
            We can help with many things, but finding this page isn&apos;t one of
            them.
          </p>

          <div className="mt-7 flex w-full justify-center sm:mt-8">
            <Link
              href="/"
              className="btn-brutal btn-brutal-primary inline-flex min-h-[52px] min-w-[240px] items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black sm:min-h-[56px] sm:min-w-[280px] sm:px-10 sm:text-base"
            >
              Back home →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
