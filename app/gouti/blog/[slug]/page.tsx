import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Writing | Your Blueprint" };

  return {
    title: `${post.title} | Your Blueprint`,
    description: post.description,
    openGraph: post.image
      ? {
          title: post.title,
          description: post.description,
          images: [{ url: post.image, alt: post.imageAlt || post.title }],
        }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return <BlogPostLayout post={post} morePosts={getRelatedPosts(slug)} />;
}
