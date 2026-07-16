import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Kontributor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nama", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Peran", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4, validation: (rule) => rule.required().max(400) }),
    defineField({ name: "expertise", title: "Topik keahlian", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
