import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCredentials,
  credentialsMatch,
  signAdminSession,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  if (!adminCredentials().configured) {
    return NextResponse.json(
      { error: "Admin login is not set up yet." },
      { status: 503 },
    );
  }

  let body: { username?: string; code?: string };
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  if (!credentialsMatch(String(body.username ?? ""), String(body.code ?? ""))) {
    return NextResponse.json(
      { error: "That username or code is wrong." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, signAdminSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
