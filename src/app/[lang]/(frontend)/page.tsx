import ImageSlider from "@/components/components/ImageSlider";
import Stage from "@/components/components/Stage";
import TextImage from "@/components/components/TextImage";
import { sanityFetch } from "@/sanity/lib/live";
import { ARTICLE_QUERY, GALLERY_QUERY, STAGE_QUERY } from "@/sanity/lib/queries";

export default async function Page({
  params
}: Readonly<{
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params

  const { data: stageData } = await sanityFetch({ query: STAGE_QUERY, params: { language: lang } });
  const { data: articleData } = await sanityFetch({ query: ARTICLE_QUERY, params: { language: lang } });
  const { data: images } = await sanityFetch({ query: GALLERY_QUERY })

  return (
    <section>
      {stageData && <Stage {...stageData} />}
      {articleData[0] && <TextImage article={articleData[0]} />}
      {images && <ImageSlider images={images} />}

      <div className="h-100 bg-base-dark mt-8"></div>
      <div className="h-100 bg-background"></div>
      <div className="h-100 bg-base-light"></div>
      <div className="h-100 bg-black"></div>
    </section>
  );
}