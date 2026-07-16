import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Artikel",
  type: "document",
  groups: [
    { name: "content", title: "Konten", default: true },
    { name: "relations", title: "Relasi" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Judul", type: "string", group: "content", validation: (rule) => rule.required().max(120) }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Ringkasan", type: "text", rows: 3, group: "content", validation: (rule) => rule.required().max(260) }),
    defineField({ name: "coverImage", title: "Cover", type: "image", group: "content", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alternative text" }], validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "Isi", type: "blockContent", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "Tanggal terbit", type: "datetime", group: "content", initialValue: () => new Date().toISOString(), validation: (rule) => rule.required() }),
    defineField({ name: "readingTime", title: "Estimasi baca (menit)", type: "number", group: "content", initialValue: 5, validation: (rule) => rule.required().min(1).max(60) }),
    defineField({ name: "featured", title: "Artikel pilihan", type: "boolean", group: "content", initialValue: false }),
    defineField({ name: "author", title: "Kontributor", type: "reference", to: [{ type: "author" }], group: "relations", validation: (rule) => rule.required() }),
    defineField({ name: "categories", title: "Topik", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }], group: "relations", validation: (rule) => rule.required().min(1) }),
    defineField({ name: "relatedPrograms", title: "Program terkait", type: "array", of: [{ type: "reference", to: [{ type: "program" }] }], group: "relations" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo", validation: (rule) => rule.max(60) }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo", validation: (rule) => rule.max(160) }),
  ],
  orderings: [{ title: "Terbaru", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "author.name", media: "coverImage" },
  },
});
