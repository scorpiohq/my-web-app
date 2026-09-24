import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bebas_Neue, DM_Sans, Geist, Geist_Mono, Roboto } from "next/font/google";
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

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fuzzyBubbles = localFont({
  src: "../public/Fonts/FuzzyBubbles-Regular.ttf",
  variable: "--font-fuzzy",
  weight: "400",
  display: "swap",
});

const appleGaramond = localFont({
  src: [
    {
      path: "../public/Fonts/AppleGaramond.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/AppleGaramond-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-garamond",
  display: "swap",
});

const bethanyElingston = localFont({
  src: "../public/Fonts/Bethany Elingston.otf",
  variable: "--font-bethany",
  display: "swap",
});

const azoSansUber = localFont({
  src: "../public/Fonts/fonnts.com-Azo_Sans_Uber_Regular.otf",
  variable: "--font-azo-uber",
  weight: "400",
  display: "swap",
});

const cocogooseProBold = localFont({
  src: "../public/Fonts/cocogoose/Cocogoose-Pro-Bold-trial.ttf",
  variable: "--font-cocogoose",
  weight: "700",
  display: "swap",
});

const authorBold = localFont({
  src: "../public/Fonts/Author_Fonts/OTF/Author-Bold.otf",
  variable: "--font-author",
  weight: "700",
  display: "swap",
});

const bricolageGrotesque = localFont({
  src: [
    {
      path: "../public/Fonts/Bricolage_Grotesque/BricolageGrotesque-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/Bricolage_Grotesque/BricolageGrotesque-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Fonts/Bricolage_Grotesque/BricolageGrotesque-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/Fonts/Bricolage_Grotesque/BricolageGrotesque_72pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/Fonts/Bricolage_Grotesque/BricolageGrotesque_72pt-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "")
      : "https://yourblueprint.in",
  ),
  title: {
    default: "Your Blueprint - Know Exactly Where to Start on Social Media",
    template: "%s | Your Blueprint",
  },
  description:
    "Answer 18 Simple Questions about you, and Get a Personalized Creator Blueprint that tells you exactly where to start.",
  applicationName: "Your Blueprint",
  icons: {
    icon: [
      { url: "/favicon-48.png?v=3", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png?v=3", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yourblueprint.in",
    siteName: "Your Blueprint",
    title: "Your Blueprint - Know Exactly Where to Start on Social Media",
    description:
      "Answer 18 Simple Questions about you, and Get a Personalized Creator Blueprint that tells you exactly where to start.",
    images: [
      {
        url: "https://yourblueprint.in/og-image.png?v=2",
        width: 1230,
        height: 630,
        alt: "Your Blueprint",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Blueprint - Know Exactly Where to Start on Social Media",
    description:
      "Answer 18 Simple Questions about you, and Get a Personalized Creator Blueprint that tells you exactly where to start.",
    images: ["https://yourblueprint.in/og-image.png?v=2"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${roboto.variable} ${dmSans.variable} ${fuzzyBubbles.variable} ${appleGaramond.variable} ${bethanyElingston.variable} ${azoSansUber.variable} ${cocogooseProBold.variable} ${authorBold.variable} ${bricolageGrotesque.variable} h-full antialiased`}
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
