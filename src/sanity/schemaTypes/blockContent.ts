import { defineArrayMember, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Isi Artikel",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              { name: "href", type: "url", title: "URL" },
              { name: "blank", type: "boolean", title: "Buka tab baru", initialValue: true },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative text" }],
    }),
    defineArrayMember({
      name: "callout",
      title: "Kotak Informasi",
      type: "object",
      fields: [
        { name: "title", title: "Judul", type: "string" },
        { name: "text", title: "Isi", type: "text", rows: 4 },
        {
          name: "tone",
          title: "Warna",
          type: "string",
          options: { list: ["green", "blue", "yellow"] },
          initialValue: "green",
        },
      ],
    }),
  ],
});
