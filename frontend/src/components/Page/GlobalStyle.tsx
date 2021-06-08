import Head from 'next/head';

import { staticUrl } from '~/common/utils';

const GlobalStyle = () => (
  <Head>
    {[
      'fonts/roboto-v27-latin_cyrillic-regular.woff2',
      'fonts/roboto-v27-latin_cyrillic-italic.woff2',
      'fonts/roboto-v27-latin_cyrillic-500.woff2',
      'fonts/roboto-v27-latin_cyrillic-500italic.woff2',
      'fonts/roboto-v27-latin_cyrillic-700.woff2',
      'fonts/roboto-v27-latin_cyrillic-700italic.woff2',
    ].map((url, i) => (
      <link
        key={i}
        rel="preload"
        href={staticUrl(url)}
        as="font"
        type="font/woff2"
        crossOrigin=""
      />
    ))}
  </Head>
);

export default GlobalStyle;
