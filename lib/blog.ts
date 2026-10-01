import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt: string;
  body: string;
};

/** Preview-only while the blog is unfinished. robots.txt disallows /gouti. */
export const BLOG_BASE = "/gouti/blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function isPublishedFile(filename: string) {
  return filename.endsWith(".md") && !filename.startsWith("_");
}

/** gray-matter/js-yaml turns `date: 2026-09-28` into a Date, not a string. */
function asDateString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return "";
}

function asImageSrc(value: unknown): string {
  if (typeof value !== "string") return "";
  const src = value.trim();
  if (src.startsWith("/") && !src.startsWith("//")) return src;
  if (src.startsWith("https://")) return src;
  return "";
}

export function getPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter(isPublishedFile)
    .map((filename) => filename.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  const date = asDateString(data.date);
  const image = asImageSrc(data.image);
  const imageAlt =
    typeof data.imageAlt === "string" ? data.imageAlt.trim() : "";

  if (!title || !date) return null;

  return {
    slug,
    title,
    description,
    date,
    image,
    imageAlt,
    body: content.trim(),
  };
}

export function getAllPosts() {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelatedPosts(slug: string, limit = 3) {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function formatPostDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
