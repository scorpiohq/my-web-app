import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bebas_Neue, Geist, Geist_Mono, Roboto } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Your Blueprint",
  description:
    "Your Blueprint to start your social media journey — with what you have, from where you are.",
  icons: {
    icon: "/logo-dp.svg",
    apple: "/logo-dp.svg",
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
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${roboto.variable} ${fuzzyBubbles.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
