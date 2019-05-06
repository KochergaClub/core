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

import RatioBriefingBlock from './blocks/RatioBriefingBlock';
import RatioHeaderBlock from './blocks/RatioHeaderBlock';
import RatioParagraphBlock from './blocks/RatioParagraphBlock';
import RatioInsetBlock from './blocks/RatioInsetBlock';
import RatioExerciseBlock from './blocks/RatioExerciseBlock';
import RatioExerciseOnelineBlock from './blocks/RatioExerciseOnelineBlock';

import DebugBlock from './blocks/DebugBlock';

const AnyBlock = (block: BlockType) => {
  switch (block.type) {
    case 'basic_header':
      return <BasicHeaderBlock {...block} />;
    case 'basic_paragraph':
      return <BasicParagraphBlock {...block} />;
    case 'grey':
      return <GreyBlock {...block} />;
    case 'columns_basic':
      return <ColumnsBasicBlock {...block} />;
    case 'ratio_briefing':
      return <RatioBriefingBlock {...block} />;
    case 'ratio_header':
      return <RatioHeaderBlock {...block} />;
    case 'ratio_paragraph':
      return <RatioParagraphBlock {...block} />;
    case 'ratio_inset':
      return <RatioInsetBlock {...block} />;
    case 'ratio_exercise':
      return <RatioExerciseBlock {...block} />;
    case 'ratio_exercise_oneline':
      return <RatioExerciseOnelineBlock {...block} />;
    default:
      return <DebugBlock {...block} />;
  }
};

export default function WagtailBlocks({ blocks }: Props) {
  return (
    <div>{blocks.map(block => <AnyBlock key={block.id} {...block} />)}</div>
  );
}
