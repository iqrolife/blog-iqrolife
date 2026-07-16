import type { MetadataRoute } from "next";
import { getAuthors, getCategories, getPosts } from "@/sanity/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [posts, categories, authors] = await Promise.all([getPosts(), getCategories(), getAuthors()]);
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/artikel`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/kirim-cerita`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...posts.map((post) => ({ url: `${base}/artikel/${post.slug}`, lastModified: new Date(post.publishedAt), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...categories.map((item) => ({ url: `${base}/topik/${item.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...authors.map((item) => ({ url: `${base}/kontributor/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
