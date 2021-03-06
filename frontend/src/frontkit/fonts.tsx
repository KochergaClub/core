import { css } from 'styled-components';

import * as colors from './colors';

export const sizes = {
  XXXL: '64px',
  XXL: '48px',
  XL: '32px',
  L: '24px',
  N: '16px',
  S: '14px',
  XS: '12px',
};

export const label = css`
  font-size: ${sizes.S};
  font-weight: 500;
  line-height: 1.2;
  color: ${colors.grey[600]};
`;
