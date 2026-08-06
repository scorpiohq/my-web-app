import Link from "next/link";

export default function Backstory() {
  return (
    <section id="backstory" className="grid-bg px-6 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-16 xl:gap-20">
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight tracking-tight text-black">
          Tell me if this sounds about right.
        </h2>

        <div className="space-y-5 text-base leading-relaxed text-[#4A4A4A] sm:text-[17px] sm:leading-[1.75]">
          <p>Hey there—</p>

          <p>There&apos;s a good chance we know why you&apos;re here.</p>

          <p>
            You&apos;re juggling people, projects, and expectations. There are
            tasks to do, discussions to have, decisions to make, files to share,
            deadlines to hit, relationships to manage, and work to deliver.
          </p>

          <p>
            This all has to happen <em>somewhere</em>. But you&apos;ve
            discovered that spreading everything across different apps, browser
            tabs, emails, and chats doesn&apos;t work. It&apos;s finally time
            to find a single system.
          </p>

          <p>
            Unfortunately, most project management systems are bloated,
            complicated, and confusing. And software that&apos;s hard to use
            doesn&apos;t get used.
          </p>

          <p>
            Over 20 years ago we were in the same boat. We needed something
            capable, but it had to be straightforward and easy. Nothing fit the
            bill. So we invented Basecamp, and we&apos;ve been steadily
            improving it ever since. In software, longevity like this
            isn&apos;t luck — it&apos;s proof it works.{" "}
            <Link href="#" className="font-medium text-black underline underline-offset-2">
              And BC5 is all new for 2026.
            </Link>
          </p>

          <p>
            Today, Basecamp is used across every industry, and nearly a million
            people, teams, companies, and non-profits worldwide{" "}
            <Link href="#" className="font-medium text-black underline underline-offset-2">
              rely on it daily
            </Link>
            .
          </p>

          <p>
            Thanks for checking us out. We invite you to give Basecamp a try.
            And ultimately, we&apos;d be honored to have you as a customer.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[10px] border-2 border-black">
              <img
                src="/logo.svg"
                alt="Your Blueprint"
                className="h-12 w-auto max-w-none"
              />
            </div>
            <div>
              <p className="text-base text-black">
                <span className="font-semibold">Jason Fried</span>,{" "}
                <Link
                  href="mailto:jason@basecamp.com"
                  className="underline underline-offset-2"
                >
                  jason@basecamp.com
                </Link>
              </p>
              <p className="text-sm text-[#6B6B6B]">Co-founder &amp; CEO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
