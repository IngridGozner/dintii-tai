import { Footer } from '@/components/components/Footer';
import { Header } from '@/components/components/Header';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { SITEINFO_QUERY } from '@/sanity/lib/queries';

export default async function FrontendLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const { data: headerSiteInfo } = await sanityFetch({
    query: SITEINFO_QUERY,
    params: { language: lang },
  });
  const { data: footerSiteInfo } = await sanityFetch({
    query: SITEINFO_QUERY,
    params: { language: lang },
  });

  return (
    <section className='min-h-screen'>
      {headerSiteInfo && <Header {...headerSiteInfo} />}
      {children}
      {footerSiteInfo && <Footer {...footerSiteInfo} />}
      <SanityLive />
    </section>
  );
}
