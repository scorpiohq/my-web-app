"use client";

import { useEffect } from "react";
import { clearFormDraft } from "@/lib/form-draft";

/** Clears saved form answers after a successful payment return. */
export default function ClearFormDraftOnMount() {
  useEffect(() => {
    clearFormDraft();
  }, []);

  return null;
}
