import styled from 'styled-components';

import * as colors from '../colors';
import * as fonts from '../fonts';

export const Label = styled.label`
  display: block;
  ${fonts.label};
  font-weight: 500;
  color: ${colors.grey[700]};
`;
