import Head from 'next/head';

export default function CustomHead() {
  const browserTitle = 'DintiiTai - Dentist Cluj | Dr. Natalia Rednic';
  const description =
    'Cabinet stomatologic modern în Cluj-Napoca. Dr. Natalia Rednic oferă tratamente dentare, implanturi, albire și protetică. Programează-te la DintiiTai.';

  return (
    <Head>
      <title>{browserTitle}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={browserTitle} />
      <meta property='og:description' content={description} />
    </Head>
  );
}
