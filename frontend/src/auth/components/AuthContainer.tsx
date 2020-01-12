import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  max-width: 400px;
  margin-bottom: 25vh;
`;

const Box = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0 #bbb;
`;

const AuthContainer: React.FC = ({ children, ...props }) => (
  <Wrapper {...props}>
    <Box>{children}</Box>
  </Wrapper>
);
export default AuthContainer;
