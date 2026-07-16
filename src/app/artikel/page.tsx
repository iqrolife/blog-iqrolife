import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { SearchForm } from "@/components/SearchForm";
import { getCategories, getPosts } from "@/sanity/lib/data";

export const metadata: Metadata = { title: "Semua Artikel", description: "Jelajahi wawasan, cerita komunitas, dan panduan praktis dari Iqrolife." };

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ q?: string; kategori?: string }> }) {
  const params = await searchParams;
  const [allPosts, categories] = await Promise.all([getPosts(), getCategories()]);
  const query = (params.q || "").trim().toLowerCase();
  const category = params.kategori || "";
  const posts = allPosts.filter((post) => {
    const matchesQuery = !query || `${post.title} ${post.excerpt} ${post.author.name} ${post.categories.map((item) => item.title).join(" ")}`.toLowerCase().includes(query);
    const matchesCategory = !category || post.categories.some((item) => item.slug === category);
    return matchesQuery && matchesCategory;
  });

  return (
    <>
      <section className="page-hero"><div className="container"><span className="kicker">Perpustakaan Ruang Tumbuh</span><h1>Temukan bacaan untuk perjalanan keluarga Anda.</h1><p>Cari berdasarkan pertanyaan, topik, atau pengalaman yang sedang dekat dengan kehidupan sehari-hari.</p><SearchForm defaultValue={params.q || ""} category={category}/></div></section>
      <section className="section container">
        <div className="filter-row">
          <Link className={!category ? "active" : ""} href={params.q ? `/artikel?q=${encodeURIComponent(params.q)}` : "/artikel"}>Semua</Link>
          {categories.map((item) => <Link className={category === item.slug ? "active" : ""} href={`/artikel?kategori=${item.slug}${params.q ? `&q=${encodeURIComponent(params.q)}` : ""}`} key={item._id}>{item.title}</Link>)}
        </div>
        <div className="results-summary"><strong>{posts.length} artikel</strong>{query && <span>untuk “{params.q}”</span>}</div>
        {posts.length ? <div className="posts-grid">{posts.map((post) => <PostCard post={post} key={post._id}/>)}</div> : <div className="empty-state"><span>🌿</span><h2>Belum menemukan bacaan yang cocok</h2><p>Coba kata kunci yang lebih umum atau pilih topik lain.</p><Link className="button" href="/artikel">Lihat semua artikel</Link></div>}
      </section>
    </>
  );
}
