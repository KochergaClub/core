import Head from 'next/head';

import { staticUrl } from '~/common/utils';

const GlobalStyle = () => (
  <>
    <Head>
      {/* NOTE - <GlobalFonts /> doesn't work for some reason */}
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=block&subset=cyrillic"
        rel="stylesheet"
      />
      <link rel="preload" href={staticUrl('fonts/intro.woff2')} />
    </Head>
    {/* <NormalizeStyle /> */}
    {/* <FrontkitGlobalStyle /> */}
    {/* <IntroStyle /> */}
  </>
);

export default GlobalStyle;
