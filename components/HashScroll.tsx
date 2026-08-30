"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls to the URL hash after client navigations (e.g. /reviews → /#pricing).
 * Next.js App Router often lands on the page without scrolling to the anchor.
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (!el) return;

      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Wait a tick so the destination page has rendered
    const t = window.setTimeout(scrollToHash, 50);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  return null;
}
