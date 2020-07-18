import styled from 'styled-components';

import { colors, fonts } from '@kocherga/frontkit';

const HintCard = styled.div`
  border: 1px solid ${colors.grey[300]};
  background-color: ${colors.grey[100]};
  font-size: ${fonts.sizes.S};
  max-width: 660px;
  padding: 10px 16px;
`;

export default HintCard;
