import React from 'react';

import styled from 'styled-components';

import { BlockType } from '../types';

interface Props extends BlockType {
  value: string;
}

const Paragraph = styled.div`
  max-width: 1020px;
  margin: 0 auto;
`;

const ParagraphBlock = (block: Props) => {
  return <Paragraph dangerouslySetInnerHTML={{ __html: block.value }} />;
};

export default ParagraphBlock;
