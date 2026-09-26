import { email4Content } from "@/lib/blueprint-emails";
import { emailLogoUrl } from "@/lib/email-brand";
import { getAbandonedEmailFrom, getResend } from "@/lib/resend";
import { getAppBaseUrl } from "@/lib/submissions";

export async function sendReportReadyEmail({
  to,
  name,
  publicId,
}: {
  to: string;
  name: string;
  publicId: string;
}) {
  const siteUrl = getAppBaseUrl().replace(/\/$/, "");
  const reportUrl = `${siteUrl}/report/${encodeURIComponent(publicId)}`;
  const content = email4Content(name, reportUrl, emailLogoUrl(siteUrl), siteUrl);

  const resend = getResend();
  const { error } = await resend.emails.send({
    from: getAbandonedEmailFrom(),
    to: [to],
    subject: content.subject,
    html: content.html,
    tags: [
      { name: "flow", value: "report_ready" },
      { name: "submission_public_id", value: publicId },
    ],
  });

  if (error) {
    throw new Error(error.message || "Resend failed to send report-ready email");
  }
}
