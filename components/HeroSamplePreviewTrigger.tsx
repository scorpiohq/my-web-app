"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import HeroReportPreview from "@/components/HeroReportPreview";

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
        See what you&apos;ll get 👀
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <button
            type="button"
            aria-label="Close sample preview"
            className="absolute inset-0 bg-black/15 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-10 w-full max-w-[340px] rounded-2xl bg-white px-5 pb-6 pt-8 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:max-w-[440px] sm:px-8 sm:pb-8 sm:pt-10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-lg leading-none text-black shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition hover:bg-[#f8f8f8]"
              aria-label="Close"
            >
              ×
            </button>

            <h2 id={titleId} className="sr-only">
              Sample Blueprint preview
            </h2>

            <div className="flex flex-col items-center gap-5 sm:gap-6">
              <HeroReportPreview rotated={false} size="modal" />

              <Link
                href="/form"
                className="btn-brutal btn-brutal-primary inline-block min-w-[180px] px-8 py-3.5 text-sm font-semibold text-black"
                onClick={() => setOpen(false)}
              >
                Get your Blueprint →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
