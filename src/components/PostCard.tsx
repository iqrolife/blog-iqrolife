import Link from "next/link";
import { Icon } from "@/components/Icon";
import { imageUrl } from "@/sanity/lib/image";
import type { Post } from "@/types/content";

const dateFormatter = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" });

export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <article className={`post-card${large ? " post-card--large" : ""}`}>
      <Link href={`/artikel/${post.slug}`} className="post-card__image-wrap" aria-label={post.title}>
        <img className="post-card__image" src={imageUrl(post.coverImage, 960, 620)} alt={post.title} />
      </Link>
      <div className="post-card__body">
        <div className="post-card__categories">
          {post.categories.slice(0, 2).map((category) => (
            <Link href={`/topik/${category.slug}`} key={category._id}>{category.title}</Link>
          ))}
        </div>
        <h3><Link href={`/artikel/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className="post-card__meta">
          <Link className="author-mini" href={`/kontributor/${post.author.slug}`}>
            <img src={imageUrl(post.author.photo, 80, 80)} alt="" />
            <span>{post.author.name}</span>
          </Link>
          <span><Icon name="calendar" width={15} height={15}/>{dateFormatter.format(new Date(post.publishedAt))}</span>
          <span><Icon name="clock" width={15} height={15}/>{post.readingTime} menit</span>
        </div>
      </div>
    </article>
  );
}
