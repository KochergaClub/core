import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

import { GlobalStyle as FrontkitGlobalStyle } from '@kocherga/frontkit';

import { staticUrl } from '~/common/utils';

// normalize.css 8.0.1 without IE sections
const NormalizeStyle = createGlobalStyle`
html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}abbr[title]{text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}
`;

const IntroStyle = createGlobalStyle`
  @font-face {
    font-family: 'Intro';
    src: local('Intro'), url('${staticUrl(
      'fonts/intro.woff2'
    )}') format('woff2'), url('${staticUrl(
  'fonts/intro.woff'
)}') format('woff');
    font-weight: 400;
    font-style: normal;
  }
`;

const GlobalStyle = () => (
  <>
    <Head>
      {/* NOTE - <GlobalFonts /> doesn't work for some reason */}
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=block&subset=cyrillic"
        rel="stylesheet"
      />
    </Head>
    <NormalizeStyle />
    <FrontkitGlobalStyle />
    <IntroStyle />
  </>
);

export default GlobalStyle;
