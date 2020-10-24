import styled from 'styled-components';

import { colors } from '~/frontkit';

interface Props {
  tall?: boolean;
}

const PageTitle = styled.h1<Props>`
  display: block;
  width: 100%;

  text-align: center;
  padding: ${props => (props.tall ? '2em' : '0.67em')} 20px;
  margin: 0;
  background-color: ${colors.grey[100]};
`;

export default PageTitle;
