import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

const HintCard = styled.div`
  border: 1px solid ${colors.grey[300]};
  background-color: ${colors.grey[100]};
  max-width: 660px;
  margin: 0 auto;
  padding: 20px;
`;

export default HintCard;
