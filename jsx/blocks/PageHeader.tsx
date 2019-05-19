import React from 'react';
import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

const Container = styled.div`
  background-color: ${colors.grey[100]};
  text-align: center;
`;

const Top = styled.div`
  display: block;
  padding-top: 24px;
  text-align: center;
`;

const Bottom = styled.div`
  display: block;
  padding-bottom: 24px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 64px;
  line-height: 1.2;
  margin: 24px 0;
`;

interface Props {
  title: string;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

export default function PageHeader({ title, top, bottom }: Props) {
  return (
    <Container>
      <Top>{top}</Top>
      <Title>{title}</Title>
      <Bottom>{bottom}</Bottom>
    </Container>
  );
}
