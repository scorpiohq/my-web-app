import Link from "next/link";
import ReactMarkdown from "react-markdown";
import BlogPostCard from "@/components/blog/BlogPostCard";
import {
  BlogShell,
  blogBricolage,
  blogDmSans,
} from "@/components/blog/BlogShell";
import { BLOG_BASE, formatPostDate, type BlogPost } from "@/lib/blog";

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

export default function BlogPostLayout({
  post,
  morePosts = [],
}: {
  post: BlogPost;
  morePosts?: BlogPost[];
}) {
  return (
    <BlogShell wide>
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href={BLOG_BASE}
          className="mb-8 inline-flex text-sm font-medium text-[#6B6B6B] transition hover:text-black"
          style={blogDmSans}
        >
          ← All writing
        </Link>

        <div className="mb-8 flex flex-col items-start text-left sm:mb-10">
          <span
            className="mb-5 inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 text-xs font-medium text-black shadow-[2px_2px_0_0_#000] sm:mb-6 sm:text-sm"
            style={blogDmSans}
          >
            <ClockIcon />
            {formatPostDate(post.date)}
          </span>

          <h1
            className="mb-4 text-[clamp(2rem,5.5vw,3.15rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#121212]"
            style={blogBricolage}
          >
            {post.title}
          </h1>

          {post.description ? (
            <p
              className="max-w-2xl text-[20px] leading-relaxed text-[#6B6B6B]"
              style={blogDmSans}
            >
              • {post.description}
            </p>
          ) : null}

          <div className="mt-6 h-px w-full bg-black/15 sm:mt-7" />
        </div>

        <article
          className="space-y-4 text-base leading-relaxed text-[#333] sm:text-lg"
          style={blogDmSans}
        >
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2
                  className="pt-4 text-[22px] font-bold tracking-[-0.02em] text-[#121212] sm:pt-5 sm:text-2xl"
                  style={blogBricolage}
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  className="pt-2 text-lg font-bold tracking-[-0.02em] text-[#121212] sm:text-xl"
                  style={blogBricolage}
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => <p>{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc space-y-1 pl-5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal space-y-1 pl-5">{children}</ol>
              ),
              a: ({ href, children }) => (
                <Link
                  href={href || "/"}
                  className="font-medium text-[#121212] underline decoration-[#E8A33D] underline-offset-2"
                >
                  {children}
                </Link>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-[#121212]">{children}</strong>
              ),
            }}
          >
            {post.body}
          </ReactMarkdown>

          <h2
            className="pt-4 text-[22px] font-bold tracking-[-0.02em] text-[#121212] sm:pt-5 sm:text-2xl"
            style={blogBricolage}
          >
            Here&apos;s a way I can help you?
          </h2>
          <p>
            If you&apos;re stuck on where to start, answer 18 questions. I&apos;ll
            build a Blueprint from your answers — so you have one true thing to
            say this week, not another generic niche.
          </p>
          <p>
            <Link
              href="/form"
              className="btn-brutal btn-brutal-primary inline-flex min-h-[52px] items-center justify-center px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black"
              style={blogBricolage}
            >
              Build my Blueprint →
            </Link>
          </p>
        </article>
      </div>

      {morePosts.length > 0 ? (
        <section className="mt-12 sm:mt-16">
          <div className="mb-8 h-px w-full bg-black/15 sm:mb-10" />
          <h2
            className="mb-5 text-[22px] font-bold tracking-[-0.02em] text-[#121212] sm:mb-6 sm:text-2xl"
            style={blogBricolage}
          >
            A few more blogs you might enjoy?
          </h2>
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6">
            {morePosts.map((related) => (
              <BlogPostCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      ) : null}
    </BlogShell>
  );
}
