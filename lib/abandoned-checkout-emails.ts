import {
  email1Content,
  email2Content,
  email3Content,
} from "@/lib/blueprint-emails";
import { emailLogoUrl } from "@/lib/email-brand";
import { getAbandonedEmailFrom, getResend } from "@/lib/resend";
import { getAppBaseUrl } from "@/lib/submissions";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const ABANDONED_EMAIL_1_AFTER_LEAVE_MS = 15 * 1000;
export const ABANDONED_EMAIL_1_FALLBACK_MS = 30 * 60 * 1000;
export const ABANDONED_EMAIL_2_AFTER_OPEN_MS = 24 * 60 * 60 * 1000;
export const ABANDONED_EMAIL_3_AFTER_OPEN_MS = 7 * 24 * 60 * 60 * 1000;
export const DELETE_AFTER_EMAIL_3_MS = 24 * 60 * 60 * 1000;
export const DELETE_IF_NEVER_OPENED_MS = 8 * 24 * 60 * 60 * 1000;

type AbandonedWhich = 1 | 2 | 3;

type PendingRow = {
  id: number | string;
  public_id: string | null;
  name: string;
  email: string;
  created_at: string;
  abandoned_left_at: string | null;
  checkout_started_at: string | null;
  abandoned_email_1_sent_at: string | null;
  abandoned_email_1_opened_at: string | null;
  abandoned_email_2_sent_at: string | null;
  abandoned_email_2_opened_at: string | null;
  abandoned_email_3_sent_at: string | null;
};

const PENDING_SELECT =
  "id, public_id, name, email, created_at, abandoned_left_at, checkout_started_at, abandoned_email_1_sent_at, abandoned_email_1_opened_at, abandoned_email_2_sent_at, abandoned_email_2_opened_at, abandoned_email_3_sent_at";

function ms(value: string | null) {
  if (!value) return NaN;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? NaN : time;
}

function unlockUrl(name: string, publicId: string | null, baseUrl: string) {
  if (
    publicId &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      publicId,
    )
  ) {
    return `${baseUrl}/building?n=${encodeURIComponent(name)}&sid=${encodeURIComponent(publicId)}&ready=1`;
  }
  return `${baseUrl}/form`;
}

async function sendAbandonedEmail({
  to,
  name,
  which,
  ctaUrl,
  submissionId,
  timeSeed,
}: {
  to: string;
  name: string;
  which: AbandonedWhich;
  ctaUrl: string;
  submissionId: string | number;
  timeSeed: string;
}) {
  const siteUrl = getAppBaseUrl().replace(/\/$/, "");
  const logoUrl = emailLogoUrl(siteUrl);
  const content =
    which === 1
      ? email1Content(name, ctaUrl, logoUrl, siteUrl)
      : which === 2
        ? email2Content(name, ctaUrl, logoUrl, siteUrl, timeSeed)
        : email3Content(name, ctaUrl, logoUrl, siteUrl);
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
  which: AbandonedWhich,
  resendId: string | null,
) {
  const sentColumn =
    which === 1
      ? "abandoned_email_1_sent_at"
      : which === 2
        ? "abandoned_email_2_sent_at"
        : "abandoned_email_3_sent_at";
  const resendColumn =
    which === 1
      ? "abandoned_email_1_resend_id"
      : which === 2
        ? "abandoned_email_2_resend_id"
        : "abandoned_email_3_resend_id";
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
  which?: AbandonedWhich;
  openedAt?: string;
  resendEmailId?: string;
}) {
  const when = openedAt || new Date().toISOString();

  if (submissionId && which) {
    const openedColumn =
      which === 1
        ? "abandoned_email_1_opened_at"
        : which === 2
          ? "abandoned_email_2_opened_at"
          : "abandoned_email_3_opened_at";

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

  if (!resendEmailId) return;

  const lookups: Array<{
    idColumn: string;
    openedColumn: string;
  }> = [
    {
      idColumn: "abandoned_email_1_resend_id",
      openedColumn: "abandoned_email_1_opened_at",
    },
    {
      idColumn: "abandoned_email_2_resend_id",
      openedColumn: "abandoned_email_2_opened_at",
    },
    {
      idColumn: "abandoned_email_3_resend_id",
      openedColumn: "abandoned_email_3_opened_at",
    },
  ];

  for (const lookup of lookups) {
    const { data } = await supabaseAdmin
      .from("submissions")
      .select("id")
      .eq(lookup.idColumn, resendEmailId)
      .maybeSingle();

    if (data?.id) {
      await supabaseAdmin
        .from("submissions")
        .update({ [lookup.openedColumn]: when })
        .eq("id", data.id)
        .is(lookup.openedColumn, null);
      return;
    }
  }
}

export async function markCheckoutStarted(submissionId: string) {
  const { error } = await supabaseAdmin
    .from("submissions")
    .update({ checkout_started_at: new Date().toISOString() })
    .eq("id", submissionId)
    .eq("payment_status", "pending");

  if (error) {
    throw new Error(error.message);
  }
}

export async function recordAbandonedLeave(publicId: string) {
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      publicId,
    )
  ) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select(PENDING_SELECT)
    .eq("public_id", publicId)
    .eq("payment_status", "pending")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const row = data as PendingRow | null;
  if (!row || row.abandoned_email_1_sent_at || row.checkout_started_at) {
    return null;
  }

  if (!row.abandoned_left_at) {
    const { error: updateError } = await supabaseAdmin
      .from("submissions")
      .update({ abandoned_left_at: new Date().toISOString() })
      .eq("id", row.id)
      .eq("payment_status", "pending")
      .is("abandoned_left_at", null);

    if (updateError) {
      throw new Error(updateError.message);
    }
  }

  return row;
}

export async function sendAbandonedEmail1IfStillPending(
  id: string | number,
) {
  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select(PENDING_SELECT)
    .eq("id", id)
    .eq("payment_status", "pending")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const row = data as PendingRow | null;
  if (!row || row.abandoned_email_1_sent_at || row.checkout_started_at) {
    return false;
  }

  const email = row.email?.trim().toLowerCase();
  const name = row.name?.trim() || "there";
  if (!email) return false;

  const baseUrl = getAppBaseUrl().replace(/\/$/, "");
  const resendId = await sendAbandonedEmail({
    to: email,
    name,
    which: 1,
    ctaUrl: unlockUrl(name, row.public_id, baseUrl),
    submissionId: row.id,
    timeSeed: String(row.public_id || row.id),
  });
  await markEmailSent(row.id, 1, resendId);
  return true;
}

function shouldSendEmail1(row: PendingRow, now: number) {
  if (row.abandoned_email_1_sent_at) return false;

  const checkoutAt = ms(row.checkout_started_at);
  if (!Number.isNaN(checkoutAt)) {
    return now - checkoutAt >= ABANDONED_EMAIL_1_FALLBACK_MS;
  }

  const leftAt = ms(row.abandoned_left_at);
  if (!Number.isNaN(leftAt) && now - leftAt >= ABANDONED_EMAIL_1_AFTER_LEAVE_MS) {
    return true;
  }
  const createdAt = ms(row.created_at);
  return (
    !Number.isNaN(createdAt) && now - createdAt >= ABANDONED_EMAIL_1_FALLBACK_MS
  );
}

function shouldSendEmail2(row: PendingRow, now: number) {
  if (!row.abandoned_email_1_sent_at || row.abandoned_email_2_sent_at) {
    return false;
  }
  const openedAt = ms(row.abandoned_email_1_opened_at);
  return (
    !Number.isNaN(openedAt) && now - openedAt >= ABANDONED_EMAIL_2_AFTER_OPEN_MS
  );
}

function shouldSendEmail3(row: PendingRow, now: number) {
  if (!row.abandoned_email_2_sent_at || row.abandoned_email_3_sent_at) {
    return false;
  }
  const openedAt = ms(row.abandoned_email_2_opened_at);
  return (
    !Number.isNaN(openedAt) && now - openedAt >= ABANDONED_EMAIL_3_AFTER_OPEN_MS
  );
}

function shouldDelete(row: PendingRow, now: number) {
  const email3Sent = ms(row.abandoned_email_3_sent_at);
  if (
    !Number.isNaN(email3Sent) &&
    now - email3Sent >= DELETE_AFTER_EMAIL_3_MS
  ) {
    return true;
  }

  const openedEmail1 = ms(row.abandoned_email_1_opened_at);
  if (!Number.isNaN(openedEmail1)) {
    return (
      !row.abandoned_email_2_opened_at &&
      now - openedEmail1 >= DELETE_IF_NEVER_OPENED_MS
    );
  }

  const createdAt = ms(row.created_at);
  return (
    !Number.isNaN(createdAt) && now - createdAt >= DELETE_IF_NEVER_OPENED_MS
  );
}

async function deletePendingSubmission(id: string | number) {
  const { error } = await supabaseAdmin
    .from("submissions")
    .delete()
    .eq("id", id)
    .eq("payment_status", "pending");

  if (error) {
    throw new Error(error.message);
  }
}

export type AbandonedCheckoutRunResult = {
  email1Sent: number;
  email2Sent: number;
  email3Sent: number;
  deleted: number;
  skipped: number;
  errors: string[];
};

export async function processAbandonedCheckoutEmails(): Promise<AbandonedCheckoutRunResult> {
  const result: AbandonedCheckoutRunResult = {
    email1Sent: 0,
    email2Sent: 0,
    email3Sent: 0,
    deleted: 0,
    skipped: 0,
    errors: [],
  };

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select(PENDING_SELECT)
    .eq("payment_status", "pending")
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data || []) as PendingRow[];
  const now = Date.now();
  const baseUrl = getAppBaseUrl().replace(/\/$/, "");

  for (const row of rows) {
    const email = row.email?.trim().toLowerCase();
    const name = row.name?.trim() || "there";
    const ctaUrl = unlockUrl(name, row.public_id, baseUrl);
    const timeSeed = String(row.public_id || row.id);

    if (!email) {
      result.skipped += 1;
      continue;
    }

    try {
      if (shouldDelete(row, now)) {
        await deletePendingSubmission(row.id);
        result.deleted += 1;
        continue;
      }

      if (shouldSendEmail1(row, now)) {
        const resendId = await sendAbandonedEmail({
          to: email,
          name,
          which: 1,
          ctaUrl,
          submissionId: row.id,
          timeSeed,
        });
        await markEmailSent(row.id, 1, resendId);
        result.email1Sent += 1;
        continue;
      }

      if (shouldSendEmail2(row, now)) {
        const resendId = await sendAbandonedEmail({
          to: email,
          name,
          which: 2,
          ctaUrl,
          submissionId: row.id,
          timeSeed,
        });
        await markEmailSent(row.id, 2, resendId);
        result.email2Sent += 1;
        continue;
      }

      if (shouldSendEmail3(row, now)) {
        const resendId = await sendAbandonedEmail({
          to: email,
          name,
          which: 3,
          ctaUrl,
          submissionId: row.id,
          timeSeed,
        });
        await markEmailSent(row.id, 3, resendId);
        result.email3Sent += 1;
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
