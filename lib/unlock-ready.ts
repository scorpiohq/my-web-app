"use client";

import { useLayoutEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const UNLOCK_READY_PARAM = "ready";

const STORAGE_KEY = "yb-unlock-ready";

export function isUnlockReady(
  searchParams: { get: (name: string) => string | null },
) {
  return searchParams.get(UNLOCK_READY_PARAM) === "1";
}

function readRememberedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

/** True after this browser has already reached the unlock button for this submission. */
export function hasRememberedUnlockReady(submissionId?: string | null) {
  const id = submissionId?.trim();
  if (!id) return false;
  return readRememberedIds().includes(id);
}

export function rememberUnlockReady(submissionId?: string | null) {
  const id = submissionId?.trim();
  if (!id || typeof window === "undefined") return;
  try {
    const ids = readRememberedIds();
    if (ids.includes(id)) return;
    ids.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(-40)));
  } catch {
    // Private mode can block storage. The URL stamp still covers Back.
  }
}

/** Put ready=1 on the current address without reloading, so Back returns here finished. */
export function stampUnlockReadyUrl() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (url.searchParams.get(UNLOCK_READY_PARAM) === "1") return;
  url.searchParams.set(UNLOCK_READY_PARAM, "1");
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(window.history.state, "", next);
}

export function markUnlockSeen(submissionId?: string | null) {
  rememberUnlockReady(submissionId);
  stampUnlockReadyUrl();
}

/**
 * Finished unlock screen: `ready=1` in the URL, or this browser already
 * reached the unlock button for the submission.
 * Memory is read once. A later client-only mount (return visit) can see it.
 * The server render only trusts the URL, so hydration stays in agreement.
 */
export function useUnlockReady() {
  const searchParams = useSearchParams();
  const sid = searchParams.get("sid");
  const paramReady = isUnlockReady(searchParams);
  const [ready] = useState(
    () => paramReady || hasRememberedUnlockReady(sid),
  );

  useLayoutEffect(() => {
    if (!ready) return;
    rememberUnlockReady(sid);
    stampUnlockReadyUrl();
  }, [ready, sid]);

  return ready;
}

export function withUnlockReady(url: string) {
  const hashIndex = url.indexOf("#");
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const join = withoutHash.includes("?") ? "&" : "?";
  return `${withoutHash}${join}${UNLOCK_READY_PARAM}=1${hash}`;
}
