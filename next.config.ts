import type { NextConfig } from "next";
import { GO_LINKS } from "./lib/go-links";

const nextConfig: NextConfig = {
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  async redirects() {
    return GO_LINKS.map((link) => ({
      source: `/go/${link.slug}`,
      destination: `/?utm_source=${encodeURIComponent(link.utm_source)}&utm_medium=${encodeURIComponent(link.utm_medium)}&utm_campaign=${encodeURIComponent(link.utm_campaign)}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
