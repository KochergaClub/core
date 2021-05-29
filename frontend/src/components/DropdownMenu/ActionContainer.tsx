import styled from 'styled-components';

import { colors, fonts } from '~/frontkit';

export const ActionContainer = styled.div`
  padding: 8px 12px;
  font-size: ${fonts.sizes.SM};
  &:hover {
    background-color: ${colors.grey[100]};
  }
`;
