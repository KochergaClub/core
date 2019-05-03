import React from 'react';

import styled from 'styled-components';

import { BlockType } from './types';

// Stream of Wagtail blocks rendered in order based on their type.

interface Props {
  blocks: BlockType[];
}

const SBBlock = styled.div`
  background-color: blue;
  height: 100px;
`;

import HeaderBlock from './blocks/HeaderBlock';
import ParagraphBlock from './blocks/ParagraphBlock';
import GreyBlock from './blocks/GreyBlock';
import DebugBlock from './blocks/DebugBlock';

const BLOCKS: { [key: string]: React.ComponentType<BlockType> } = {
  header: HeaderBlock,
  paragraph: ParagraphBlock,
  grey: GreyBlock,
  sb: SBBlock,
};

const AnyBlock = (block: BlockType) => {
  const Component = BLOCKS[block.type];
  // const Component = DebugBlock;
  return <Component {...block} />;
};

const WagtailBlocks = ({ blocks }: Props) => {
  return (
    <div>{blocks.map(block => <AnyBlock key={block.id} {...block} />)}</div>
  );
};

export default WagtailBlocks;
