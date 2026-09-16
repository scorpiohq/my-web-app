"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Soft handoff after UNLOCK! — stays under the white cover, then progress.
 */
export default function CheckoutPreview2Page() {
  const router = useRouter();

  useEffect(() => {
    // Cover is already up from UNLOCK!; swap routes underneath, then progress fades in.
    const timer = window.setTimeout(() => {
      router.replace("/progress?preview=1");
    }, 140);

    return () => window.clearTimeout(timer);
  }, [router]);

  return <div className="min-h-screen bg-white" aria-hidden />;
}
