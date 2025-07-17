import ImageSlider from "@/components/components/ImageSlider";
import Stage from "@/components/components/Stage";
import { sanityFetch } from "@/sanity/lib/live";
import { GALLERY_QUERY, STAGE_QUERY } from "@/sanity/lib/queries";

export default async function Page() {
  const { data: images } = await sanityFetch({ query: GALLERY_QUERY })
  const { data: stage } = await sanityFetch({ query: STAGE_QUERY });

  return (
    <section>
      {stage && <Stage {...stage} />}
      {images && <ImageSlider images={images} />}

      <div className="h-100 bg-base-dark mt-8"></div>
      <div className="h-100 bg-background"></div>
      <div className="h-100 bg-base-light"></div>
      <div className="h-100 bg-black"></div>
    </section>
  );
}