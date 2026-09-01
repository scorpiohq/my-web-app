import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bebas_Neue, Geist, Geist_Mono, Roboto } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import HashScroll from "@/components/HashScroll";
import UtmCapture from "@/components/UtmCapture";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-hero",
  weight: "400",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "500"],
});

const fuzzyBubbles = localFont({
  src: "../public/FuzzyBubbles-Regular.ttf",
  variable: "--font-fuzzy",
  weight: "400",
  display: "swap",
});

const appleGaramond = localFont({
  src: [
    {
      path: "../public/AppleGaramond.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/AppleGaramond-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-garamond",
  display: "swap",
});

const bethanyElingston = localFont({
  src: "../public/Bethany Elingston.otf",
  variable: "--font-bethany",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")
      : "https://yourblueprint.in",
  ),
  title: {
    default: "Your Blueprint | Personalized Social Media Starting Plan",
    template: "%s | Your Blueprint",
  },
  description:
    "Answer 18 simple questions and get a personalized Blueprint that tells you exactly where to start on social media — built around your goals, interests, and situation.",
  applicationName: "Your Blueprint",
  icons: {
    icon: "/logo-dp.svg",
    apple: "/logo-dp.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yourblueprint.in",
    siteName: "Your Blueprint",
    title: "Your Blueprint | Personalized Social Media Starting Plan",
    description:
      "Answer 18 simple questions and get a personalized Blueprint that tells you exactly where to start on social media — built around your goals, interests, and situation.",
    images: [
      {
        url: "https://yourblueprint.in/og-image.png",
        width: 1230,
        height: 630,
        alt: "Your Blueprint",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Blueprint | Personalized Social Media Starting Plan",
    description:
      "Answer 18 simple questions and get a personalized Blueprint that tells you exactly where to start on social media — built around your goals, interests, and situation.",
    images: ["https://yourblueprint.in/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${roboto.variable} ${fuzzyBubbles.variable} ${appleGaramond.variable} ${bethanyElingston.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <UtmCapture />
        <HashScroll />
        {children}
      </body>
    </html>
  );
}
