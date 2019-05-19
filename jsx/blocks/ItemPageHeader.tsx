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

const SectionLink = styled.a`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;

  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

const Title = styled.h1`
  font-size: 64px;
  line-height: 1.2;
  margin: 24px 0;
`;

interface Props {
  title: string;
  sectionTitle: string;
  sectionLink: string;
  children?: React.ReactNode;
}

export default function ItemPageHeader({
  title,
  sectionTitle,
  sectionLink,
  children,
}: Props) {
  return (
    <Container>
      <Top>
        <SectionLink href={sectionLink}>{sectionTitle}</SectionLink>
      </Top>
      <Title>{title}</Title>
      <Bottom>{children}</Bottom>
    </Container>
  );
}
