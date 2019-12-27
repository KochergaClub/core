import * as React from 'react';
import styled from 'styled-components';

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

const MenuButton: React.FC<{ href: string }> = ({ href, children }) => (
  <a href={href} style={{ textDecoration: 'none' }}>
    <Button>{children}</Button>
  </a>
);

export default MenuButton;
