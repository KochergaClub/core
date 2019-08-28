import styled from 'styled-components';

import Card from './Card';

import { colors } from '@kocherga/frontkit';

const MutedCard = styled(Card)`
  color: ${colors.grey[700]};
  background-color: ${colors.grey[100]};
`;

export default MutedCard;
