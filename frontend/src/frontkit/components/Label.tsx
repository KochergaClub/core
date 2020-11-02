import styled from 'styled-components';

import * as colors from '../colors';
import * as fonts from '../fonts';

export const Label = styled.label`
  display: block;
  font-size: ${fonts.sizes.S};
  font-weight: 500;
  line-height: 1.2;
  color: ${colors.grey[600]};
`;
