import { css } from 'styled-components';

import * as colors from './colors';

// Matches tailwind font sizes and names.
// Tailwind's 6xl is replaced with XL6 for convenience (so that we can use sizes.XL6 instead of sizes['XL6']).
export const sizes = {
  XS: '12px',
  SM: '14px',
  BASE: '16px',
  XL: '20px',
  XL2: '24px',
  XL3: '30px',
  XL5: '48px',
  XL6: '60px',
};

export const label = css`
  font-size: ${sizes.SM};
  font-weight: 500;
  /* line-height: 1.2; */
  color: ${colors.grey[500]};
`;
