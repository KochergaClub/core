import React from 'react';

import styled from 'styled-components';

import { RatioExerciseBlockType as Props } from '../types';

const Header = styled.div`
  color: orange;
  font-size: 1.2em;
  font-style: italic;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Line = styled.li`
  width: 100%;
  border-bottom: 1px solid black;
`;

export default function RatioExerciseBlock(block: Props) {
  return (
    <div>
      <Header>{block.value.header}</Header>
      <ol>
        {Array.from(new Array(block.value.lines_count)).map((k, i) => (
          <Line key={i} />
        ))}
      </ol>
    </div>
  );
}
