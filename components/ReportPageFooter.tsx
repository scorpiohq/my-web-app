import Link from "next/link";
import Image from "next/image";

export default function ReportPageFooter() {
  return (
    <footer className="grid-bg border-t border-black/20">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-10 sm:px-8 sm:py-12">
        <Link href="/" className="mb-6 sm:mb-8">
          <Image
            src="/logo.svg"
            alt="Your Blueprint"
            width={160}
            height={40}
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <p className="text-sm text-black/70">©Your Blueprint, 2026. All rights reserved.</p>
      </div>
    </footer>
  );
}
