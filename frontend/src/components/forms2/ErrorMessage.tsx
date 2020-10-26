import styled from 'styled-components';

import { colors } from '~/frontkit';

const ErrorMessage = styled.small`
  color: ${colors.accent[700]};
  font-weight: bold;
  ::before {
    content: '⚠ ';
  }
`;

export default ErrorMessage;
