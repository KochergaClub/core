import styled, { css } from 'styled-components';

import { grey } from '../colors';

export const HR_css = css`
  margin: 32px 0;
  height: 1px;
  border: 0;
  border-top: 1px solid ${grey[200]};
`;

export const HR = styled.hr`
  ${HR_css};
`;
