"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";

const nav = [
  { href: "/", label: "Beranda" },
  { href: "/artikel", label: "Artikel" },
  { href: "/#topik", label: "Topik" },
  { href: "/#kontributor", label: "Kontributor" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement">
        <div className="container announcement__inner">
          <span><Icon name="leaf" width={16} height={16}/> Bertumbuh bersama, sesuai fitrah</span>
          <a href="https://www.iqrolife.id/" target="_blank" rel="noreferrer">Kunjungi Komunitas <Icon name="external" width={14} height={14}/></a>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="brand" aria-label="Ruang Tumbuh Iqrolife">
            <Image src="/images/logo-iqrolife.png" alt="Logo Iqrolife" width={64} height={64} priority />
            <span><strong>Ruang Tumbuh</strong><small>oleh Iqrolife</small></span>
          </Link>
          <nav className="desktop-nav" aria-label="Navigasi utama">
            {nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </nav>
          <div className="header-actions">
            <Link href="/artikel" className="icon-button" aria-label="Cari artikel"><Icon name="search" /></Link>
            <Link href="/kirim-cerita" className="button button--small">Kirim Cerita</Link>
            <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Buka menu">
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {open && (
          <nav className="mobile-nav container" aria-label="Navigasi mobile">
            {nav.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
            <Link href="/kirim-cerita" onClick={() => setOpen(false)}>Kirim Cerita</Link>
          </nav>
        )}
      </header>
    </>
  );
}
