import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Ruang Tumbuh")
    .items([
      S.listItem().title("Artikel").schemaType("post").child(S.documentTypeList("post").title("Artikel")),
      S.listItem().title("Kontributor").schemaType("author").child(S.documentTypeList("author").title("Kontributor")),
      S.listItem().title("Topik").schemaType("category").child(S.documentTypeList("category").title("Topik")),
      S.listItem().title("Program").schemaType("program").child(S.documentTypeList("program").title("Program")),
      S.divider(),
      S.listItem().title("Cerita masuk").schemaType("storySubmission").child(S.documentTypeList("storySubmission").title("Cerita masuk")),
      S.divider(),
      S.listItem()
        .title("Pengaturan situs")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
