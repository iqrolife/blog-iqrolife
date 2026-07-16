import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { imageUrl } from "@/sanity/lib/image";
import type { PortableTextBlock } from "@/types/content";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const target = value?.blank ? "_blank" : undefined;
      return <a href={value?.href} target={target} rel={target ? "noreferrer" : undefined}>{children}</a>;
    },
  },
  types: {
    image: ({ value }) => <figure><img src={imageUrl(value, 1200, 800)} alt={value.alt || "Ilustrasi artikel"} />{value.alt && <figcaption>{value.alt}</figcaption>}</figure>,
    callout: ({ value }) => <aside className={`article-callout article-callout--${value.tone || "green"}`}><strong>{value.title}</strong><p>{value.text}</p></aside>,
  },
};

export function PortableArticle({ value }: { value: PortableTextBlock[] }) {
  return <div className="article-body"><PortableText value={value as never} components={components} /></div>;
}
