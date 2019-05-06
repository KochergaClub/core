import React from 'react';

import styled from 'styled-components';

import { RatioExerciseBlockType as Props } from '../types';

const Header = styled.div`
  color: hsl(21, 72%, 44%);
  font-size: 1.2em;
  font-style: italic;
  margin-top: 20px;
  margin-bottom: 10px;
  page-break-after: avoid;
`;

const LineList = styled.ol`
  margin-left: 30px;
`;

const Line = styled.li`
  width: 100%;
  border-bottom: 1px solid #888;
`;

export default function RatioExerciseBlock(block: Props) {
  return (
    <div>
      <Header>{block.value.header}</Header>
      <LineList>
        {Array.from(new Array(block.value.lines_count)).map((_, i) => (
          <Line key={i} />
        ))}
      </LineList>
    </div>
  );
}
