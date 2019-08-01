import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

const Badge = styled.div`
  background-color: ${colors.accent[500]};
  border-radius: 10px;
  font-size: 12px;
  min-width: 20px;
  padding: 2px 6px;
  width: auto;
`;

export default Badge;
