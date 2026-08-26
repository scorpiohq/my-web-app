export type GoLink = {
  /** Short path: /go/{slug} */
  slug: string;
  /** Friendly name for your reference */
  name: string;
  /** Where you should paste this short link */
  where: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
};

/** Short branded links → same UTM tracking as the long URLs. */
export const GO_LINKS: GoLink[] = [
  {
    slug: "threads",
    name: "Threads promo",
    where: "Threads posts / replies promoting Blueprint",
    utm_source: "threads",
    utm_medium: "social",
    utm_campaign: "launch",
  },
  {
    slug: "threads-brand",
    name: "Threads brand page",
    where: "Threads brand profile / bio link",
    utm_source: "threads",
    utm_medium: "social",
    utm_campaign: "brand_page",
  },
  {
    slug: "bio",
    name: "Instagram bio",
    where: "Instagram profile bio link only",
    utm_source: "link_in_bio",
    utm_medium: "social",
    utm_campaign: "profile",
  },
  {
    slug: "ig",
    name: "Instagram brand page",
    where: "Instagram brand posts / captions / highlights CTA",
    utm_source: "instagram",
    utm_medium: "social",
    utm_campaign: "brand_page",
  },
  {
    slug: "story",
    name: "Instagram story promo",
    where: "Instagram Stories link stickers",
    utm_source: "instagram",
    utm_medium: "story",
    utm_campaign: "promo1",
  },
  {
    slug: "email",
    name: "Email",
    where: "Email CTAs (abandoned, broadcasts, nurture)",
    utm_source: "email",
    utm_medium: "email",
    utm_campaign: "abandoned",
  },
  {
    slug: "other",
    name: "Universal / other",
    where: "Anywhere else (Discord, WhatsApp, Notion, random shares)",
    utm_source: "other",
    utm_medium: "referral",
    utm_campaign: "universal",
  },
];

export function getGoLink(slug: string): GoLink | undefined {
  return GO_LINKS.find((link) => link.slug === slug);
}

export function buildGoDestination(
  link: GoLink,
  origin: string,
): string {
  const url = new URL("/", origin);
  url.searchParams.set("utm_source", link.utm_source);
  url.searchParams.set("utm_medium", link.utm_medium);
  url.searchParams.set("utm_campaign", link.utm_campaign);
  return url.toString();
}
