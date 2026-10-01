import Link from "next/link";
import BlogCover from "@/components/blog/BlogCover";
import { blogBricolage, blogDmSans } from "@/components/blog/BlogShell";
import { BLOG_BASE, formatPostDate, type BlogPost } from "@/lib/blog";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`${BLOG_BASE}/${post.slug}`}
      className="flex h-full min-h-0 w-full flex-col overflow-hidden border-2 border-black bg-white shadow-[4px_4px_0_0_#000] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]"
    >
      <BlogCover post={post} className="shrink-0 border-b-2 border-black" />
      <div className="flex min-h-0 flex-1 flex-col px-4 py-5 sm:px-5 sm:py-6 lg:px-6 lg:py-7">
        <p
          className="mb-1.5 text-xs font-medium text-[#6B6B6B] sm:mb-2 sm:text-sm"
          style={blogDmSans}
        >
          {formatPostDate(post.date)}
        </p>
        <h2
          className="mb-1.5 line-clamp-2 text-lg font-bold tracking-[-0.02em] text-[#121212] sm:mb-2 sm:text-xl lg:text-2xl"
          style={blogBricolage}
        >
          {post.title}
        </h2>
        {post.description ? (
          <p
            className="line-clamp-3 text-sm leading-relaxed text-[#333] sm:text-base lg:text-[18px]"
            style={blogDmSans}
          >
            • {post.description}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
