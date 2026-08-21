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

const EMAIL_FONT =
  "'Avenir Next',Nunito,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'";
const EMAIL_TEXT =
  `font-family:${EMAIL_FONT};font-size:17px;line-height:28px;text-align:left;color:#030212`;
const EMAIL_MUTED =
  `font-family:${EMAIL_FONT};font-size:15px;line-height:24px;text-align:left;color:#6b6b78`;

function brandedEmailHtml({
  preview,
  logoUrl,
  bodyHtml,
  siteUrl,
}: {
  preview: string;
  logoUrl: string;
  bodyHtml: string;
  siteUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
  <title>${escapeHtml(preview)}</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;${EMAIL_TEXT}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;">
    <tr>
      <td align="center" style="padding:28px 20px 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding:0 0 28px 0;">
              <a href="${escapeHtml(siteUrl)}" style="text-decoration:none;">
                <img src="${escapeHtml(logoUrl)}" alt="Your Blueprint" width="160" style="display:block;width:160px;max-width:70%;height:auto;border:0;" />
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:0;${EMAIL_TEXT}">
              ${bodyHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(label: string, url: string) {
  return `<a href="${escapeHtml(url)}" style="display:inline-block;background:#FFC940;color:#000000;border:2px solid #000000;box-shadow:4px 4px 0 #000000;padding:12px 18px;font-family:${EMAIL_FONT};font-size:16px;font-weight:700;line-height:1.2;text-decoration:none;">${escapeHtml(label)}</a>`;
}

function email1Content(name: string, ctaUrl: string, logoUrl: string, siteUrl: string) {
  const who = firstName(name);
  const p = `margin:0 0 18px 0;${EMAIL_TEXT}`;
  return {
    subject: `Hey ${who}, Your gift is waiting…`,
    html: brandedEmailHtml({
      preview:
        "You made it through all 18 questions. Checkout to get your Blueprint — and a free gift.",
      logoUrl,
      siteUrl,
      bodyHtml: `
        <p style="${p}">Hey ${escapeHtml(who)},</p>
        <p style="${p}">You made it through all 18 questions. Most people don't.</p>
        <p style="${p}">Here's the thing:</p>
        <p style="${p}">The moment you checkout, you don't just get your Blueprint - you get a gift too.</p>
        <p style="${p}">A 1-page PDF, made specifically to help you turn your Blueprint into an actionable next step.</p>
        <p style="${p}">That's free, by the way. No extra charges.</p>
        <p style="margin:0 0 24px 0;${EMAIL_TEXT}">Your answers are saved. Nothing's lost. You're just a few minutes from having it in your hands.</p>
        <p style="margin:0 0 24px 0;">${ctaButton("Checkout & Get Your Blueprint →", ctaUrl)}</p>
        <p style="${p}">P.S. It will only take 10 seconds.</p>
        <p style="margin:0;${EMAIL_TEXT}">- Andy, <span style="${EMAIL_MUTED}">Founder &amp; Creator</span></p>
      `,
    }),
  };
}

function email2Content(name: string, ctaUrl: string, logoUrl: string, siteUrl: string) {
  const who = firstName(name);
  const p = `margin:0 0 18px 0;${EMAIL_TEXT}`;
  return {
    subject: `${who}, What you're about to get`,
    html: brandedEmailHtml({
      preview:
        "Your Blueprint is saved and waiting — identity, strengths, blockers, and your starting move.",
      logoUrl,
      siteUrl,
      bodyHtml: `
        <p style="${p}">Hey ${escapeHtml(who)},</p>
        <p style="${p}">Imagine this for a second.</p>
        <p style="${p}">You open your Blueprint. At the top, in your name, is your identity - not a vague label, but something specific enough that you immediately recognize yourself in it.</p>
        <p style="${p}">Below it, the reasons it fits you, pulled directly from your own interests and passions, not generic advice that could never work for you.</p>
        <p style="${p}">Then your strengths, the edge you already have, either you're not aware of yet, or maybe ignoring it.</p>
        <p style="${p}">Then the things that have been holding you back since ages, named clearly, because if I'm not honest with you about this, you'll never see it clearly enough to fix it.</p>
        <p style="${p}">And then your starting move, not generic advice, but the one that actually moves you from exactly where you are.</p>
        <p style="margin:0 0 24px 0;${EMAIL_TEXT}">That's what's sitting there, saved, waiting on one click.</p>
        <p style="margin:0 0 24px 0;">${ctaButton("Access Your Blueprint →", ctaUrl)}</p>
        <p style="${p}">P.S. Every day, many people are getting their blueprint and finally starting. You could be one of them today.</p>
        <p style="margin:0;${EMAIL_TEXT}">— Andy, <span style="${EMAIL_MUTED}">Founder &amp; Creator</span></p>
      `,
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
  const siteUrl = getAppBaseUrl().replace(/\/$/, "");
  const logoUrl = `${siteUrl}/logo-email.png`;
  const content =
    which === 1
      ? email1Content(name, ctaUrl, logoUrl, siteUrl)
      : email2Content(name, ctaUrl, logoUrl, siteUrl);
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
