"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutTransition from "@/components/CheckoutTransition";

export default function CheckoutPreviewPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      router.push("/progress?preview=1");
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [router]);

  return <CheckoutTransition />;
}
