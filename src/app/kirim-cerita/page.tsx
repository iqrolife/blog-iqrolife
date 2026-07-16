import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { StoryForm } from "@/components/StoryForm";

export const metadata: Metadata = { title: "Kirim Cerita", description: "Bagikan pengalaman dan pembelajaran keluarga Anda kepada komunitas Iqrolife." };

export default function SubmitStoryPage() {
  return (
    <section className="submit-page">
      <div className="container submit-page__grid">
        <div className="submit-page__intro">
          <span className="eyebrow"><Icon name="leaf" width={18} height={18}/> Cerita Anda berarti</span>
          <h1>Bagikan proses, bukan kesempurnaan.</h1>
          <p>Pengalaman sederhana dari keluarga Anda dapat membantu keluarga lain merasa dipahami, menemukan ide, atau berani mencoba langkah baru.</p>
          <div className="submit-guidelines"><h2>Cerita yang kami cari</h2><ul><li><Icon name="check"/>Pengalaman nyata dan refleksi pribadi</li><li><Icon name="check"/>Praktik baik yang dapat menginspirasi</li><li><Icon name="check"/>Tantangan serta pelajaran yang ditemukan</li><li><Icon name="check"/>Tulisan yang menghargai privasi anak</li></ul></div>
          <div className="editorial-note"><strong>Setelah dikirim</strong><p>Tim editorial akan membaca cerita Anda. Kami dapat menghubungi Anda untuk klarifikasi dan proses penyuntingan sebelum publikasi.</p></div>
        </div>
        <div className="form-card"><div className="form-card__head"><span>Form kontribusi</span><h2>Ceritakan perjalanan Anda</h2><p>Isi dengan santai. Draf tidak harus sempurna.</p></div><StoryForm/></div>
      </div>
    </section>
  );
}
