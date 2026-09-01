"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSamplePreviewTrigger() {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const media = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onBreakpoint);

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-5 text-sm font-medium text-black underline underline-offset-4 transition hover:text-black/70 sm:text-base lg:hidden"
      >
        See how yours will look 👀
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            type="button"
            aria-label="Close sample preview"
            className="absolute inset-0 bg-black/20"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 flex max-h-[min(90dvh,620px)] w-full max-w-[min(92vw,300px)] flex-col border-2 border-black bg-white px-3.5 py-4 shadow-[6px_6px_0_0_#000] sm:max-w-[min(90vw,340px)] sm:px-5 sm:py-5">
            <div className="mb-3 flex shrink-0 items-start justify-between gap-3 sm:mb-4">
              <Image
                src="/logo.svg"
                alt="Your Blueprint"
                width={140}
                height={32}
                className="h-6 w-auto sm:h-7"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 shrink-0 items-center justify-center border border-black bg-white text-base leading-none text-black shadow-[2px_2px_0_0_#000] transition hover:bg-[#f8f8f8]"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <h2 id={titleId} className="sr-only">
              Sample Blueprint preview
            </h2>

            <div className="flex min-h-0 flex-1 flex-col items-center text-center">
              <div className="flex min-h-0 w-full flex-1 items-center justify-center">
                <img
                  src="/sticker-report.svg?v=2"
                  alt="Personalized Creator Blueprint sample"
                  width={2456}
                  height={3983}
                  className="mx-auto h-auto max-h-[min(48dvh,260px)] w-auto max-w-full object-contain sm:max-h-[min(52dvh,300px)]"
                />
              </div>

              <p className="mt-2.5 max-w-[240px] shrink-0 text-[10px] leading-snug text-[#6B6B6B] sm:mt-3 sm:text-[11px]">
                *This is a Sample. Yours will be built entirely around your own
                answers.
              </p>

              <Link
                href="/form"
                className="btn-brutal btn-brutal-primary mt-3 inline-flex w-full shrink-0 items-center justify-center px-4 py-2.5 text-sm font-semibold text-black sm:mt-4 sm:py-3"
                onClick={() => setOpen(false)}
              >
                Let&apos;s build yours →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
