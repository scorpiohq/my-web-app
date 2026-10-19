import Script from "next/script";

const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim() ||
  "547cf885-cadb-418d-ba1a-ff5f5f0b305e";

export default function UmamiAnalytics() {
  if (!UMAMI_WEBSITE_ID) {
    return null;
  }

  return (
    <Script
      defer
      src="https://cloud.umami.is/script.js"
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}
