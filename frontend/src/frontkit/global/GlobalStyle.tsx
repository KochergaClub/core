import { createGlobalStyle } from 'styled-components';

import * as fonts from '../fonts';

// See https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ re: box-sizing
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'Roboto', Arial, sans-serif;
    font-size: ${fonts.sizes.N};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  ul, ol {
    padding-left: 40px;
  }

  p {
    margin: 16px 0;
  }

  h2, h3, h4 {
    margin: 16px 0;
  }
`;
