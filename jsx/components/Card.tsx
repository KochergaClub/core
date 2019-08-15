import styled from 'styled-components';

import { Column, colors } from '@kocherga/frontkit';

const Card = styled.div`
  border: 1px solid ${colors.grey[200]};
  padding: 10px 20px;
`;

export const CardList: React.FC = ({ children }) => (
  <Column stretch gutter={10}>
    {children}
  </Column>
);

export default Card;
