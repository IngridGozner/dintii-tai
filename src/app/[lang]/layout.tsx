import "@/app/globals.css";
import Head from "@/components/components/Head";
import { routing } from "@/i18n/routing";
import { sanityFetch } from "@/sanity/lib/live";
import { ARTICLE_SLUG_QUERY, SITEINFO_QUERY } from "@/sanity/lib/queries";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  const { data: siteInfo } = await sanityFetch({ query: SITEINFO_QUERY, params: { language: lang } })
  const { data: aboutUsData } = await sanityFetch({ query: ARTICLE_SLUG_QUERY, params: { language: lang, slug: 'about-us' } });

  return (
    <html lang={lang}>
      <Head siteInfo={siteInfo || undefined} article={aboutUsData || undefined} />
      <body>{children}</body>
    </html>
  );
}