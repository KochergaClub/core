import React from 'react';

import styled from 'styled-components';

import { RatioBriefingBlockType as Props } from './types';

const Container = styled.div`
  font-size: 1.2em;
  margin-top: 30px;
  margin-bottom: 30px;
  line-height: 1.4;
  text-align: justify;
`;

export default function RatioBriefingBlock(block: Props) {
  return (
    <div>
      <Container dangerouslySetInnerHTML={{ __html: block.value }} />
    </div>
  );
}
