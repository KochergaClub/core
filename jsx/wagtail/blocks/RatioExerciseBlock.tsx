import React from 'react';

import styled from 'styled-components';

import { RatioExerciseBlockType as Props } from '../types';

const Container = styled.div`
  page-break-inside: avoid;
`;

const Header = styled.div`
  color: hsl(21, 72%, 44%);
  font-size: 1.2em;
  font-style: italic;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const LineList = styled.ul`
  margin-left: 30px;
  list-style-type: none;
`;

const EnumeratedLineList = styled.ol`
  margin-left: 30px;
`;

const Line = styled.li`
  width: 100%;
  border-bottom: 1px solid #ddd;
`;

export default function RatioExerciseBlock(block: Props) {
  const ListComponent = block.value.enumerate ? EnumeratedLineList : LineList;
  return (
    <Container>
      <Header>{block.value.header}</Header>
      <ListComponent>
        {Array.from(new Array(block.value.lines_count)).map((_, i) => (
          <Line key={i}>&nbsp;</Line>
        ))}
      </ListComponent>
    </Container>
  );
}
