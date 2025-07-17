import ImageSlider from "@/components/components/ImageSlider";
import { sanityFetch } from "@/sanity/lib/live";
import { GALLERY_QUERY } from "@/sanity/lib/queries";

export default async function Page() {
  const { data: images } = await sanityFetch({ query: GALLERY_QUERY })

  return (
    <section>
      {images && <ImageSlider images={images} />}

      <div className="h-100 bg-base-dark"></div>
      <div className="h-100 bg-background"></div>
      <div className="h-100 bg-base-light"></div>
      <div className="h-100 bg-black"></div>
    </section>
  );
}