import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getGameplanVariantId } from "@/lib/lemonsqueezy";
import {
  markSubmissionPaid,
  triggerReportGeneration,
} from "@/lib/submissions";

export const runtime = "nodejs";

function verifySignature(rawBody: string, signatureHeader: string | null) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("LEMONSQUEEZY_WEBHOOK_SECRET is not set");
  }

  if (!signatureHeader) {
    return false;
  }

  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(signatureHeader, "utf8");

  if (digest.length !== signature.length) {
    return false;
  }

  return crypto.timingSafeEqual(digest, signature);
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-signature");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: {
    meta?: {
      event_name?: string;
      custom_data?: {
        submission_id?: string;
        product?: string;
      };
    };
    data?: {
      attributes?: {
        first_order_item?: {
          variant_id?: number | string;
        };
      };
    };
  };

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = payload.meta?.event_name;
  if (eventName !== "order_created") {
    return NextResponse.json({ received: true });
  }

  const variantId = Number(
    payload.data?.attributes?.first_order_item?.variant_id,
  );
  const gameplanVariantId = getGameplanVariantId();
  const isGameplan =
    payload.meta?.custom_data?.product === "gameplan" ||
    (gameplanVariantId != null && variantId === gameplanVariantId);

  if (isGameplan) {
    return NextResponse.json({ received: true });
  }

  const submissionId = payload.meta?.custom_data?.submission_id;
  if (!submissionId) {
    return NextResponse.json(
      { error: "Missing submission_id in webhook custom data" },
      { status: 400 },
    );
  }

  try {
    await markSubmissionPaid(submissionId);
    triggerReportGeneration(submissionId);
    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update submission";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
