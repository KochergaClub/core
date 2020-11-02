import styled, { css } from 'styled-components';

import * as colors from '../colors';

export const A_css = css`
  color: ${colors.link};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const A = styled.a`
  ${A_css};
`;
