"use client";

import { useState } from "react";
import type { BlueprintEmailContent } from "@/lib/blueprint-emails";

export default function EmailPreviewClient({
  emails,
}: {
  emails: BlueprintEmailContent[];
}) {
  const [active, setActive] = useState(0);
  const email = emails[active];

  if (!email) return null;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        {emails.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            className={
              index === active
                ? "border-2 border-black bg-[#ffc940] px-3 py-1.5 text-[13px] font-bold text-black shadow-[3px_3px_0_0_#000]"
                : "border-2 border-black bg-white px-3 py-1.5 text-[13px] font-medium text-black"
            }
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            Email {item.id}
          </button>
        ))}
      </div>

      <div className="mt-5 border-2 border-black bg-white shadow-[6px_6px_0_0_#000]">
        <div className="border-b-2 border-black bg-[#fafafa] px-5 py-4">
          <p
            className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#888]"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            {email.label}
          </p>
          <p
            className="mt-2 text-[15px] text-[#121212]"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            <span className="font-semibold">Subject:</span> {email.subject}
          </p>
          <p
            className="mt-1 text-[14px] text-[#666]"
            style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
          >
            <span className="font-semibold text-[#444]">Preview:</span>{" "}
            {email.preview}
          </p>
        </div>
        <iframe
          title={email.subject}
          srcDoc={email.html}
          className="block h-[720px] w-full bg-white"
        />
      </div>
    </div>
  );
}
