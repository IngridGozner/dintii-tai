import { urlFor } from '@/sanity/lib/image';
import { SITEINFO_QUERYResult } from '@/sanity/types';

export default function SchemaScript({
  siteInfo,
}: {
  siteInfo?: SITEINFO_QUERYResult;
}) {
  const { description, logo, title, phone, address, postalCode, city } =
    siteInfo || {};
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: title,
          description: description,
          image: logo ? urlFor(logo).width(300).height(300).url() : undefined,
          address: {
            '@type': 'PostalAddress',
            streetAddress: address,
            addressLocality: city,
            postalCode: postalCode,
            addressCountry: 'RO',
          },
          telephone: phone,
        }),
      }}
    />
  );
}
