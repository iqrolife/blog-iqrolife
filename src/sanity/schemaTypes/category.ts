import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Topik",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nama topik", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Deskripsi", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "Emoji/icon", type: "string", description: "Contoh: 🌱" }),
  ],
});
