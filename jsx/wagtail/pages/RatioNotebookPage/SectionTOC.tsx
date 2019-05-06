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

const Line = styled.div`
  border-bottom: 1px solid #888;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

export default function SectionTOC(props: Props) {
  return (
    <Container>
      {props.wagtailPage.sections.map(section => (
        <Line>{props.ratioSectionPages[section.value].title}</Line>
      ))}
    </Container>
  );
}
