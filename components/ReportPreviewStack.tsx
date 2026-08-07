export default function ReportPreviewStack({ ready = false }: { ready?: boolean }) {
  return (
    <div
      className="relative mx-auto flex h-[168px] w-full max-w-[320px] items-start justify-center sm:h-[188px] sm:max-w-[360px]"
      aria-hidden="true"
    >
      <div className="relative h-full w-[250px] sm:w-[270px]">
        <div
          className={`absolute left-0 top-5 sm:top-6 ${ready ? "" : "report-card-float report-card-float-delay-1"}`}
        >
          <div className="w-[188px] rotate-[-10deg] rounded-md border border-[#E6E6E6] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:w-[200px]">
            <div className="mb-2 h-2 w-[80%] rounded bg-[#EFEFEF]" />
            <div className="mb-3 h-2.5 w-[50%] rounded bg-[#F5DFC4]" />
            <div className="flex gap-2">
              <div className="h-10 w-10 shrink-0 rounded bg-[#EFEFEF]" />
              <div className="flex-1 space-y-1.5 pt-0.5">
                <div className="h-1.5 w-full rounded bg-[#EFEFEF]" />
                <div className="h-1.5 w-[85%] rounded bg-[#EFEFEF]" />
                <div className="h-1.5 w-[65%] rounded bg-[#EFEFEF]" />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute right-0 top-3 sm:top-4 ${ready ? "" : "report-card-float report-card-float-delay-2"}`}
        >
          <div className="w-[188px] rotate-[8deg] rounded-md border border-[#E6E6E6] bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:w-[200px]">
            <div className="mb-2 h-2 w-[75%] rounded bg-[#EFEFEF]" />
            <div className="mb-3 h-2.5 w-[40%] rounded bg-[#F5DFC4]" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded bg-[#EFEFEF]" />
              <div className="h-1.5 w-[92%] rounded bg-[#EFEFEF]" />
              <div className="h-1.5 w-[80%] rounded bg-[#EFEFEF]" />
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 top-9 -translate-x-1/2 sm:top-10">
          <div className={ready ? "" : "report-card-float"}>
            <div
              className={`w-[200px] rotate-[-2deg] rounded-md border border-[#D9D9D9] bg-white p-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-transform duration-500 sm:w-[220px] ${
                ready ? "scale-105" : ""
              }`}
            >
              <div className="mb-2 h-2 w-[88%] rounded bg-[#ECECEC]" />
              <div className="mb-3 h-3 w-[55%] rounded bg-[#FFD9A8]" />
              <div className="flex gap-2.5">
                <div className="h-11 w-11 shrink-0 rounded-md bg-[#ECECEC]" />
                <div className="flex-1 space-y-1.5 pt-1">
                  <div className="h-1.5 w-full rounded bg-[#ECECEC]" />
                  <div className="h-1.5 w-full rounded bg-[#ECECEC]" />
                  <div className="h-1.5 w-[75%] rounded bg-[#ECECEC]" />
                </div>
                <div className="h-5 w-10 shrink-0 rounded bg-[#FFF0D6]" />
              </div>
              <div className="mt-2.5 space-y-1.5">
                <div className="h-1.5 w-full rounded bg-[#F3F3F3]" />
                <div className="h-1.5 w-[85%] rounded bg-[#F3F3F3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
