import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const blogBricolage = {
  fontFamily: 'var(--font-bricolage), "Bricolage Grotesque", sans-serif',
} as const;

export const blogDmSans = {
  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
} as const;

export function BlogShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="flex min-h-full flex-col bg-[#fefefe]">
      <Header surface="soft" />
      <main
        className={`flex-1 py-12 sm:py-16 ${wide ? "px-6 sm:px-10 lg:px-16" : "px-6 sm:px-8"}`}
      >
        <div
          className={`mx-auto w-full ${wide ? "max-w-6xl" : "max-w-3xl"}`}
        >
          {children}
        </div>
      </main>
      <Footer surface="soft" />
    </div>
  );
}
