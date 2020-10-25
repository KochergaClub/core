import styled from 'styled-components';

import * as colors from '../colors';
import * as fonts from '../fonts';

// identical to label, but without <label>'s cursor quirk
export const LabelDiv = styled.div`
  display: block;
  font-size: ${fonts.sizes.S};
  font-weight: 500;
  line-height: 1.2;
  color: ${colors.grey[600]};
`;
