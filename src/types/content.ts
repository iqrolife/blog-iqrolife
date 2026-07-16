export type SanityImage = {
  asset?: { _ref?: string; _type?: string };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
};

export type Author = {
  _id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  photo?: SanityImage | string;
  expertise?: string[];
};

export type Category = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
};

export type Program = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  targetAudience?: string;
  registrationUrl?: string;
};

export type PortableTextBlock = {
  _key: string;
  _type: string;
  style?: string;
  children?: Array<{ _key: string; _type: string; text: string; marks?: string[] }>;
  markDefs?: Array<Record<string, unknown>>;
  [key: string]: unknown;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: SanityImage | string;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
  author: Author;
  categories: Category[];
  body: PortableTextBlock[];
  relatedPrograms?: Program[];
  seoTitle?: string;
  seoDescription?: string;
};
