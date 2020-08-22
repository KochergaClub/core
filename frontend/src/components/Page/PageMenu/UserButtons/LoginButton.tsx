import styled from 'styled-components';
import Link from 'next/link';

const Button = styled.button`
  border-radius: 20px;
  border: none;
  color: black;
  background-color: white;
  height: 40px;
  font-weight: bold;
  font-size: 14px;
  padding: 0 24px;
  cursor: pointer;
`;

const LoginButton: React.FC = () => (
  <Link href="/my" passHref>
    <a style={{ textDecoration: 'none' }}>
      <Button>Войти</Button>
    </a>
  </Link>
);

export default LoginButton;
