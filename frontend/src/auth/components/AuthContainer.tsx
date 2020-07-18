import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 400px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0 #bbb;
`;

const AuthContainer: React.FC = ({ children, ...props }) => (
  <Wrapper {...props}>{children}</Wrapper>
);
export default AuthContainer;
