import Link from "next/link";
import Image from "next/image";

export default function ReportPageFooter({
  surface = "grid",
}: {
  surface?: "grid" | "soft";
} = {}) {
  const soft = surface === "soft";

  return (
    <footer
      className={
        soft
          ? "border-t border-black/[0.08] bg-[#F7F7F7]"
          : "grid-bg border-t border-black/20"
      }
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-10 sm:px-8 sm:py-12">
        <Link href="/" className="mb-6 sm:mb-8">
          <Image
            src="/logo.svg"
            alt="Your Blueprint"
            width={160}
            height={40}
            className="h-9 w-auto sm:h-10"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <p
          className="text-sm text-black/70"
          style={
            soft
              ? { fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }
              : undefined
          }
        >
          ©Your Blueprint, 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
