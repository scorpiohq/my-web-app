import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt",
};

export default function PromptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
