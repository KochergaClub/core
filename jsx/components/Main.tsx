import styled from 'styled-components';

interface Props {
  wide?: boolean;
}

const Main = styled.main<Props>`
  max-width: ${props => (props.wide ? '2000px' : '1080px')};
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  min-height: 600px;
`;

export default Main;
