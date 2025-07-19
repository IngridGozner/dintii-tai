import { ARTICLE_SLUG_QUERYResult, SITEINFO_QUERYResult } from '@/sanity/types';

type HeadInfoProps = {
  siteInfo?: NonNullable<SITEINFO_QUERYResult>;
  article?: NonNullable<ARTICLE_SLUG_QUERYResult>;
}

export default function Head(props: HeadInfoProps) {
  const { siteInfo, article } = props;

  if (!siteInfo && !article) return null;

  const { title, name } = siteInfo || {};
  const { plainContent } = article || {};

  const browserTitle = siteInfo ? `${title} | ${name}` : ''
  const description = plainContent ? plainContent.substring(0, plainContent.indexOf(' ', 145)) + '...' : '';

  console.log('description', description)

  return (
    <head>
      <title>{browserTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={browserTitle} />
      <meta
        property="og:description"
        content={description}
      />
    </head>
  );
}
