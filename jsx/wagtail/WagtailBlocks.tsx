import React from 'react';

import { API } from '~/common/api';
import { formatDate } from '~/common/utils';
import { ServerPublicEvent } from '~/events/types';

import { BlockType } from './blocks/types';

// Stream of Wagtail blocks rendered in order based on their type.

interface Props {
  blocks: BlockType[];
}

import BasicLeadBlock from './blocks/BasicLeadBlock';
import GreyBlock from './blocks/GreyBlock';

import ColumnsBasicBlock from './blocks/ColumnsBasicBlock';
import ColumnsMembershipsBlock from './blocks/ColumnsMembershipsBlock';
import ColumnsButtonsBlock from './blocks/ColumnsButtonsBlock';

import RatioBriefingBlock from './blocks/RatioBriefingBlock';
import RatioHeaderBlock from './blocks/RatioHeaderBlock';
import RatioParagraphBlock from './blocks/RatioParagraphBlock';
import RatioInsetBlock from './blocks/RatioInsetBlock';
import RatioExerciseBlock from './blocks/RatioExerciseBlock';
import RatioExerciseOnelineBlock from './blocks/RatioExerciseOnelineBlock';
import RatioMathBlock from './blocks/RatioMathBlock';

import EventsListBlock from './blocks/EventsListBlock';
import BigContactsBlock from './blocks/BigContactsBlock';
import HeroFrontBlock from './blocks/HeroFrontBlock';

import DebugBlock from './blocks/DebugBlock';

const AnyBlock = (block: BlockType) => {
  switch (block.type) {
    case 'basic_lead':
      return <BasicLeadBlock {...block} />;
    case 'grey':
      return <GreyBlock {...block} />;
    case 'columns_basic':
      return <ColumnsBasicBlock {...block} />;
    case 'columns_memberships':
      return <ColumnsMembershipsBlock {...block} />;
    case 'columns_buttons':
      return <ColumnsButtonsBlock {...block} />;
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
    case 'ratio_math':
      return <RatioMathBlock {...block} />;
    case 'events_list':
      return <EventsListBlock {...block} />;
    case 'big_contacts':
      return <BigContactsBlock {...block} />;
    case 'hero_front':
      return <HeroFrontBlock {...block} />;
    default:
      return <DebugBlock {...block} />;
  }
};

export default function WagtailBlocks({ blocks }: Props) {
  return (
    <div>
      {blocks.map(block => (
        <AnyBlock key={block.id} {...block} />
      ))}
    </div>
  );
}

export const loadBlockData = async (
  block: BlockType,
  api: API
): Promise<BlockType> => {
  switch (block.type) {
    case 'events_list':
      const from_date = new Date();
      const events = (await api.call(
        `public_events?from_date=${formatDate(from_date, 'yyyy-MM-dd')}`,
        'GET'
      )) as ServerPublicEvent[];

      return {
        ...block,
        data: { events },
      };
    default:
      return block;
  }
};
