import { NextResponse } from "next/server";
import { processAbandonedCheckoutEmails } from "@/lib/abandoned-checkout-emails";

export const runtime = "nodejs";
export const maxDuration = 60;

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;

  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) return true;

  // Vercel Cron also sends this header on scheduled invocations.
  const cronHeader = request.headers.get("x-vercel-cron");
  if (cronHeader === "1" && authHeader === `Bearer ${secret}`) return true;

  return false;
}

async function handle(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await processAbandonedCheckoutEmails();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Abandoned checkout cron failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
