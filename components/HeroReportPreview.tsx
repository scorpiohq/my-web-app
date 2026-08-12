export default function HeroReportPreview({
  rotated = true,
  size = "default",
}: {
  rotated?: boolean;
  size?: "default" | "modal";
}) {
  const isModal = size === "modal";

  return (
    <div
      className={`relative mx-auto w-full ${
        isModal
          ? "max-w-[280px] sm:max-w-[340px]"
          : "max-w-[300px] lg:mx-0"
      }`}
    >
      <div
        className={`mx-auto aspect-[300/438] w-full border-2 border-black bg-white shadow-[8px_8px_0_0_#000] ${
          isModal
            ? "max-w-[280px] sm:max-w-[340px]"
            : "max-w-[300px] lg:h-[438px] lg:w-[300px] lg:max-w-none lg:aspect-auto"
        } ${rotated ? "rotate-[2deg] lg:rotate-[3deg]" : ""}`}
        aria-label="Blueprint preview placeholder"
      />
    </div>
  );
}
