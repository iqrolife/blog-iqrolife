import { Icon } from "@/components/Icon";

export function SearchForm({ defaultValue = "", category = "" }: { defaultValue?: string; category?: string }) {
  return (
    <form className="search-form" action="/artikel" method="get">
      <Icon name="search" width={20} height={20} />
      <input name="q" type="search" defaultValue={defaultValue} placeholder="Cari topik, judul, atau kata kunci…" aria-label="Cari artikel" />
      {category && <input type="hidden" name="kategori" value={category} />}
      <button type="submit">Cari</button>
    </form>
  );
}
