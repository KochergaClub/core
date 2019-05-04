import React from 'react';

import { BlockType } from './types';

// Stream of Wagtail blocks rendered in order based on their type.

interface Props {
  blocks: BlockType[];
}

import BasicHeaderBlock from './blocks/BasicHeaderBlock';
import BasicParagraphBlock from './blocks/BasicParagraphBlock';
import GreyBlock from './blocks/GreyBlock';
import ColumnsBasicBlock from './blocks/ColumnsBasicBlock';
import DebugBlock from './blocks/DebugBlock';

// FIXME - derive <any> type from key
type BlockMap = { [key in BlockType['type']]: React.ComponentType<any> };

const BLOCKS: BlockMap = {
  basic_header: BasicHeaderBlock,
  basic_paragraph: BasicParagraphBlock,
  grey: GreyBlock,
  columns_basic: ColumnsBasicBlock,
};

const AnyBlock = (block: BlockType) => {
  const Component = BLOCKS[block.type] || DebugBlock;
  return <Component {...block} />;
};

export default function WagtailBlocks({ blocks }: Props) {
  return (
    <div>{blocks.map(block => <AnyBlock key={block.id} {...block} />)}</div>
  );
}
