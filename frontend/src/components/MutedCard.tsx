import styled from 'styled-components';

import { colors } from '~/frontkit';

import { Card } from './cards';

const MutedCard = styled(Card)`
  color: ${colors.grey[700]};
  background-color: ${colors.grey[100]};
`;

export default MutedCard;
