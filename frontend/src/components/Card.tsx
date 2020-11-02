import styled from 'styled-components';

import { Column, colors } from '~/frontkit';

const Card = styled.div`
  border: 1px solid ${colors.grey[200]};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 12px 20px;
`;

export const CardHeader: React.FC = ({ children }) => (
  <header>
    <strong>{children}</strong>
  </header>
);

export const CardList: React.FC = ({ children }) => (
  <Column stretch gutter={20}>
    {children}
  </Column>
);

export default Card;
