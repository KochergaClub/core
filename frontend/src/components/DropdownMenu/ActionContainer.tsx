import styled from 'styled-components';
import { colors, fonts } from '@kocherga/frontkit';

const ActionContainer = styled.div`
  padding: 8px 12px;
  font-size: ${fonts.sizes.S};
  &:hover {
    background-color: ${colors.grey[100]};
  }
`;

export default ActionContainer;
