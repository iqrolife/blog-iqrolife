import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PostCard } from "@/components/PostCard";
import { SearchForm } from "@/components/SearchForm";
import { getAuthors, getCategories, getPosts, getPrograms } from "@/sanity/lib/data";
import { imageUrl } from "@/sanity/lib/image";

export default async function HomePage() {
  const [posts, categories, authors, programs] = await Promise.all([getPosts(), getCategories(), getAuthors(), getPrograms()]);
  const featured = posts.find((post) => post.featured) || posts[0];
  const latest = posts.filter((post) => post._id !== featured?._id).slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="hero__blob hero__blob--one" />
        <div className="hero__blob hero__blob--two" />
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="eyebrow"><Icon name="leaf" width={18} height={18}/> Ruang belajar keluarga</span>
            <h1>Tumbuh tidak harus <em>sendirian.</em></h1>
            <p>Cerita, pengalaman, dan wawasan dari keluarga serta fasilitator Iqrolife untuk menemani perjalanan pendidikan yang fitrah, bertahap, dan paripurna.</p>
            <SearchForm />
            <div className="hero__links">
              <span>Topik populer:</span>
              {categories.slice(0, 3).map((category) => <Link href={`/topik/${category.slug}`} key={category._id}>{category.title}</Link>)}
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__orbit hero__orbit--1" />
            <div className="hero__orbit hero__orbit--2" />
            <img src="/images/logo-iqrolife.png" alt="Logo Iqrolife" />
            <div className="floating-note floating-note--one"><span>🌱</span><strong>Belajar sesuai fitrah</strong></div>
            <div className="floating-note floating-note--two"><span>💬</span><strong>Cerita dari komunitas</strong></div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="section container">
          <div className="section-heading section-heading--split">
            <div><span className="kicker">Pilihan editor</span><h2>Bacaan untuk memulai</h2></div>
            <Link className="text-link" href="/artikel">Lihat semua artikel <Icon name="arrow" width={18} height={18}/></Link>
          </div>
          <PostCard post={featured} large />
        </section>
      )}

      <section className="section section--soft" id="topik">
        <div className="container">
          <div className="section-heading section-heading--center"><span className="kicker">Jelajahi topik</span><h2>Temukan yang sedang keluarga Anda butuhkan</h2><p>Setiap keluarga memiliki musim dan pertanyaan yang berbeda. Mulailah dari topik yang paling dekat.</p></div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <Link href={`/topik/${category.slug}`} className={`category-card category-card--${(index % 4) + 1}`} key={category._id}>
                <span className="category-card__icon">{category.icon || "🌱"}</span>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className="category-card__link">Jelajahi <Icon name="arrow" width={17} height={17}/></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading section-heading--split"><div><span className="kicker">Terbaru</span><h2>Wawasan dan cerita terkini</h2></div><Link className="text-link" href="/artikel">Semua bacaan <Icon name="arrow" width={18} height={18}/></Link></div>
        <div className="posts-grid">{latest.map((post) => <PostCard post={post} key={post._id} />)}</div>
      </section>

      <section className="community-section" id="kontributor">
        <div className="container community-section__grid">
          <div className="community-section__content">
            <span className="kicker kicker--light">Dari komunitas, untuk komunitas</span>
            <h2>Pengalaman nyata dapat menjadi cahaya bagi keluarga lain.</h2>
            <p>Ruang Tumbuh membuka tempat bagi orang tua, fasilitator, dan sahabat Iqrolife untuk berbagi proses—termasuk pertanyaan, kekeliruan, dan pembelajaran kecil yang bermakna.</p>
            <div className="community-avatars">
              {authors.map((author) => <Link href={`/kontributor/${author.slug}`} key={author._id}><img src={imageUrl(author.photo, 120, 120)} alt={author.name}/></Link>)}
              <span>+ Anda</span>
            </div>
            <Link href="/kirim-cerita" className="button button--light">Bagikan cerita Anda <Icon name="arrow" width={18} height={18}/></Link>
          </div>
          <div className="quote-card">
            <Icon name="quote" width={42} height={42}/>
            <blockquote>“Kami tidak selalu menemukan jawaban, tetapi menemukan teman seperjalanan membuat kami lebih berani menjalani proses.”</blockquote>
            <div><img src="/images/avatar-rani.svg" alt=""/><span><strong>Rani Prameswari</strong><small>Kontributor komunitas</small></span></div>
          </div>
        </div>
      </section>

      {programs.length > 0 && (
        <section className="section container">
          <div className="program-banner">
            <div><span className="kicker">Lanjutkan perjalanan</span><h2>{programs[0].title}</h2><p>{programs[0].summary}</p><span className="program-target">Untuk: {programs[0].targetAudience}</span></div>
            <a className="button" href={programs[0].registrationUrl || "https://www.iqrolife.id/"} target="_blank" rel="noreferrer">Lihat program <Icon name="external" width={17} height={17}/></a>
          </div>
        </section>
      )}

      <section className="newsletter">
        <div className="container newsletter__inner">
          <div><span className="kicker">Teman bertumbuh di inbox</span><h2>Satu bacaan bermakna, dikirim dengan tenang.</h2><p>Ringkasan artikel dan kabar komunitas. Tidak ramai, tidak setiap hari.</p></div>
          <form className="newsletter__form"><input type="email" placeholder="Alamat email Anda" aria-label="Alamat email"/><button type="button" className="button">Berlangganan</button><small>Demo UI — hubungkan ke layanan newsletter pilihan Anda.</small></form>
        </div>
      </section>
    </>
  );
}
