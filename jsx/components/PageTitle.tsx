import styled from 'styled-components';

interface Props {
  tall?: boolean;
}

const PageTitle = styled.h1<Props>`
  text-align: center;
  margin: ${props => (props.tall ? '2em' : '0.67em')} 0;
`;

export default PageTitle;
