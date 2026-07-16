import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><div><span>🌱</span><h1>Halaman belum ditemukan</h1><p>Mungkin tautannya berubah atau kontennya belum diterbitkan.</p><Link className="button" href="/">Kembali ke beranda</Link></div></section>;
}
