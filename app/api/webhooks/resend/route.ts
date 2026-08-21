import { NextResponse } from "next/server";
import { Resend } from "resend";
import { markAbandonedEmailOpened } from "@/lib/abandoned-checkout-emails";

export const runtime = "nodejs";

type ResendOpenedEvent = {
  type?: string;
  created_at?: string;
  data?: {
    email_id?: string;
    tags?: Record<string, string> | Array<{ name: string; value: string }>;
  };
};

function tagsToRecord(
  tags: ResendOpenedEvent["data"] extends { tags?: infer T } ? T : unknown,
): Record<string, string> {
  if (!tags) return {};
  if (Array.isArray(tags)) {
    return Object.fromEntries(
      tags.map((tag) => [tag.name, tag.value]).filter(([k]) => Boolean(k)),
    );
  }
  if (typeof tags === "object") {
    return tags as Record<string, string>;
  }
  return {};
}

export async function POST(request: Request) {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "RESEND_WEBHOOK_SECRET is not set" },
      { status: 500 },
    );
  }

  const payload = await request.text();
  const resend = new Resend(process.env.RESEND_API_KEY?.trim());

  let event: ResendOpenedEvent;
  try {
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get("svix-id") ?? "",
        timestamp: request.headers.get("svix-timestamp") ?? "",
        signature: request.headers.get("svix-signature") ?? "",
      },
      webhookSecret,
    }) as ResendOpenedEvent;
  } catch {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  if (event.type !== "email.opened") {
    return NextResponse.json({ received: true });
  }

  const tags = tagsToRecord(event.data?.tags);
  const whichRaw = tags.which;
  const which =
    whichRaw === "1" || whichRaw === "2" ? (Number(whichRaw) as 1 | 2) : undefined;
  const submissionId = tags.submission_id;
  const resendEmailId = event.data?.email_id;

  try {
    await markAbandonedEmailOpened({
      submissionId,
      which,
      openedAt: event.created_at,
      resendEmailId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to record open";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
