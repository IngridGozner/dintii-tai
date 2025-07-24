import { defineQuery } from 'next-sanity'

export const SITEINFO_QUERY =
  defineQuery(`*[_type == "siteInfo"][0]{
  _id,
  title,
  subtitle[_key == $language][0]{value},
  name,
  profession[_key == $language][0]{value},
  logo,
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
  },
  name,
  profession[_key == $language][0]{value}
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
  "plainContent":pt::text(body[_key == $language].value)
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
}`)

export const DICTIONARY_QUERY =
  defineQuery(`*[_type == "dictionary"][0]{
  "prices": prices[_key == $language][0].value,
  "aboutUs":aboutUs[_key == $language][0].value,
  "pricesTableTitle":pricesTableTitle[_key == $language][0].value,
  "treatmentTableTitle":treatmentTableTitle[_key == $language][0].value,
  "contact":contact[_key == $language][0].value,
  "schedule":schedule[_key == $language][0].value,
}`)
