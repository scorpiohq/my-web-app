"use client";

import { useEffect } from "react";
import { captureUtmsFromUrl } from "@/lib/analytics";

/** Saves first-touch UTMs once so purchase events keep channel context. */
export default function UtmCapture() {
  useEffect(() => {
    captureUtmsFromUrl();
  }, []);

  return null;
}
