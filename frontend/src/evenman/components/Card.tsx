import styled from 'styled-components';

import { colors } from '~/frontkit';

export const Card = styled.div`
  border-top: 1px solid ${colors.grey[200]};
  min-height: 50vh;
`;

export const CardHeader = styled.header`
  background-color: ${colors.grey[100]};
  border-bottom: 1px solid ${colors.grey[200]};
  padding: 12px;
`;

export const CardBody = styled.div`
  padding: 12px;
  max-width: 800px;
  margin: 0 auto;
`;

export const EmptyCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  color: #888;
`;
