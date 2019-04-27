import React from 'react';

import styled from 'styled-components';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Header = styled.header`
  margin: 45px auto;

  text-align: center;
  font-size: 64px;
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: 640px) {
    font-size: 32px;
  }
`;

const Description = styled.header`
  margin: 0 auto 65px;
  max-width: 960px;
  padding: 0 20px;

  text-align: center;
  font-size: 24px;
  font-weight: 200;
  line-height: 1.5;

  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

export default ({ title, children }: Props) => (
  <div>
    <Header>{title}</Header>
    <Description>{children}</Description>
  </div>
);
