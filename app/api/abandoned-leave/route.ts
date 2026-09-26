import { after, NextResponse } from "next/server";
import {
  ABANDONED_EMAIL_1_AFTER_LEAVE_MS,
  recordAbandonedLeave,
  sendAbandonedEmail1IfStillPending,
} from "@/lib/abandoned-checkout-emails";

export const runtime = "nodejs";
export const maxDuration = 30;

async function readPublicId(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => null)) as {
      publicId?: string;
    } | null;
    return body?.publicId?.trim() || "";
  }

  const text = await request.text();
  try {
    const body = JSON.parse(text) as { publicId?: string };
    return body.publicId?.trim() || "";
  } catch {
    return new URL(request.url).searchParams.get("sid")?.trim() || "";
  }
}

export async function POST(request: Request) {
  const publicId = await readPublicId(request);
  if (!publicId) {
    return NextResponse.json({ ok: true, scheduled: false });
  }

  try {
    const row = await recordAbandonedLeave(publicId);
    if (!row) {
      return NextResponse.json({ ok: true, scheduled: false });
    }

    after(async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, ABANDONED_EMAIL_1_AFTER_LEAVE_MS),
      );
      await sendAbandonedEmail1IfStillPending(row.id);
    });

    return NextResponse.json({ ok: true, scheduled: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not record leave";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
