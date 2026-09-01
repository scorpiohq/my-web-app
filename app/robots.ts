import type { MetadataRoute } from "next";

/** Canonical public domain for SEO (not the Vercel preview URL). */
const SITE_URL = "https://yourblueprint.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/progress",
          "/prompt",
          "/report-export",
          "/261005-",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
