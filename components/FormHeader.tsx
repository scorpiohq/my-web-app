import Link from "next/link";
import Image from "next/image";
import FormProgressStepper from "@/components/FormProgressStepper";

export default function FormHeader({ activeStep }: { activeStep: number }) {
  return (
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Your Blueprint"
            width={140}
            height={32}
            className="h-7 w-auto sm:h-8"
            priority
          />
        </Link>
        <FormProgressStepper activeStep={activeStep} />
      </div>
    </header>
  );
}
