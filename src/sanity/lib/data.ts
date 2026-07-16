import { demoAuthors, demoCategories, demoPosts, demoPrograms } from "@/data/demo";
import { isSanityConfigured } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";
import { authorsQuery, categoriesQuery, postsQuery, programsQuery } from "@/sanity/lib/queries";
import type { Author, Category, Post, Program } from "@/types/content";

async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const result = await sanityClient.fetch<T>(query, {}, { next: { revalidate: 60 } });
    return result;
  } catch (error) {
    console.warn("Sanity fetch failed, using demo content.", error);
    return fallback;
  }
}

export async function getPosts(): Promise<Post[]> {
  return safeFetch<Post[]>(postsQuery, demoPosts);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  return safeFetch<Category[]>(categoriesQuery, demoCategories);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}

export async function getAuthors(): Promise<Author[]> {
  return safeFetch<Author[]>(authorsQuery, demoAuthors);
}

export async function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  const authors = await getAuthors();
  return authors.find((author) => author.slug === slug);
}

export async function getPrograms(): Promise<Program[]> {
  return safeFetch<Program[]>(programsQuery, demoPrograms);
}
