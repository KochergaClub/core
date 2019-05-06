import React from 'react';

import styled from 'styled-components';

import { RatioBriefingBlockType as Props } from '../types';

const Container = styled.div`
  font-size: 1.2em;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default function RatioBriefingBlock(block: Props) {
  return (
    <div>
      <Container dangerouslySetInnerHTML={{ __html: block.value }} />
    </div>
  );
}
