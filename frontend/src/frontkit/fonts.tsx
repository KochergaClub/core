import { css } from 'styled-components';

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
  font-size: ${sizes.XS};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;
