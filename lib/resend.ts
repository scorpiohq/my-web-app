import { Resend } from "resend";

let client: Resend | null = null;

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  if (!client) {
    client = new Resend(apiKey);
  }

  return client;
}

export function getAbandonedEmailFrom() {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Andy at Your Blueprint <andy@yourblueprint.in>"
  );
}
