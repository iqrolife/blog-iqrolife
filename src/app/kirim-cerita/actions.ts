"use server";

import { z } from "zod";
import { isSanityConfigured, writeToken } from "@/sanity/env";
import { sanityWriteClient } from "@/sanity/lib/writeClient";

const storySchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter."),
  email: z.email("Format email tidak valid."),
  phone: z.string().trim().max(30).optional(),
  topic: z.string().trim().min(2, "Pilih topik cerita."),
  title: z.string().trim().min(8, "Judul minimal 8 karakter.").max(120),
  story: z.string().trim().min(100, "Cerita minimal 100 karakter.").max(12000),
  consent: z.string().refine((value) => value === "yes", "Persetujuan perlu dicentang."),
});

export type StoryFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitStory(_: StoryFormState, formData: FormData): Promise<StoryFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = storySchema.safeParse(raw);
  if (!parsed.success) return { status: "error", message: "Periksa kembali data yang Anda masukkan.", errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };

  if (!isSanityConfigured || !writeToken) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { status: "success", message: "Cerita berhasil divalidasi dalam demo mode. Isi konfigurasi Sanity dan write token agar data tersimpan permanen." };
  }

  try {
    await sanityWriteClient.create({
      _type: "storySubmission",
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || "",
      topic: parsed.data.topic,
      title: parsed.data.title,
      story: parsed.data.story,
      consentToPublish: true,
      submittedAt: new Date().toISOString(),
      status: "submitted",
    });
    return { status: "success", message: "Terima kasih. Cerita Anda sudah diterima dan akan ditinjau oleh tim Iqrolife." };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Cerita belum berhasil dikirim. Silakan coba lagi beberapa saat." };
  }
}
