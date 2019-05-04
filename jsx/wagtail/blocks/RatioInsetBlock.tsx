import React from 'react';

import styled from 'styled-components';

import { RatioInsetBlockType as Props } from '../types';

const Paragraph = styled.div`
  border: 1px solid #999;
  background-color: #eee;
  padding: 10px;
`;

export default function RatioInsetBlock(block: Props) {
  return <Paragraph dangerouslySetInnerHTML={{ __html: block.value }} />;
}
