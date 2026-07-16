import { defineField, defineType } from "sanity";

export const storySubmission = defineType({
  name: "storySubmission",
  title: "Kirim Cerita",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nama", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Nomor WhatsApp", type: "string", readOnly: true }),
    defineField({ name: "title", title: "Judul usulan", type: "string", readOnly: true }),
    defineField({ name: "topic", title: "Topik", type: "string", readOnly: true }),
    defineField({ name: "story", title: "Cerita", type: "text", rows: 12, readOnly: true }),
    defineField({ name: "consentToPublish", title: "Persetujuan publikasi", type: "boolean", readOnly: true }),
    defineField({ name: "submittedAt", title: "Dikirim pada", type: "datetime", readOnly: true }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "submitted",
      options: {
        layout: "radio",
        list: [
          { title: "Baru", value: "submitted" },
          { title: "Sedang ditinjau", value: "underReview" },
          { title: "Perlu revisi", value: "needsRevision" },
          { title: "Diterima", value: "accepted" },
          { title: "Ditolak", value: "rejected" },
          { title: "Sudah terbit", value: "published" },
        ],
      },
    }),
    defineField({ name: "editorNotes", title: "Catatan editor", type: "text", rows: 5 }),
  ],
  preview: {
    select: { title: "title", subtitle: "name", status: "status" },
    prepare({ title, subtitle, status }) {
      return { title: title || "Tanpa judul", subtitle: `${subtitle || "Anonim"} · ${status || "submitted"}` };
    },
  },
});
