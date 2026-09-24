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
    return [
      ...GO_LINKS.map((link) => ({
        source: `/go/${link.slug}`,
        destination: `/?utm_source=${encodeURIComponent(link.utm_source)}&utm_medium=${encodeURIComponent(link.utm_medium)}&utm_campaign=${encodeURIComponent(link.utm_campaign)}`,
        permanent: false,
      })),
      {
        source: "/261005-landing",
        destination: "/",
        permanent: true,
      },
      {
        source: "/261005-gameplan",
        destination: "/",
        permanent: true,
      },
      {
        source: "/261005-story-section",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gouti/landing",
        destination: "/",
        permanent: false,
      },
      {
        source: "/gouti/form",
        destination: "/form",
        permanent: false,
      },
      {
        source: "/gouti/building",
        destination: "/building",
        permanent: false,
      },
      {
        source: "/gouti/report-animation",
        destination: "/animation",
        permanent: false,
      },
      {
        source: "/261005-checkout-preview",
        destination: "/gouti/checkout-preview",
        permanent: true,
      },
      {
        source: "/261005-report-preview",
        destination: "/gouti/report-preview",
        permanent: true,
      },
      {
        source: "/gouti/gameplan",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gouti/gameplan-waitlist",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gouti/report-animation2",
        destination: "/animation",
        permanent: true,
      },
      {
        source: "/gouti/report-animation3",
        destination: "/animation",
        permanent: true,
      },
      {
        source: "/gouti/checkout-preview2",
        destination: "/gouti/checkout-preview",
        permanent: true,
      },
      {
        source: "/gouti/landing2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gouti/story-section",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
