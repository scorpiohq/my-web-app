import {
  blueprintAnswerTime,
  brandedEmailHtml,
  ctaButton,
  EMAIL_MUTED,
  EMAIL_TEXT,
  emailGreeting,
  emailLogoUrl,
  emailSignoff,
  highlightHtml,
} from "@/lib/email-brand";

export type BlueprintEmailId = 1 | 2 | 3 | 4;

export type BlueprintEmailContent = {
  id: BlueprintEmailId;
  label: string;
  subject: string;
  preview: string;
  html: string;
};

const P = `margin:0 0 18px 0;${EMAIL_TEXT}`;
const P_SPACED = `margin:0 0 28px 0;${EMAIL_TEXT}`;

function letter({
  preview,
  logoUrl,
  siteUrl,
  name,
  paragraphs,
  cta,
  afterCta,
}: {
  preview: string;
  logoUrl: string;
  siteUrl: string;
  name: string;
  paragraphs: string[];
  cta: { label: string; url: string };
  afterCta?: string;
}) {
  const body = [
    `<p style="${P_SPACED}">${emailGreeting(name)}</p>`,
    ...paragraphs.map((html) => `<p style="${P}">${html}</p>`),
    `<p style="margin:28px 0;">${ctaButton(cta.label, cta.url)}</p>`,
    afterCta
      ? `<p style="margin:0 0 28px 0;${EMAIL_MUTED}">${afterCta}</p>`
      : "",
    `<p style="margin:0;${EMAIL_TEXT}">${emailSignoff()}</p>`,
  ].join("\n");

  return brandedEmailHtml({
    preview,
    logoUrl,
    siteUrl,
    bodyHtml: body,
  });
}

export function email1Content(
  name: string,
  ctaUrl: string,
  logoUrl: string,
  siteUrl: string,
): BlueprintEmailContent {
  return {
    id: 1,
    label: "Email 1 — left the page",
    subject: "Your Blueprint's already built.",
    preview: "You just haven't unlocked it yet.",
    html: letter({
      preview: "You just haven't unlocked it yet.",
      logoUrl,
      siteUrl,
      name,
      paragraphs: [
        "Your Blueprint's done. Built from your answers, for you.",
        "It's just sitting there, ready.",
      ],
      cta: { label: "Unlock My Blueprint →", url: ctaUrl },
    }),
  };
}

export function email2Content(
  name: string,
  ctaUrl: string,
  logoUrl: string,
  siteUrl: string,
  timeSeed: string,
): BlueprintEmailContent {
  const time = blueprintAnswerTime(timeSeed);
  return {
    id: 2,
    label: "Email 2 — opened email 1",
    subject: "Still there. Still yours.",
    preview:
      "Your Blueprint hasn't gone anywhere, but here's a reason to grab it now.",
    html: letter({
      preview:
        "Your Blueprint hasn't gone anywhere, but here's a reason to grab it now.",
      logoUrl,
      siteUrl,
      name,
      paragraphs: [
        "Your Blueprint's still built and waiting for you to unlock.",
        "It wasn't built for anyone else. It was built for you.",
        `You wanted a real starting point, that's why you spent almost ${highlightHtml(`${time} minutes`)} answering questions so that your blueprint get builds the best.`,
        "Don't let that time go to waste now.",
      ],
      cta: { label: "Unlock My Blueprint →", url: ctaUrl },
    }),
  };
}

export function email3Content(
  name: string,
  ctaUrl: string,
  logoUrl: string,
  siteUrl: string,
): BlueprintEmailContent {
  return {
    id: 3,
    label: "Email 3 — last call",
    subject: "Your Blueprint gets deleted tomorrow.",
    preview: `Last chance — don't let this be another "I'll get to it."`,
    html: letter({
      preview: `Last chance — don't let this be another "I'll get to it."`,
      logoUrl,
      siteUrl,
      name,
      paragraphs: [
        "You started this because you wanted to actually begin. That's why you answered 18 questions in the first place.",
        `Somewhere between then and now, it became another tab you didn't get back to. That's fair — it happens. But it's also exactly the pattern you were trying to break.`,
        "You wanted to start, and wanted clarity to take that first step.",
        "We only keep unclaimed Blueprints for 7 days. Tomorrow, yours gets deleted — for good.",
        "Last call. If you still want it, now's the time.",
      ],
      cta: { label: "Unlock My Blueprint →", url: ctaUrl },
      afterCta: "This won't work after 24 hours.",
    }),
  };
}

export function email4Content(
  name: string,
  ctaUrl: string,
  logoUrl: string,
  siteUrl: string,
): BlueprintEmailContent {
  return {
    id: 4,
    label: "Email 4 — paid delivery",
    subject: "You're in.",
    preview: "Your Blueprint is ready. Let's get you started.",
    html: letter({
      preview: "Your Blueprint is ready. Let's get you started.",
      logoUrl,
      siteUrl,
      name,
      paragraphs: ["Payment's done. Your Blueprint is here."],
      cta: { label: "See My Blueprint →", url: ctaUrl },
    }),
  };
}

export function buildBlueprintEmail(
  id: BlueprintEmailId,
  {
    name,
    ctaUrl,
    siteUrl,
    timeSeed,
  }: {
    name: string;
    ctaUrl: string;
    siteUrl: string;
    timeSeed?: string;
  },
): BlueprintEmailContent {
  const logoUrl = emailLogoUrl(siteUrl);
  if (id === 1) return email1Content(name, ctaUrl, logoUrl, siteUrl);
  if (id === 2) {
    return email2Content(
      name,
      ctaUrl,
      logoUrl,
      siteUrl,
      timeSeed || name,
    );
  }
  if (id === 3) return email3Content(name, ctaUrl, logoUrl, siteUrl);
  return email4Content(name, ctaUrl, logoUrl, siteUrl);
}

export function previewBlueprintEmails(siteUrl = ""): BlueprintEmailContent[] {
  const origin = siteUrl || "";
  const name = "Sam";
  const unlock = `${origin}/building?n=Sam&sid=preview&ready=1`;
  const report = `${origin}/report/preview`;
  return [
    buildBlueprintEmail(1, { name, ctaUrl: unlock, siteUrl: origin }),
    buildBlueprintEmail(2, {
      name,
      ctaUrl: unlock,
      siteUrl: origin,
      timeSeed: "preview-sam",
    }),
    buildBlueprintEmail(3, { name, ctaUrl: unlock, siteUrl: origin }),
    buildBlueprintEmail(4, { name, ctaUrl: report, siteUrl: origin }),
  ];
}
