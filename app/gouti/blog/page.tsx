import type { Metadata } from "next";
import Link from "next/link";
import {
  BlogShell,
  blogBricolage,
  blogDmSans,
} from "@/components/blog/BlogShell";
import { BLOG_BASE, formatPostDate, getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs | Your Blueprint",
  description:
    "Things I'm learning, building, and figuring out along the way.",
};

const essayLink =
  "font-semibold text-[#121212] underline decoration-[#121212] decoration-2 underline-offset-[5px] hover:text-black";

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
  const latest = posts[0];

  return (
    <BlogShell canvas="white">
      <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
        <span
          className="invisible mb-5 inline-flex items-center gap-2 border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-6 sm:text-xs"
          style={blogBricolage}
          aria-hidden="true"
        >
          <BookIcon />
          BLOGS
        </span>

        <h1
          className="mb-4 text-[clamp(2rem,5.5vw,3.15rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#121212]"
          style={blogBricolage}
        >
          Blogs
        </h1>

        <p
          className="mb-6 max-w-xl text-sm leading-relaxed text-[#6B6B6B] sm:mb-7 sm:text-base"
          style={blogDmSans}
        >
          Things I&apos;m learning, building, and figuring out along the way.
        </p>

        {latest ? (
          <span
            className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-medium text-black shadow-[2px_2px_0_0_#000] sm:text-sm"
            style={blogDmSans}
          >
            <ClockIcon />
            Last Updated on {formatPostDate(latest.date)}
          </span>
        ) : null}
      </div>

      {posts.length === 0 ? (
        <p
          className="text-sm leading-relaxed text-[#333] sm:text-base"
          style={blogDmSans}
        >
          This is where the writing will live. First post is on the way.
        </p>
      ) : (
        <ul className="flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <p className="mb-1 text-sm text-[#6B6B6B]" style={blogDmSans}>
                {formatPostDate(post.date)}
              </p>
              <Link
                href={`${BLOG_BASE}/${post.slug}`}
                className={`text-[1.15rem] leading-snug ${essayLink}`}
                style={blogDmSans}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </BlogShell>
  );
}
