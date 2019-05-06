import React from 'react';

import styled from 'styled-components';

import { RatioInsetBlockType as Props } from '../types';

const Paragraph = styled.div`
  border: 1px solid #999;
  background-color: #eee;
  padding-left: 12px;
  padding-right: 12px;
  font-style: italic;
`;

export default function RatioInsetBlock(block: Props) {
  return <Paragraph dangerouslySetInnerHTML={{ __html: block.value }} />;
}
