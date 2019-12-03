import React from 'react';
import styled from 'styled-components';

import PageHeader from './PageHeader';

const SectionLink = styled.a`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;

  color: black;
  text-decoration: none;
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
  const top = <SectionLink href={sectionLink}>{sectionTitle}</SectionLink>;
  return <PageHeader top={top} bottom={children} title={title} />;
}
