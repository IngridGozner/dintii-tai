import Table from '@/components/components/Tables/Table';
import { sanityFetch } from '@/sanity/lib/live';
import { TREATMENT_QUERY } from '@/sanity/lib/queries';

export default async function PricesPage({
  params,
}: Readonly<{
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const { data: treatmentGroups } = await sanityFetch({
    query: TREATMENT_QUERY,
    params: { language: lang },
  });

  return (
    <main>
      {treatmentGroups && (
        <Table treatments={treatmentGroups} showPrices={true} />
      )}
    </main>
  );
}
