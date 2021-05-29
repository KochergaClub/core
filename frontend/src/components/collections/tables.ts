import styled from 'styled-components';

import { colors } from '~/frontkit';

export const Table = styled.table`
  border-collapse: collapse;

  td,
  th {
    border: 1px solid ${colors.grey[300]};
    padding: 4px;
  }
`;

export const TableHeaderCell = styled.th`
  font-weight: 500;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${colors.grey[600]};
`;
