import React from 'react';

import styled from 'styled-components';

import { RatioBriefingBlockType as Props } from '../types';

const Container = styled.div`
  font-size: 1.2em;
`;

export default function RatioBriefingBlock(block: Props) {
  return (
    <div>
      <hr />
      <Container dangerouslySetInnerHTML={{ __html: block.value }} />
      <hr />
    </div>
  );
}
