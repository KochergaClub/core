import styled from 'styled-components';

import { A_css } from './A';
import { HR_css } from './HR';

export const RichText = styled.div`
  word-wrap: break-word;

  a {
    ${A_css};
  }

  hr {
    ${HR_css};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .responsive-object {
    position: relative;
  }

  .responsive-object iframe,
  .responsive-object object,
  .responsive-object embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
