import React from 'react';

import styled from 'styled-components';

import { RatioParagraphBlockType as Props } from '../types';

const Paragraph = styled.div`
  ul,
  ol {
    margin-left: 30px;

    > li {
      margin-bottom: 8px;
    }
  }
`;
// test

export default function RatioParagraphBlock(block: Props) {
  return <Paragraph dangerouslySetInnerHTML={{ __html: block.value }} />;
}
