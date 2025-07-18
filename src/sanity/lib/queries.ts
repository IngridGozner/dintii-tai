import { defineQuery } from 'next-sanity'

export const HEADER_SITEINFO_QUERY =
  defineQuery(`*[_type == "siteInfo"][0]{
  _id,
  title,
  subtitle[_key == $language][0]{value},
  name,
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

export const ARTICLE_SLUG_QUERY =
  defineQuery(`*[_type == "article"][slug.current == $slug][0] {
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
