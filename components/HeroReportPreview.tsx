export default function HeroReportPreview({
  size = "default",
}: {
  rotated?: boolean;
  size?: "default" | "modal";
}) {
  const isModal = size === "modal";

  return (
    <div
      className={`relative mx-auto w-full ${
        isModal ? "max-w-[280px] sm:max-w-[340px]" : "max-w-[300px] lg:mx-0"
      }`}
    >
      <img
        src="/lines-left.svg"
        alt=""
        width={226}
        height={225}
        className={`pointer-events-none absolute left-0 top-[30%] z-10 h-auto w-8 -translate-y-1/2 sm:w-9 ${
          isModal
            ? "-translate-x-[calc(72%+6px)]"
            : "-translate-x-[calc(72%+20px)]"
        }`}
        aria-hidden="true"
      />
      <img
        src="/lines-right.svg"
        alt=""
        width={445}
        height={424}
        className="pointer-events-none absolute right-0 top-[2%] z-10 h-auto w-12 translate-x-[58%] -translate-y-1/2 sm:w-14"
        aria-hidden="true"
      />
      <img
        src="/report-preview.svg"
        alt="Blueprint preview"
        width={300}
        height={438}
        className={`relative z-0 mx-auto h-auto w-full drop-shadow-[8px_8px_0_0_#000] ${
          isModal
            ? "max-w-[280px] sm:max-w-[340px]"
            : "max-w-[300px] lg:h-[438px] lg:w-[300px] lg:max-w-none"
        }`}
      />
    </div>
  );
}
