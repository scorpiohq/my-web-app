export const UNLOCK_READY_PARAM = "ready";

export function isUnlockReady(
  searchParams: { get: (name: string) => string | null },
) {
  return searchParams.get(UNLOCK_READY_PARAM) === "1";
}

export function withUnlockReady(url: string) {
  const hashIndex = url.indexOf("#");
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const join = withoutHash.includes("?") ? "&" : "?";
  return `${withoutHash}${join}${UNLOCK_READY_PARAM}=1${hash}`;
}
