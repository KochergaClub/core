import { createGlobalStyle } from 'styled-components';

import Head from 'next/head';

import { GlobalStyle as FrontkitGlobalStyle } from '@kocherga/frontkit';

export const IntroStyle = createGlobalStyle`
  @font-face {
    font-family: 'Intro';
    src: local('Intro'), url('/static/fonts/intro.woff2') format('woff2'), url('/static/fonts/intro.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
`;

const GlobalStyle = () => (
  <>
    <Head>
      <link rel="stylesheet" href="/static/normalize.css" />
      {/* NOTE - <GlobalFonts /> doesn't work for some reason */}
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=block&subset=cyrillic"
        rel="stylesheet"
      />
    </Head>
    <FrontkitGlobalStyle />
    <IntroStyle />
  </>
);

export default GlobalStyle;
