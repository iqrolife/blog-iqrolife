import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { getCategoryBySlug, getPosts } from "@/sanity/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return category ? { title: category.title, description: category.description } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [category, posts] = await Promise.all([getCategoryBySlug(slug), getPosts()]);
  if (!category) notFound();
  const filtered = posts.filter((post) => post.categories.some((item) => item.slug === slug));
  return (
    <>
      <section className="topic-hero"><div className="container"><span className="topic-hero__icon">{category.icon || "🌱"}</span><span className="kicker">Topik Ruang Tumbuh</span><h1>{category.title}</h1><p>{category.description}</p><Link href="/artikel" className="text-link">Jelajahi semua artikel →</Link></div></section>
      <section className="section container"><div className="results-summary"><strong>{filtered.length} artikel</strong><span>dalam topik ini</span></div><div className="posts-grid">{filtered.map((post) => <PostCard post={post} key={post._id}/>)}</div></section>
    </>
  );
}
