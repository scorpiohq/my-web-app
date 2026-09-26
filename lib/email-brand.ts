export function firstName(fullName: string) {
  const part = fullName.trim().split(/\s+/)[0];
  return part || "there";
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const EMAIL_FONT =
  "'DM Sans',Arial,Helvetica,sans-serif";
export const EMAIL_TEXT =
  `font-family:${EMAIL_FONT};font-size:17px;line-height:28px;text-align:left;color:#121212`;
export const EMAIL_MUTED =
  `font-family:${EMAIL_FONT};font-size:15px;line-height:24px;text-align:left;color:#6b6b78`;

export function emailLogoUrl(siteUrl: string) {
  return `${siteUrl.replace(/\/$/, "")}/logo.svg`;
}

export function highlightHtml(text: string) {
  return `<span style="background:#f2c94c;color:#121212;font-weight:700;padding:0.08em 0.22em 0.1em;border-radius:0.12em;box-shadow:0.05em 0 0 #f2c94c,-0.05em 0 0 #f2c94c">${escapeHtml(text)}</span>`;
}

export function brandedEmailHtml({
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
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  <title>${escapeHtml(preview)}</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;${EMAIL_TEXT}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;">
    <tr>
      <td align="center" style="padding:32px 24px 48px 24px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding:0 0 32px 0;">
              <a href="${escapeHtml(siteUrl)}" style="text-decoration:none;">
                <img src="${escapeHtml(logoUrl)}" alt="Your Blueprint" width="220" style="display:block;width:220px;max-width:80%;height:auto;border:0;" />
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

export function ctaButton(label: string, url: string) {
  return `<a href="${escapeHtml(url)}" style="display:inline-block;background:#ffc940;color:#000000;border:2px solid #000000;box-shadow:4px 4px 0 #000000;padding:13px 20px;font-family:${EMAIL_FONT};font-size:16px;font-weight:700;line-height:1.2;text-decoration:none;">${escapeHtml(label)}</a>`;
}

export function emailGreeting(name: string) {
  return `Hey ${escapeHtml(firstName(name))},`;
}

export function emailSignoff() {
  return `— Andy (founder)`;
}

/** Stable 3:10–4:30 so the same person always sees the same time. */
export function blueprintAnswerTime(seed: string): string {
  const minSeconds = 3 * 60 + 10;
  const maxSeconds = 4 * 60 + 30;
  let hash = 0;
  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  const seconds = minSeconds + (hash % (maxSeconds - minSeconds + 1));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}
