import { previewBlueprintEmails } from "@/lib/blueprint-emails";
import EmailPreviewClient from "./EmailPreviewClient";

export default function EmailPreviewPage() {
  const emails = previewBlueprintEmails("");

  return (
    <main className="min-h-screen bg-[#f6f6f4] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-[720px]">
        <p
          className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#888]"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
        >
          Email preview
        </p>
        <h1
          className="mt-2 text-[28px] font-bold tracking-[-0.03em] text-[#121212] sm:text-[34px]"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
        >
          How the four emails look
        </h1>
        <p
          className="mt-3 max-w-[42rem] text-[16px] leading-7 text-[#444]"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
        >
          Same templates we send. Personalized as Sam. Email 2 highlights a
          time between 3:10 and 4:30.
        </p>
        <EmailPreviewClient emails={emails} />
      </div>
    </main>
  );
}
