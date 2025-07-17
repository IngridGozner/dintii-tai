import { defineQuery } from 'next-sanity'

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`)

export const POSTS_SLUGS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`)

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`)

export const HEADER_SITEINFO_QUERY =
  defineQuery(`*[_type == "siteInfo"][0]{
  _id,
  title,
  subtitle[_key == $language][0]{value},
  logo,
  phone
}`)

export const FOOTER_SITEINFO_QUERY =
  defineQuery(`*[_type == "siteInfo"][0]{
  _id,
  phone,
  address,
  email, 
  timetable[_key == $language][0]{value}
}`)

export const GALLERY_QUERY =
  defineQuery(`*[_type == "gallery"]{
  _id,
  title,
  image
}`)

export const STAGE_QUERY =
  defineQuery(`*[_type == "siteInfo"][0]{
  _id,
  motto[_key == $language][0]{value},
  stageImage->{
    image
  }
}`)

export const ARTICLE_QUERY =
  defineQuery(`*[_type == "article"]{
  _id,
  title[_key == $language][0]{value},
  image,
  body[_key == $language][0]{value},
}`)

export const TREATMENT_QUERY = defineQuery(`*[_type == "treatmentGroup"] | order(order asc) {
  _id,
  name[_key == $language][0]{value},
  order,
  slug,
  "treatments": *[_type == "treatment" && references(^._id)]
    | order(name[_key == $language][0].value asc) {
      _id,
      name[_key == $language][0]{value},
      price,
      slug
    }
}
`)





