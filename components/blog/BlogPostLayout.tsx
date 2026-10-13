import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  BlogShell,
  blogBricolage,
  blogDmSans,
} from "@/components/blog/BlogShell";
import { BLOG_BASE, formatPostDate, type BlogPost } from "@/lib/blog";

const essayLink =
  "font-semibold text-[#121212] underline decoration-[#121212] decoration-1 underline-offset-[3px] hover:text-black";

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

function EssayLink({
  href,
  children,
}: {
  href?: string;
  children?: ReactNode;
}) {
  const url = href || "/";
  const className = essayLink;
  if (url.startsWith("/") && !url.startsWith("//")) {
    return (
      <Link href={url} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={url} className={className}>
      {children}
    </a>
  );
}

export default function BlogPostLayout({
  post,
  morePosts = [],
}: {
  post: BlogPost;
  morePosts?: BlogPost[];
}) {
  return (
    <BlogShell canvas="white">
      <article className="mx-auto w-full max-w-3xl">
        <header className="mb-8 flex flex-col items-start text-left sm:mb-10">
          <span
            className="invisible mb-5 inline-flex items-center gap-2 border border-black bg-[#E5C4A1] px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-black shadow-[3px_3px_0_0_#000] sm:mb-6 sm:text-xs"
            style={blogBricolage}
            aria-hidden="true"
          >
            <BookIcon />
            ARTICLES
          </span>

          <h1
            className="mb-4 text-[clamp(2rem,5.5vw,3.15rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#121212]"
            style={blogBricolage}
          >
            {post.title}
          </h1>

          {post.description ? (
            <p
              className="mb-6 max-w-xl border-l-2 border-[#121212] pl-3 text-sm leading-relaxed text-[#6B6B6B] sm:mb-7 sm:text-base"
              style={blogDmSans}
            >
              {post.description}
            </p>
          ) : null}

          <span
            className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-medium text-black shadow-[2px_2px_0_0_#000] sm:text-sm"
            style={blogDmSans}
          >
            <ClockIcon />
            {formatPostDate(post.date)}
          </span>

          <div className="mt-8 h-px w-full bg-black/15 sm:mt-10" />
        </header>

        <div
          className="text-[1.125rem] leading-[1.65] text-[#243038]"
          style={blogDmSans}
        >
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2
                  className="mb-4 mt-10 text-[1.35rem] font-bold leading-snug tracking-[-0.02em] text-[#243038] first:mt-0"
                  style={blogBricolage}
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  className="mb-3 mt-8 text-[1.15rem] font-bold leading-snug text-[#243038]"
                  style={blogBricolage}
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => <p className="mb-6">{children}</p>,
              ul: ({ children }) => (
                <ul className="mb-6 list-disc space-y-2 pl-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 list-decimal space-y-2 pl-6">{children}</ol>
              ),
              a: ({ href, children }) => (
                <EssayLink href={href}>{children}</EssayLink>
              ),
              strong: ({ children }) => (
                <strong className="font-bold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>

        <footer className="mt-10 flex items-center gap-4 sm:mt-12">
          <Image
            src="/dp.jpg"
            alt="Andy, founder of Your Blueprint"
            width={64}
            height={64}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
          <div style={blogDmSans}>
            <p className="text-[1.05rem] leading-snug text-[#243038]">
              <span className="font-semibold">Andy</span>
              {", "}
              <a href="mailto:andy@yourblueprint.in" className={essayLink}>
                andy@yourblueprint.in
              </a>
            </p>
            <p className="mt-0.5 text-[0.95rem] text-[#5c676d]">Founder</p>
          </div>
        </footer>
      </article>

      {morePosts.length > 0 ? (
        <nav
          aria-label="More writing"
          className="mx-auto mt-16 w-full max-w-[40rem] border-t border-[#243038]/10 pt-10 sm:mt-20"
        >
          <ul className="flex flex-col gap-4">
            {morePosts.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`${BLOG_BASE}/${related.slug}`}
                  className={`text-[1.05rem] leading-snug ${essayLink}`}
                  style={blogDmSans}
                >
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </BlogShell>
  );
}
