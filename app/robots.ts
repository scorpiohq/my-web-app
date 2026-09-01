import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")
      : "https://yourblueprint.in";

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
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
