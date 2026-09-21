import "./landing.css";

export const metadata = {
  title: "Your Blueprint — Landing (gouti)",
  robots: { index: false, follow: false },
};

export default function GoutiLandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="gouti-landing bg-[#fefefe]">{children}</div>;
}
