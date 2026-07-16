import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-01";

if (!projectId || !token) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID dan SANITY_API_WRITE_TOKEN wajib diisi.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false });
const block = (key, text, style = "normal") => ({ _type: "block", _key: key, style, markDefs: [], children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }] });

const categories = [
  ["category-fitrah", "Pendidikan Berbasis Fitrah", "pendidikan-berbasis-fitrah", "Memahami potensi unik anak dan mendampinginya bertumbuh secara utuh.", "🌱"],
  ["category-parenting", "Parenting", "parenting", "Praktik pengasuhan yang hangat, sadar, dan relevan.", "🤝"],
  ["category-story", "Cerita Komunitas", "cerita-komunitas", "Pengalaman nyata keluarga dan fasilitator Iqrolife.", "💬"],
];

const author = {
  _id: "author-nadia-rahmah",
  _type: "author",
  name: "Nadia Rahmah",
  slug: { _type: "slug", current: "nadia-rahmah" },
  role: "Fasilitator Pendidikan Keluarga",
  bio: "Mendampingi orang tua menemukan ritme belajar keluarga yang hangat dan realistis.",
  expertise: ["Pendidikan keluarga", "Fitrah anak", "Komunikasi empatik"],
};

const post = {
  _id: "post-mendampingi-anak",
  _type: "post",
  title: "Mendampingi Anak Bertumbuh Tanpa Terburu-buru",
  slug: { _type: "slug", current: "mendampingi-anak-bertumbuh-tanpa-terburu-buru" },
  excerpt: "Setiap anak memiliki ritme. Peran kita bukan mempercepat semuanya, melainkan hadir, mengamati, dan menyediakan lingkungan yang tepat.",
  publishedAt: new Date().toISOString(),
  readingTime: 7,
  featured: true,
  author: { _type: "reference", _ref: author._id },
  categories: categories.slice(0, 2).map(([id], index) => ({ _type: "reference", _ref: id, _key: `cat-${index}` })),
  body: [
    block("p1", "Di tengah banyaknya target perkembangan, orang tua mudah merasa harus memastikan anak selalu lebih cepat. Padahal, bertumbuh bukan perlombaan."),
    block("h1", "Mulai dari pengamatan", "h2"),
    block("p2", "Sebelum menentukan aktivitas, luangkan waktu untuk mengamati hal yang membuat mata anak berbinar dan kapan ia membutuhkan jeda."),
  ],
};

const tx = client.transaction();
for (const [id, title, slug, description, icon] of categories) {
  tx.createOrReplace({ _id: id, _type: "category", title, slug: { _type: "slug", current: slug }, description, icon });
}
tx.createOrReplace(author);
tx.createOrReplace(post);
tx.createOrReplace({ _id: "siteSettings", _type: "siteSettings", siteName: "Ruang Tumbuh Iqrolife", description: "Cerita, wawasan, dan praktik baik untuk keluarga.", communityUrl: "https://www.iqrolife.id/" });

await tx.commit();
console.log("Seed selesai. Tambahkan cover image melalui Sanity Studio agar artikel tampil optimal.");
