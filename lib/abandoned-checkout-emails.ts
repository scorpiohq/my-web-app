import { getAbandonedEmailFrom, getResend } from "@/lib/resend";
import { getAppBaseUrl } from "@/lib/submissions";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const ABANDONED_EMAIL_1_AFTER_MS = 10 * 60 * 1000; // 10 minutes after pending
export const ABANDONED_EMAIL_2_AFTER_OPEN_MS = 20 * 60 * 60 * 1000; // 20 hours after email 1 open

type PendingRow = {
  id: number | string;
  name: string;
  email: string;
  created_at: string;
  abandoned_email_1_sent_at: string | null;
  abandoned_email_1_opened_at: string | null;
  abandoned_email_2_sent_at: string | null;
};

function firstName(fullName: string) {
  const part = fullName.trim().split(/\s+/)[0];
  return part || "there";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function brandedEmailHtml({
  preview,
  greeting,
  bodyHtml,
  ctaLabel,
  ctaUrl,
}: {
  preview: string;
  greeting: string;
  bodyHtml: string;
  ctaLabel: string;
  ctaUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(preview)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#111;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:2px solid #000000;box-shadow:6px 6px 0 #000000;">
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#111;">Your Blueprint</p>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 28px 8px 28px;">
              <h1 style="margin:0;font-size:24px;line-height:1.3;font-weight:700;color:#111;">${escapeHtml(greeting)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 20px 28px;font-size:16px;line-height:1.55;color:#333;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px 28px;">
              <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;background:#FFC940;color:#000000;border:2px solid #000000;box-shadow:4px 4px 0 #000000;padding:12px 20px;font-size:15px;font-weight:700;text-decoration:none;">
                ${escapeHtml(ctaLabel)}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px 28px;font-size:13px;line-height:1.5;color:#777;">
              If you already checked out, you can ignore this — your Blueprint is on its way.
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:12px;color:#999;">yourblueprint.in</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function email1Content(name: string, ctaUrl: string) {
  const who = firstName(name);
  return {
    subject: `${who}, your answers are saved — finish checkout`,
    html: brandedEmailHtml({
      preview:
        "Your Blueprint answers are saved. Finish checkout when you're ready.",
      greeting: `Hey ${who},`,
      bodyHtml: `
        <p style="margin:0 0 12px 0;">You started your Blueprint — your answers are already saved.</p>
        <p style="margin:0 0 12px 0;">You just need to finish checkout to unlock your personalized report.</p>
        <p style="margin:0;">It only takes a minute.</p>
      `,
      ctaLabel: "Finish checkout →",
      ctaUrl,
    }),
  };
}

function email2Content(name: string, ctaUrl: string) {
  const who = firstName(name);
  return {
    subject: `${who}, waiting won't make the path clearer`,
    html: brandedEmailHtml({
      preview: "Another day of waiting won't clarify your next step.",
      greeting: `Hey ${who},`,
      bodyHtml: `
        <p style="margin:0 0 12px 0;">Your answers are still saved — but your Blueprint unlocks after checkout.</p>
        <p style="margin:0 0 12px 0;">Another day of waiting for the “perfect time” usually just means one more day without a clear plan.</p>
        <p style="margin:0;">Finish checkout when you're ready. We'll take it from there.</p>
      `,
      ctaLabel: "Get my Blueprint →",
      ctaUrl,
    }),
  };
}

async function sendAbandonedEmail({
  to,
  name,
  which,
  ctaUrl,
  submissionId,
}: {
  to: string;
  name: string;
  which: 1 | 2;
  ctaUrl: string;
  submissionId: string | number;
}) {
  const content = which === 1 ? email1Content(name, ctaUrl) : email2Content(name, ctaUrl);
  const resend = getResend();

  const { data, error } = await resend.emails.send({
    from: getAbandonedEmailFrom(),
    to: [to],
    subject: content.subject,
    html: content.html,
    tags: [
      { name: "flow", value: "abandoned_checkout" },
      { name: "which", value: String(which) },
      { name: "submission_id", value: String(submissionId) },
    ],
  });

  if (error) {
    throw new Error(error.message || "Resend failed to send email");
  }

  return data?.id ?? null;
}

async function markEmailSent(
  id: string | number,
  which: 1 | 2,
  resendId: string | null,
) {
  const sentColumn =
    which === 1 ? "abandoned_email_1_sent_at" : "abandoned_email_2_sent_at";
  const resendColumn =
    which === 1 ? "abandoned_email_1_resend_id" : "abandoned_email_2_resend_id";
  const now = new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("submissions")
    .update({
      [sentColumn]: now,
      ...(resendId ? { [resendColumn]: resendId } : {}),
    })
    .eq("id", id)
    .eq("payment_status", "pending")
    .is(sentColumn, null);

  if (error) {
    throw new Error(error.message);
  }
}

export async function markAbandonedEmailOpened({
  submissionId,
  which,
  openedAt,
  resendEmailId,
}: {
  submissionId?: string;
  which?: 1 | 2;
  openedAt?: string;
  resendEmailId?: string;
}) {
  const when = openedAt || new Date().toISOString();

  if (submissionId && which) {
    const openedColumn =
      which === 1
        ? "abandoned_email_1_opened_at"
        : "abandoned_email_2_opened_at";

    const { error } = await supabaseAdmin
      .from("submissions")
      .update({ [openedColumn]: when })
      .eq("id", submissionId)
      .is(openedColumn, null);

    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  if (resendEmailId) {
    const { data: byOne } = await supabaseAdmin
      .from("submissions")
      .select("id")
      .eq("abandoned_email_1_resend_id", resendEmailId)
      .maybeSingle();

    if (byOne?.id) {
      await supabaseAdmin
        .from("submissions")
        .update({ abandoned_email_1_opened_at: when })
        .eq("id", byOne.id)
        .is("abandoned_email_1_opened_at", null);
      return;
    }

    const { data: byTwo } = await supabaseAdmin
      .from("submissions")
      .select("id")
      .eq("abandoned_email_2_resend_id", resendEmailId)
      .maybeSingle();

    if (byTwo?.id) {
      await supabaseAdmin
        .from("submissions")
        .update({ abandoned_email_2_opened_at: when })
        .eq("id", byTwo.id)
        .is("abandoned_email_2_opened_at", null);
    }
  }
}

export type AbandonedCheckoutRunResult = {
  email1Sent: number;
  email2Sent: number;
  skipped: number;
  errors: string[];
};

export async function processAbandonedCheckoutEmails(): Promise<AbandonedCheckoutRunResult> {
  const result: AbandonedCheckoutRunResult = {
    email1Sent: 0,
    email2Sent: 0,
    skipped: 0,
    errors: [],
  };

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select(
      "id, name, email, created_at, abandoned_email_1_sent_at, abandoned_email_1_opened_at, abandoned_email_2_sent_at",
    )
    .eq("payment_status", "pending")
    .order("created_at", { ascending: true })
    .limit(100);

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data || []) as PendingRow[];
  const now = Date.now();
  const baseUrl = getAppBaseUrl().replace(/\/$/, "");
  const ctaUrl = `${baseUrl}/form`;

  for (const row of rows) {
    const createdAt = new Date(row.created_at).getTime();
    if (Number.isNaN(createdAt)) {
      result.skipped += 1;
      continue;
    }

    const ageMs = now - createdAt;
    const email = row.email?.trim().toLowerCase();
    const name = row.name?.trim() || "there";

    if (!email) {
      result.skipped += 1;
      continue;
    }

    try {
      if (!row.abandoned_email_1_sent_at && ageMs >= ABANDONED_EMAIL_1_AFTER_MS) {
        const resendId = await sendAbandonedEmail({
          to: email,
          name,
          which: 1,
          ctaUrl,
          submissionId: row.id,
        });
        await markEmailSent(row.id, 1, resendId);
        result.email1Sent += 1;
        continue;
      }

      const openedAtMs = row.abandoned_email_1_opened_at
        ? new Date(row.abandoned_email_1_opened_at).getTime()
        : NaN;

      if (
        row.abandoned_email_1_sent_at &&
        row.abandoned_email_1_opened_at &&
        !Number.isNaN(openedAtMs) &&
        !row.abandoned_email_2_sent_at &&
        now - openedAtMs >= ABANDONED_EMAIL_2_AFTER_OPEN_MS
      ) {
        const resendId = await sendAbandonedEmail({
          to: email,
          name,
          which: 2,
          ctaUrl,
          submissionId: row.id,
        });
        await markEmailSent(row.id, 2, resendId);
        result.email2Sent += 1;
        continue;
      }

      result.skipped += 1;
    } catch (err) {
      result.errors.push(
        `id=${row.id}: ${err instanceof Error ? err.message : "unknown error"}`,
      );
    }
  }

  return result;
}
