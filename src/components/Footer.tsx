import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Image src="/images/logo-iqrolife.png" alt="Iqrolife" width={88} height={88} />
          <div>
            <h2>Ruang Tumbuh</h2>
            <p>Cerita, wawasan, dan praktik baik untuk keluarga yang terus belajar dan bertumbuh.</p>
          </div>
        </div>
        <div>
          <h3>Jelajahi</h3>
          <Link href="/artikel">Semua artikel</Link>
          <Link href="/#topik">Topik belajar</Link>
          <Link href="/#kontributor">Kontributor</Link>
          <Link href="/kirim-cerita">Kirim cerita</Link>
        </div>
        <div>
          <h3>Iqrolife</h3>
          <a href="https://www.iqrolife.id/" target="_blank" rel="noreferrer">Website komunitas</a>
          <a href="https://www.iqrolife.id/tentang-kami" target="_blank" rel="noreferrer">Tentang kami</a>
          <a href="https://www.iqrolife.id/kontak" target="_blank" rel="noreferrer">Kontak</a>
        </div>
        <div>
          <h3>Terhubung</h3>
          <p>Ikuti kabar dan kegiatan terbaru dari komunitas Iqrolife.</p>
          <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Icon name="instagram" width={19} height={19}/> Instagram</a>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Iqrolife. Bertumbuh bersama.</span>
        <span>Fitrah · Bertahap · Paripurna</span>
      </div>
    </footer>
  );
}
