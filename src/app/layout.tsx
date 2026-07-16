import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Ruang Tumbuh Iqrolife", template: "%s | Ruang Tumbuh Iqrolife" },
  description: "Cerita, wawasan, dan praktik baik untuk keluarga yang terus belajar dan bertumbuh sesuai fitrah.",
  icons: { icon: "/images/icon.png", apple: "/images/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Ruang Tumbuh Iqrolife",
    title: "Ruang Tumbuh Iqrolife",
    description: "Cerita, wawasan, dan praktik baik untuk keluarga.",
    images: [{ url: "/images/og-iqrolife.svg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
