import React from 'react';

import styled from 'styled-components';

import { BasicParagraphBlockType as Props } from '../types';

const Paragraph = styled.div`
  max-width: 1020px;
  margin: 0 auto;
`;

export default function ParagraphBlock(block: Props) {
  return <Paragraph dangerouslySetInnerHTML={{ __html: block.value }} />;
}
