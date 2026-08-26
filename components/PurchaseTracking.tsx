"use client";

import { useEffect } from "react";
import { trackPurchase, type PurchaseProduct } from "@/lib/analytics";

export default function PurchaseTracking({
  product,
  publicId,
}: {
  product: PurchaseProduct;
  publicId?: string;
}) {
  useEffect(() => {
    const id = publicId?.trim();
    if (!id) return;

    const transactionId = `${product}_${id}`;

    // gtag may load slightly after hydrate — retry briefly
    let attempts = 0;
    const maxAttempts = 20;

    const tryTrack = () => {
      attempts += 1;
      const ready =
        typeof window.gtag === "function" || Array.isArray(window.dataLayer);

      if (ready) {
        trackPurchase({ product, transactionId });
        return;
      }

      if (attempts < maxAttempts) {
        window.setTimeout(tryTrack, 150);
      } else {
        // Still queue via dataLayer even if gtag never appears
        trackPurchase({ product, transactionId });
      }
    };

    tryTrack();
  }, [product, publicId]);

  return null;
}
