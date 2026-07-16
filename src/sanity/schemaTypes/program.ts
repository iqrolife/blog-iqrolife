import { defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Program Iqrolife",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nama program", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "summary", title: "Ringkasan", type: "text", rows: 3 }),
    defineField({ name: "targetAudience", title: "Target peserta", type: "string" }),
    defineField({ name: "registrationUrl", title: "URL pendaftaran", type: "url" }),
    defineField({ name: "isActive", title: "Aktif", type: "boolean", initialValue: true }),
  ],
});
