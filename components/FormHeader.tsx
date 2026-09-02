import Link from "next/link";
import Image from "next/image";

export default function FormHeader() {
  return (
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-3.5 sm:px-6 sm:py-5">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Your Blueprint"
            width={200}
            height={46}
            className="h-8 w-auto sm:h-9 lg:h-11"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
