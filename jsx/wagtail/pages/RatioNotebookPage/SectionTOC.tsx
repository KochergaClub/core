import React from 'react';

import styled from 'styled-components';

import { Props } from '../RatioNotebookPage';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  @media screen {
    min-height: 600px;
  }
`;

const Line = styled.a`
  display: block;
  color: black;
  text-decoration: none;
  border-bottom: 1px solid #888;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

export default function SectionTOC(props: Props) {
  return (
    <Container>
      {props.wagtailPage.sections.map(section => {
        const sectionPage = props.ratioSectionPages[section.value];
        return (
          <Line key={section.id} href={`#section-${sectionPage.meta.slug}`}>
            {sectionPage.title}
          </Line>
        );
      })}
    </Container>
  );
}
