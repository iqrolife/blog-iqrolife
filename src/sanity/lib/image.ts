import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/types/content";
import { dataset, projectId } from "@/sanity/env";

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null;

export function imageUrl(source: SanityImage | string | undefined, width = 1200, height = 720) {
  if (!source) return "/images/article-growing.svg";
  if (typeof source === "string") return source;
  if (!builder || !source.asset) return "/images/article-growing.svg";
  return builder.image(source).width(width).height(height).fit("crop").auto("format").url();
}
