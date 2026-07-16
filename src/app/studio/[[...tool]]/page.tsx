"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#f5f6ed", fontFamily: "system-ui" }}>
        <div style={{ maxWidth: 640, background: "white", padding: 36, borderRadius: 24, boxShadow: "0 18px 60px rgba(85,59,51,.12)" }}>
          <h1 style={{ color: "#553b33" }}>Sanity belum dikonfigurasi</h1>
          <p>Website sedang berjalan dalam demo mode. Salin <code>.env.example</code> menjadi <code>.env.local</code>, lalu isi <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>.</p>
          <p>Lihat panduan lengkap pada file <code>README.md</code>.</p>
          <a href="/" style={{ color: "#61813f", fontWeight: 700 }}>← Kembali ke website</a>
        </div>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
