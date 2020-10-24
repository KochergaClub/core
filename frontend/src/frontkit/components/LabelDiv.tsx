import styled from 'styled-components';

import * as colors from '../colors';
import * as fonts from '../fonts';

// identical to label, but without <label>'s cursor quirk
export const LabelDiv = styled.div`
  display: block;
  ${fonts.label};
  font-weight: 500;
  color: ${colors.grey[700]};
`;
