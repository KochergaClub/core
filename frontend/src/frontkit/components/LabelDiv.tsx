import styled from 'styled-components';

import * as fonts from '../fonts';

// identical to Label, but without its cursor quirk
export const LabelDiv = styled.div`
  display: block;
  ${fonts.label}
`;
