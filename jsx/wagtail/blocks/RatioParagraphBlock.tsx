import React from 'react';

import styled from 'styled-components';

import { RatioParagraphBlockType as Props } from './types';

const Paragraph = styled.div`
  > p {
    text-align: justify;
    page-break-inside: avoid;
  }

  ul,
  ol {
    margin-left: 30px;

    > li {
      margin-bottom: 8px;
      page-break-inside: avoid; // broken <li> elements are especially bad
    }
  }
`;
// test

export default function RatioParagraphBlock(block: Props) {
  return <Paragraph dangerouslySetInnerHTML={{ __html: block.value }} />;
}
