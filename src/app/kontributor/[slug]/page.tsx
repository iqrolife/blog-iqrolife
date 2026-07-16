import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { getAuthorBySlug, getPosts } from "@/sanity/lib/data";
import { imageUrl } from "@/sanity/lib/image";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  return author ? { title: author.name, description: author.bio } : {};
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [author, posts] = await Promise.all([getAuthorBySlug(slug), getPosts()]);
  if (!author) notFound();
  const authored = posts.filter((post) => post.author.slug === slug);
  return (
    <>
      <section className="author-hero"><div className="container author-hero__inner"><img src={imageUrl(author.photo, 320, 320)} alt={author.name}/><div><span className="kicker">Kontributor Ruang Tumbuh</span><h1>{author.name}</h1><strong>{author.role}</strong><p>{author.bio}</p>{author.expertise && <div className="expertise-list">{author.expertise.map((item) => <span key={item}>{item}</span>)}</div>}</div></div></section>
      <section className="section container"><div className="section-heading"><span className="kicker">Tulisan kontributor</span><h2>{authored.length} bacaan dari {author.name.split(" ")[0]}</h2></div><div className="posts-grid">{authored.map((post) => <PostCard post={post} key={post._id}/>)}</div></section>
    </>
  );
}
