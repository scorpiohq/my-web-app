import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export type ReportData = {
  name: string;
  age: number | string;
  location: string;
  goal: string;
  creatorIdentity: string;
  profileImage: string;
  identityDescription: string;
  whyItFits: string[];
  whyItFitsDescription: string;
  strengths: string[];
  strengthsDescription: string;
  blockers: string[];
  blockersDescription: string;
  nextMoves: string[];
  gameplanCopy: string;
};

// Replace only this object for every new personalized report.
const reportData: ReportData = {
  name: "Lewis Hamilton",
  age: 20,
  location: "London, United Kingdom",
  goal: "I want to Build Something online, that can help me become financially free & able to enjoy my life.",
  creatorIdentity: "Experience Driven Travel Creator",
  profileImage:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1040&q=90",
  identityDescription:
    "The morning sun rises slowly over the quiet hills, casting a golden light across the dewy grass. A gentle breeze whispers through the tall trees, waking the sleepy birds from their sweet dreams. Nature breathes deeply, welcoming a brand new day filled.",
  whyItFits: [
    "You already enjoy this topic",
    "You have real-life experience",
    "You naturally consume content in this area",
    "You have stories to share consistently",
    "Thoughts in your mind about these, are potential viral content, just need to be shared smartly",
  ],
  whyItFitsDescription:
    "The morning sun rises slowly over the quiet hills, casting a golden light across the dewy grass. A gentle breeze whispers through the tall trees, waking the sleepy birds from their sweet dreams. Nature breathes deeply, welcoming a brand new day filled.",
  strengths: [
    "Write a strong title that includes a keyword",
    "Use short paragraphs, no longer than 4 lines",
    "Finish the post with a clear CTA",
  ],
  strengthsDescription:
    "The morning sun rises slowly over the quiet hills, casting a golden light across the dewy grass. A gentle breeze whispers through the tall trees, waking the sleepy birds from their sweet right dreams. Nature breathes deeply tight you know.",
  blockers: [
    "Write a strong title that includes a keyword",
    "Use short paragraphs, no longer than 4 lines",
    "Finish the post with a clear CTA",
  ],
  blockersDescription:
    "The morning sun rises slowly over the quiet hills, casting a golden light across the dewy grass. A gentle breeze whispers through the tall trees, waking the sleepy birds from their sweet right dreams. Nature breathes deeply tight you know.",
  nextMoves: [
    "Create an (platform) account",
    "First post, share why you made this Account?",
    "Create 10 Posts without focusing on results.",
    "Believe yourself, and Trust the Plan",
    "The More you enjoy, more you create better.",
    "The More you enjoy, more you create better.",
  ],
  gameplanCopy:
    "A direction, niche, Experiences worth sharing, & Enough time to start, The only thing missing now is a system that turns this into reality.",
};

function ReportHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="m-0 text-[52px] font-bold leading-[63px] tracking-[-0.04em] text-[#e48217]">
      ✰ {children}
    </h2>
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
      <ol className="mb-[28px] mt-[29px] list-decimal space-y-[14px] pl-[48px] text-[40px] leading-[49px] tracking-[-0.01em]">
        {items.slice(0, 3).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <p className="m-0 text-[40px] leading-[48px] tracking-[-0.01em]">
        {description}
      </p>
    </section>
  );
}

export function ReportTemplate({ data }: { data: ReportData }) {
  return (
    <main
      className={`${inter.className} min-h-screen overflow-x-hidden bg-[#f4f0ef] p-3 sm:p-6 lg:p-10`}
    >
      {/* Exact report sizes: 330×494 (mobile), 630×943 (tablet), 1000×1496 (desktop). */}
      <div className="mx-auto h-[494px] w-[330px] md:h-[943px] md:w-[630px] xl:h-[1496px] xl:w-[1000px]">
        <article className="relative h-[3525px] w-[2356px] origin-top-left scale-[0.1400679] bg-[#f4f0ef] text-black md:scale-[0.2674024] xl:scale-[0.4244482]">
          <div className="absolute left-[71px] top-[80px] h-[3365px] w-[2214px] rounded-[25px] border-[0.3px] border-black bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <header className="absolute left-[121px] right-[109px] top-[96px] h-[254px] border-b border-black">
              <p className="m-0 text-[72px] font-bold leading-[87px] tracking-[-0.04em]">
                Personalized Creator Blueprint
              </p>
              <h1 className="m-[6px_0_0] text-[100px] font-bold leading-[121px] tracking-[-0.04em] text-[#e48217]">
                {data.name.toUpperCase()}
              </h1>
              <button
                type="button"
                className="absolute right-0 top-0 h-[98px] w-[444px] rounded-[20px] bg-[#ffb553] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              >
                <span className="block pt-[17px] text-[32px] font-bold leading-[35px]">
                  DOWNLOAD
                </span>
                <span className="block text-[20px] leading-[20px]">as pdf</span>
              </button>
            </header>

            <section className="absolute left-[102px] top-[420px] h-[901px] w-[2001px] border-b border-black">
              <div className="absolute left-0 top-0 h-[556px] w-[516px] rotate-[-2deg] rounded-[30px] bg-[#d9d9d9]" />
              <img
                src={data.profileImage}
                alt={data.name}
                className="absolute left-[33px] top-[14px] h-[510px] w-[518px] rounded-[30px] object-cover"
              />
              <div className="absolute left-[683px] top-[37px] w-[1305px]">
                <div className="grid grid-cols-[1fr_1.35fr] gap-y-[27px] text-[48px] leading-[58px]">
                  <p className="m-0">
                    <b>NAME:</b> {data.name}
                  </p>
                  <span />
                  <p className="m-0">
                    <b>AGE:</b> {data.age}
                  </p>
                  <p className="m-0">
                    <b>BASED:</b> {data.location}
                  </p>
                  <p className="col-span-2 m-0">
                    <b>GOAL:</b> {data.goal}
                  </p>
                </div>
                <h2 className="mb-0 mt-[93px] text-[72px] font-bold leading-[87px] tracking-[-0.04em]">
                  Your Creator Identity:
                </h2>
                <p className="m-0 text-[64px] font-bold leading-[77px] tracking-[-0.04em] text-[#e48217]">
                  {data.creatorIdentity}
                </p>
              </div>
              <p className="absolute left-0 top-[657px] m-0 w-full text-[48px] leading-[58px] tracking-[-0.01em]">
                {data.identityDescription}
              </p>
            </section>

            <section className="absolute left-[104px] top-[1387px] w-[2001px] border-b border-black pb-[43px]">
              <ReportHeading>Why This Direction Fits You</ReportHeading>
              <ul className="m-[29px_0_28px] grid list-none grid-cols-2 gap-y-[19px] p-0 text-[44px] leading-[53px] tracking-[-0.01em]">
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
              <p className="m-0 text-[48px] leading-[58px] tracking-[-0.01em]">
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

            <section className="absolute left-[104px] top-[2747px] grid h-[495px] w-[2001px] grid-cols-2 gap-[73px]">
              <div>
                <ReportHeading>Your Next Move?</ReportHeading>
                <ul className="m-[30px_0_0] list-none space-y-[23px] p-0 text-[44px] leading-[53px] tracking-[-0.01em]">
                  {data.nextMoves.slice(0, 6).map((move, index) => (
                    <li key={`${move}-${index}`}>- {move}</li>
                  ))}
                </ul>
              </div>
              <div>
                <ReportHeading>What’s still missing?</ReportHeading>
                <p className="m-[29px_0_0] text-[44px] leading-[53px] tracking-[-0.01em]">
                  {data.gameplanCopy}
                </p>
                <p className="m-[37px_0_0] text-[44px] leading-[53px] tracking-[-0.01em]">
                  That’s why GAMEPLAN is designed to help with
                </p>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 h-[98px] w-[892px] rounded-[20px] bg-[#ffb553] text-[48px] font-bold leading-[58px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                  Build my Step-by-Step Gameplan →
                </button>
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}

export default function ReportPreviewPage() {
  return <ReportTemplate data={reportData} />;
}
