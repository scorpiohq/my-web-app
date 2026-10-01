import type { Metadata } from "next";
import BlogPostCard from "@/components/blog/BlogPostCard";
import {
  BlogShell,
  blogBricolage,
  blogDmSans,
} from "@/components/blog/BlogShell";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "I write stuff. | Your Blueprint",
  description: "And if I wrote more often I'd probably call this a blog.",
};

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M4 5.5V21.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <BlogShell wide>
      <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
        <span
          className="mb-5 inline-flex items-center gap-2 border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-6 sm:text-xs"
          style={blogBricolage}
        >
          <BookIcon />
          BLOG
        </span>

        <h1
          className="mb-4 text-[clamp(2rem,5.5vw,3.15rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#121212]"
          style={blogBricolage}
        >
          I write stuff.
        </h1>

        <p
          className="mb-6 max-w-xl text-sm font-bold leading-relaxed text-[#6B6B6B] sm:mb-7 sm:text-base"
          style={blogDmSans}
        >
          (And if I wrote more often I&apos;d probably call this a blog.)
        </p>

        <span
          className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-medium text-black shadow-[2px_2px_0_0_#000] sm:text-sm"
          style={blogDmSans}
        >
          <ClockIcon />
          {posts.length > 0
            ? `${posts.length} ${posts.length === 1 ? "post" : "posts"}`
            : "New posts coming soon"}
        </span>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6">
        {posts.length === 0 ? (
          <section className="border-2 border-black bg-white px-5 py-7 shadow-[4px_4px_0_0_#000] sm:col-span-2 sm:px-7 sm:py-8">
            <h2
              className="mb-4 text-xl font-bold tracking-[-0.02em] text-[#121212] sm:text-2xl"
              style={blogBricolage}
            >
              Nothing here yet
            </h2>
            <p
              className="text-sm leading-relaxed text-[#333] sm:text-base"
              style={blogDmSans}
            >
              This is where the writing will live. First post is on the way.
            </p>
          </section>
        ) : (
          posts.map((post) => <BlogPostCard key={post.slug} post={post} />)
        )}
      </div>
    </BlogShell>
  );
}
