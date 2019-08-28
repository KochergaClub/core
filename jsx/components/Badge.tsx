import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

interface Props {
  type?: 'accent' | 'default';
}

const Badge = styled.div<Props>`
  background-color: ${props =>
    props.type && props.type === 'accent'
      ? colors.accent[500]
      : colors.primary[300]};
  border-radius: 10px;
  font-size: 12px;
  min-width: 20px;
  padding: 2px 6px;
  width: auto;
`;

export default Badge;
