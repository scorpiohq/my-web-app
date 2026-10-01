import Image from "next/image";
import type { BlogPost } from "@/lib/blog";

export default function BlogCover({
  post,
  priority = false,
  className = "",
}: {
  post: BlogPost;
  priority?: boolean;
  className?: string;
}) {
  if (!post.image) return null;

  return (
    <div className={`relative aspect-[700/380] overflow-hidden bg-[#eee] ${className}`}>
      <Image
        src={post.image}
        alt={post.imageAlt || post.title}
        fill
        sizes="(max-width: 1023px) 100vw, 700px"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
