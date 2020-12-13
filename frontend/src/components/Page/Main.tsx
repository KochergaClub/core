import styled from 'styled-components';

interface Props {
  wide?: boolean;
}

const Main = styled.div<Props>`
  max-width: ${(props) => (props.wide ? '2000px' : '1080px')};
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  min-height: 600px;
`;

export default Main;
