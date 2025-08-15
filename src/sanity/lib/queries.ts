import { defineQuery } from 'next-sanity';

export const SITEINFO_QUERY = defineQuery(`*[_type == "siteInfo"][0]{
  _id,
  title,
  subtitle[_key == $language][0]{value},
  name,
  profession[_key == $language][0]{value},
  logo,
  phone,
  address,
  email, 
  timetable[_key == $language][0]{value},
  loginImage->{
    image
  },
}`);

export const GALLERY_QUERY = defineQuery(`*[_type == "gallery"]{
  _id,
  title,
  image
}`);

export const STAGE_QUERY = defineQuery(`*[_type == "siteInfo"][0]{
  _id,
  motto[_key == $language][0]{value},
  stageImage->{
    image
  },
  name,
  profession[_key == $language][0]{value}
}`);

export const ARTICLE_QUERY = defineQuery(`*[_type == "article"]{
  _id,
  title[_key == $language][0]{value},
  image,
  body[_key == $language][0]{value},
}`);

export const ARTICLE_SLUG_QUERY =
  defineQuery(`*[_type == "article"][slug.current == $slug][0] {
  _id,
  title[_key == $language][0]{value},
  image,
  body[_key == $language][0]{value},
  "plainContent":pt::text(body[_key == $language].value)
}`);

export const TREATMENT_QUERY =
  defineQuery(`*[_type == "treatmentGroup"] | order(order asc) {
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
}`);

export const DICTIONARY_QUERY = defineQuery(`*[_type == "dictionary"][0]{
  "prices": prices[_key == $language][0].value,
  "aboutUs":aboutUs[_key == $language][0].value,
  "pricesTableTitle":pricesTableTitle[_key == $language][0].value,
  "treatmentTableTitle":treatmentTableTitle[_key == $language][0].value,
  "contact":contact[_key == $language][0].value,
  "schedule":schedule[_key == $language][0].value,
  "login":login[_key == $language][0].value,
  "email":email[_key == $language][0].value,
  "password":password[_key == $language][0].value,
  "dashboard":dashboard[_key == $language][0].value,
  "patients":patients[_key == $language][0].value,
  "menu":menu[_key == $language][0].value,
  "general":general[_key == $language][0].value,
  "logout":logout[_key == $language][0].value,
  "firstName": firstName[_key == $language][0].value,
  "lastName": lastName[_key == $language][0].value,
  "phone": phone[_key == $language][0].value,
  "city": city[_key == $language][0].value,
  "country": country[_key == $language][0].value,
  "patientFile": patientFile[_key == $language][0].value,
  "birthdate": birthdate[_key == $language][0].value,
  "date": date[_key == $language][0].value,
  "price": price[_key == $language][0].value,
  "gdpr": gdpr[_key == $language][0].value,
  "consent": consent[_key == $language][0].value,
  "editPatient": editPatient[_key == $language][0].value,
  "addPatient": addPatient[_key == $language][0].value,
  "deletePatient": deletePatient[_key == $language][0].value,
  "profile": profile[_key == $language][0].value,
  "save": save[_key == $language][0].value,
  "cancel": cancel[_key == $language][0].value,
  "cnp": cnp
}`);
