/**
 * FINAL REPORT TEMPLATE — LOCKED
 * Layout, spacing, and styling are approved. Do not edit unless the user
 * explicitly requests changes to this template.
 */
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  previewReportData,
  type ReportData,
} from "@/lib/report-preview-data";

export type { ReportData };

const inter = Inter({ subsets: ["latin"] });

function ReportHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="m-0 text-[52px] font-bold leading-[63px] tracking-[-0.04em] text-[#e48217]">
      ✰ {children}
    </h2>
  );
}

function ReportBrutalButton({
  children,
  className = "",
  twoLine,
  href,
}: {
  children?: ReactNode;
  className?: string;
  twoLine?: { primary: string; secondary: string };
  href?: string;
}) {
  const sharedClassName = `inline-flex items-center justify-center border-2 border-black bg-[#ffc940] font-semibold text-black shadow-[4px_4px_0_0_#000] transition hover:bg-[#ffd966] ${className}`;

  const content = twoLine ? (
    <>
      <span className="block text-[32px] font-bold leading-[35px]">
        {twoLine.primary}
      </span>
      <span className="block text-[20px] leading-[20px] font-semibold">
        {twoLine.secondary}
      </span>
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <Link href={href} className={sharedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={sharedClassName}>
      {content}
    </button>
  );
}

function ReportCard({
  title,
  items,
  description,
}: {
  title: string;
  items: string[];
  description: string;
}) {
  return (
    <section className="h-[669px] w-[966px] border border-black bg-white px-[39px] py-[47px]">
      <ReportHeading>{title}</ReportHeading>
      <ol className="mb-[28px] mt-[29px] list-decimal space-y-[22px] pl-[48px] text-[40px] leading-[49px] tracking-[-0.01em]">
        {items.slice(0, 3).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <p className="m-0 max-h-[240px] overflow-hidden text-[40px] leading-[48px] tracking-[-0.01em]">
        {description}
      </p>
    </section>
  );
}

export function ReportTemplate({
  data,
  gameplanHref = "/gameplan",
  exportMode = false,
}: {
  data: ReportData;
  gameplanHref?: string;
  exportMode?: boolean;
}) {
  return (
    <main
      className={`report-page-main ${inter.className} ${exportMode ? "bg-white" : "min-h-screen overflow-x-hidden bg-[#f4f0ef] pb-3 sm:pb-6 lg:pb-10"}`}
    >
      <div
        className={
          exportMode
            ? "report-viewport h-[3365px] w-[2214px]"
            : "report-viewport mx-auto -mt-[11px] h-[494px] w-full md:-mt-[21px] md:h-[943px] xl:-mt-[34px] xl:h-[1496px]"
        }
      >
        <article
          className={
            exportMode
              ? "relative h-[3365px] w-[2214px] bg-white text-black"
              : "relative h-[3525px] w-[2356px] origin-top-left scale-[0.1400679] bg-[#f4f0ef] text-black md:scale-[0.2674024] xl:scale-[0.4244482]"
          }
        >
          <div
            id="report-pdf-source"
            className={
              exportMode
                ? "relative h-[3365px] w-[2214px] bg-white"
                : "absolute left-[71px] top-[80px] h-[3365px] w-[2214px] rounded-[25px] border-[0.3px] border-black bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            }
          >
            {exportMode ? (
              <img
                src="/logo-dp.svg"
                alt="Your Blueprint"
                width={168}
                height={168}
                className="absolute right-[120px] top-[96px] h-[168px] w-[168px]"
              />
            ) : (
              <Image
                src="/logo-dp.svg"
                alt="Your Blueprint"
                width={168}
                height={168}
                className="absolute right-[120px] top-[96px] h-[168px] w-[168px]"
              />
            )}
            <header className="absolute left-[121px] right-[109px] top-[96px] h-[254px] border-b border-black">
              <p className="m-0 text-[72px] font-bold leading-[87px] tracking-[-0.04em]">
                Personalized Creator Blueprint
              </p>
              <h1 className="m-[6px_0_0] text-[100px] font-bold leading-[121px] tracking-[-0.04em] text-[#e48217]">
                {data.name.toUpperCase()}
              </h1>
            </header>

            <section className="absolute left-[102px] top-[420px] h-[901px] w-[2001px] border-b border-black">
              <div className="absolute left-0 top-0 h-[556px] w-[516px] rotate-[-2deg] rounded-[30px] bg-[#d9d9d9]" />
              {exportMode ? (
                <img
                  src={data.profileImage}
                  alt={data.name}
                  width={518}
                  height={510}
                  className="absolute left-[33px] top-[14px] h-[510px] w-[518px] rounded-[30px] object-cover"
                />
              ) : (
                <Image
                  src={data.profileImage}
                  alt={data.name}
                  width={518}
                  height={510}
                  unoptimized
                  className="absolute left-[33px] top-[14px] h-[510px] w-[518px] rounded-[30px] object-cover"
                />
              )}
              <div className="absolute left-[683px] top-[37px] w-[1305px]">
                <div className="grid grid-cols-[1fr_1.35fr] gap-y-[27px] text-[48px] leading-[58px]">
                  <p className="m-0">
                    <b>NAME:</b> {data.name}
                  </p>
                  <span />
                  <p className="m-0">
                    <b>AGE:</b> {data.age}
                  </p>
                  <p className="m-0 whitespace-nowrap">
                    <b>BASED:</b> {data.location}
                  </p>
                  <p className="col-span-2 m-0">
                    <b>GOAL:</b>{" "}
                    {data.goal.includes("help me") ? (
                      <>
                        {data.goal.split("help me")[0]}help me
                        <br />
                        {data.goal.split("help me")[1]?.trim()}
                      </>
                    ) : (
                      data.goal
                    )}
                  </p>
                </div>
                <h2 className="mb-0 mt-[57px] text-[72px] font-bold leading-[87px] tracking-[-0.04em]">
                  Your Creator Identity:
                </h2>
                <p className="m-0 text-[64px] font-bold leading-[77px] tracking-[-0.04em] text-[#e48217]">
                  {data.creatorIdentity}
                </p>
              </div>
              <p className="absolute left-0 top-[657px] m-0 w-full text-[48px] leading-[62px] tracking-[-0.01em]">
                {data.identityDescription}
              </p>
            </section>

            <section className="absolute left-[104px] top-[1387px] w-[2001px] pb-[43px]">
              <ReportHeading>Why This Direction Fits You</ReportHeading>
              <ul className="m-[29px_0_28px] grid list-none grid-cols-2 gap-y-[23px] p-0 text-[44px] leading-[53px] tracking-[-0.01em]">
                {data.whyItFits.slice(0, 4).map((item) => (
                  <li key={item}>
                    <span className="mr-[17px] text-[#ffb553]">✓</span>
                    {item}
                  </li>
                ))}
                {data.whyItFits[4] && (
                  <li className="col-span-2" key={data.whyItFits[4]}>
                    <span className="mr-[17px] text-[#ffb553]">✓</span>
                    {data.whyItFits[4]}
                  </li>
                )}
              </ul>
              <p className="m-0 mt-[24px] text-[48px] leading-[74px] tracking-[-0.01em]">
                {data.whyItFitsDescription}
              </p>
            </section>

            <div className="absolute left-[104px] top-[1967px] flex gap-[73px]">
              <ReportCard
                title="Strengths You Already Have"
                items={data.strengths}
                description={data.strengthsDescription}
              />
              <ReportCard
                title="Things Holding You Back"
                items={data.blockers}
                description={data.blockersDescription}
              />
            </div>

            <section className="absolute left-[104px] top-[2747px] grid w-[2001px] grid-cols-2 gap-[73px]">
              <div>
                <ReportHeading>Your Next Move?</ReportHeading>
                <ul className="m-[30px_0_0] list-none space-y-[23px] p-0 text-[44px] leading-[53px] tracking-[-0.01em]">
                  {data.nextMoves.slice(0, 6).map((move, index) => (
                    <li key={`${move}-${index}`}>- {move}</li>
                  ))}
                </ul>
              </div>
              <div className="flex min-h-[420px] flex-col">
                <ReportHeading>What&apos;s still missing?</ReportHeading>
                <p className="m-[29px_0_0] text-[44px] leading-[53px] tracking-[-0.01em]">
                  {data.gameplanCopyLine1}
                  <br />
                  {data.gameplanCopyLine2}
                  <br />
                  {data.gameplanCopyLine3}
                </p>
                <p className="m-[37px_0_0] whitespace-nowrap text-[44px] leading-[53px] tracking-[-0.01em]">
                  That&apos;s why GAMEPLAN is designed to help with
                </p>
                <ReportBrutalButton
                  href={gameplanHref}
                  className="mt-auto h-[98px] w-full -translate-y-[24px] text-[48px] font-bold leading-[58px]"
                >
                  Build my Step-by-Step Gameplan →
                </ReportBrutalButton>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}

export default function ReportPreviewPage() {
  return <ReportTemplate data={previewReportData} />;
}
