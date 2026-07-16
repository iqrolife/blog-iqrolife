export const postsQuery = `
*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  readingTime,
  featured,
  seoTitle,
  seoDescription,
  body,
  author->{_id, name, "slug": slug.current, role, bio, photo, expertise},
  categories[]->{_id, title, "slug": slug.current, description, icon},
  relatedPrograms[]->{_id, title, "slug": slug.current, summary, targetAudience, registrationUrl}
}`;

export const categoriesQuery = `
*[_type == "category"] | order(title asc) {
  _id, title, "slug": slug.current, description, icon
}`;

export const authorsQuery = `
*[_type == "author"] | order(name asc) {
  _id, name, "slug": slug.current, role, bio, photo, expertise
}`;

export const programsQuery = `
*[_type == "program" && isActive != false] | order(title asc) {
  _id, title, "slug": slug.current, summary, targetAudience, registrationUrl
}`;
