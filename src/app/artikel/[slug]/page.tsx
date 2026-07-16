import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PortableArticle } from "@/components/PortableArticle";
import { PostCard } from "@/components/PostCard";
import { getPostBySlug, getPosts } from "@/sanity/lib/data";
import { imageUrl } from "@/sanity/lib/image";

const dateFormatter = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: { title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt, images: [{ url: imageUrl(post.coverImage, 1200, 630) }] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const allPosts = await getPosts();
  const related = allPosts.filter((item) => item._id !== post._id && item.categories.some((cat) => post.categories.some((postCat) => postCat.slug === cat.slug))).slice(0, 3);

  return (
    <>
      <article>
        <header className="article-header container container--article">
          <nav className="breadcrumbs"><Link href="/">Beranda</Link><span>/</span><Link href="/artikel">Artikel</Link><span>/</span><span>{post.title}</span></nav>
          <div className="article-header__categories">{post.categories.map((category) => <Link href={`/topik/${category.slug}`} key={category._id}>{category.title}</Link>)}</div>
          <h1>{post.title}</h1>
          <p className="article-header__excerpt">{post.excerpt}</p>
          <div className="article-header__meta">
            <Link href={`/kontributor/${post.author.slug}`} className="article-author"><img src={imageUrl(post.author.photo, 100, 100)} alt={post.author.name}/><span><strong>{post.author.name}</strong><small>{post.author.role}</small></span></Link>
            <span><Icon name="calendar" width={17} height={17}/>{dateFormatter.format(new Date(post.publishedAt))}</span>
            <span><Icon name="clock" width={17} height={17}/>{post.readingTime} menit baca</span>
          </div>
        </header>
        <div className="container article-cover"><img src={imageUrl(post.coverImage, 1400, 820)} alt={post.title}/></div>
        <div className="container article-layout">
          <aside className="article-share"><span>Bagikan</span><a href={`https://wa.me/?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer">WA</a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")}/artikel/${post.slug}`} target="_blank" rel="noreferrer">in</a></aside>
          <div>
            <PortableArticle value={post.body}/>
            <div className="article-end"><Icon name="leaf" width={24} height={24}/><span>Semoga bacaan ini menemani langkah kecil keluarga Anda.</span></div>
            <div className="author-box"><img src={imageUrl(post.author.photo, 160, 160)} alt={post.author.name}/><div><span>Tentang kontributor</span><h3>{post.author.name}</h3><p>{post.author.bio}</p><Link className="text-link" href={`/kontributor/${post.author.slug}`}>Lihat profil dan tulisan <Icon name="arrow" width={17} height={17}/></Link></div></div>
            {post.relatedPrograms?.map((program) => <div className="related-program" key={program._id}><div><span>Program terkait</span><h3>{program.title}</h3><p>{program.summary}</p></div><a className="button" href={program.registrationUrl || "https://www.iqrolife.id/"} target="_blank" rel="noreferrer">Pelajari program</a></div>)}
          </div>
        </div>
      </article>
      {related.length > 0 && <section className="section section--soft"><div className="container"><div className="section-heading"><span className="kicker">Lanjut membaca</span><h2>Bacaan terkait</h2></div><div className="posts-grid">{related.map((item) => <PostCard post={item} key={item._id}/>)}</div></div></section>}
    </>
  );
}
