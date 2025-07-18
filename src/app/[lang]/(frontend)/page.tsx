import Contact from "@/components/components/Contact";
import ImageSlider from "@/components/components/ImageSlider";
import ScheduleCard from "@/components/components/ScheduleCard";
import Stage from "@/components/components/Stage";
import Table from "@/components/components/Table";
import TextImage from "@/components/components/TextImage";
import { sanityFetch } from "@/sanity/lib/live";
import { ARTICLE_SLUG_QUERY, FOOTER_SITEINFO_QUERY, GALLERY_QUERY, STAGE_QUERY, TREATMENT_QUERY } from "@/sanity/lib/queries";

export default async function Page({
  params
}: Readonly<{
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params

  const { data: stageData } = await sanityFetch({ query: STAGE_QUERY, params: { language: lang } });
  const { data: mottoData } = await sanityFetch({ query: ARTICLE_SLUG_QUERY, params: { language: lang, slug: 'your-teeth-our-care' } });
  const { data: aboutUsData } = await sanityFetch({ query: ARTICLE_SLUG_QUERY, params: { language: lang, slug: 'about-us' } });
  const { data: images } = await sanityFetch({ query: GALLERY_QUERY })
  const { data: treatmentGroups } = await sanityFetch({ query: TREATMENT_QUERY, params: { language: lang } });
  const { data: footerData } = await sanityFetch({ query: FOOTER_SITEINFO_QUERY, params: { language: lang } })

  return (
    <section>
      {stageData && <Stage {...stageData} />}
      {mottoData && <TextImage article={mottoData} darkBackground contentClass="!mt-0" />}
      {treatmentGroups && <Table {...treatmentGroups} />}
      {aboutUsData && <TextImage darkBackground article={aboutUsData} anchor="aboutus" />}
      {images && <ImageSlider images={images} />}
      {footerData && <ScheduleCard {...footerData} />}
      {footerData && <Contact {...footerData} />}
    </section>
  );
}