import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Pengaturan Situs",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Nama situs", type: "string", initialValue: "Ruang Tumbuh Iqrolife" }),
    defineField({ name: "description", title: "Deskripsi", type: "text", rows: 3 }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "communityUrl", title: "URL komunitas", type: "url", initialValue: "https://www.iqrolife.id/" }),
    defineField({ name: "instagramUrl", title: "Instagram", type: "url" }),
    defineField({ name: "contactEmail", title: "Email kontak", type: "string" }),
  ],
});
