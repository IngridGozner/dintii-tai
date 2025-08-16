import Contact from '@/components/components/Contact';
import ImageSlider from '@/components/components/ImageSlider';
import ScheduleCard from '@/components/components/ScheduleCard';
import Stage from '@/components/components/Stage';
import TextImage from '@/components/components/TextImage';
import { defaultDictionaryEntries } from '@/components/providers/DictionaryProvider';
import { sanityFetch } from '@/sanity/lib/live';
import {
  ARTICLE_SLUG_QUERY,
  SITEINFO_QUERY,
  GALLERY_QUERY,
  STAGE_QUERY,
  TREATMENT_QUERY,
} from '@/sanity/lib/queries';
import { getDictionaryEntries } from '../layout';
import Table from '@/components/components/Tables/Table';

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  const { data: stageData } = await sanityFetch({
    query: STAGE_QUERY,
    params: { language: lang },
  });
  const { data: mottoData } = await sanityFetch({
    query: ARTICLE_SLUG_QUERY,
    params: { language: lang, slug: 'your-teeth-our-care' },
  });
  const { data: aboutUsData } = await sanityFetch({
    query: ARTICLE_SLUG_QUERY,
    params: { language: lang, slug: 'about-us' },
  });
  const { data: images } = await sanityFetch({ query: GALLERY_QUERY });
  const { data: treatmentGroups } = await sanityFetch({
    query: TREATMENT_QUERY,
    params: { language: lang },
  });
  const { data: footerData } = await sanityFetch({
    query: SITEINFO_QUERY,
    params: { language: lang },
  });

  const dictionaryEntries = await getDictionaryEntries(lang);

  return (
    <main>
      {stageData && <Stage {...stageData} />}
      {mottoData && (
        <TextImage article={mottoData} darkBackground contentClass='!mt-0' />
      )}
      {treatmentGroups && (
        <Table
          treatments={treatmentGroups}
          dictionaryEntries={dictionaryEntries || defaultDictionaryEntries}
        />
      )}
      {aboutUsData && (
        <TextImage darkBackground article={aboutUsData} anchor='aboutus' />
      )}
      {images && <ImageSlider images={images} />}
      {footerData && (
        <ScheduleCard
          siteInfo={footerData}
          dictionaryEntries={dictionaryEntries || defaultDictionaryEntries}
        />
      )}
      {footerData && (
        <Contact
          siteInfo={footerData}
          dictionaryEntries={dictionaryEntries || defaultDictionaryEntries}
        />
      )}
    </main>
  );
}

export const revalidate = 300;
