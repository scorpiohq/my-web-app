import { createHash, createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "yb_admin";

const SESSION_PAYLOAD = "v1:admin";

export function adminCredentials() {
  const username = process.env.ADMIN_USERNAME?.trim() ?? "";
  const code = process.env.ADMIN_CODE?.trim() ?? "";
  return { username, code, configured: Boolean(username && code) };
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(a: string, b: string) {
  return timingSafeEqual(digest(a), digest(b));
}

export function credentialsMatch(username: string, code: string) {
  const expected = adminCredentials();
  if (!expected.configured) return false;
  return (
    safeEqual(username.trim(), expected.username) &&
    safeEqual(code.trim(), expected.code)
  );
}

export function signAdminSession() {
  const { code, configured } = adminCredentials();
  if (!configured) return "";
  const mac = createHmac("sha256", code)
    .update(SESSION_PAYLOAD)
    .digest("base64url");
  return `${SESSION_PAYLOAD}.${mac}`;
}

export function isValidAdminSession(token: string | undefined) {
  if (!token || !adminCredentials().configured) return false;
  const expected = signAdminSession();
  const actual = Buffer.from(token);
  const wanted = Buffer.from(expected);
  if (!expected || actual.length !== wanted.length) return false;
  return timingSafeEqual(actual, wanted);
}
