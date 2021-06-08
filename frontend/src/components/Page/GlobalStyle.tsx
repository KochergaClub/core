import Head from 'next/head';

import { staticUrl } from '~/common/utils';

const GlobalStyle = () => (
  <Head>
    <link rel="preload" href={staticUrl('fonts/intro.woff2')} />
    <link
      rel="preload"
      href={staticUrl('fonts/roboto-v27-latin_cyrillic-regular.woff2')}
    />
    <link
      rel="preload"
      href={staticUrl('fonts/roboto-v27-latin_cyrillic-italic.woff2')}
    />
    <link
      rel="preload"
      href={staticUrl('fonts/roboto-v27-latin_cyrillic-500.woff2')}
    />
    <link
      rel="preload"
      href={staticUrl('fonts/roboto-v27-latin_cyrillic-500italic.woff2')}
    />
    <link
      rel="preload"
      href={staticUrl('fonts/roboto-v27-latin_cyrillic-700.woff2')}
    />
    <link
      rel="preload"
      href={staticUrl('fonts/roboto-v27-latin_cyrillic-700italic.woff2')}
    />
  </Head>
);

export default GlobalStyle;
