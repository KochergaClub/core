export interface AnyBlockType {
  id: string;
}

export interface BasicLeadBlockType extends AnyBlockType {
  type: 'basic_lead';
  value: string;
}

export interface BasicParagraphBlockType extends AnyBlockType {
  type: 'basic_paragraph';
  value: string;
}

export interface GreyBlockType extends AnyBlockType {
  type: 'grey';
  value: {
    header: string;
    text?: string;
  };
}

export interface ColumnsBasicBlockType extends AnyBlockType {
  type: 'columns_basic';
  value: {
    header: string;
    text?: string;
  }[];
}

export interface ColumnsMembershipsBlockType extends AnyBlockType {
  type: 'columns_memberships';
  value: {
    title: string;
    subtitle: string;
    price: number;
    description: string;
  }[];
}

export interface RatioBriefingBlockType extends AnyBlockType {
  type: 'ratio_briefing';
  value: string;
}

export interface RatioHeaderBlockType extends AnyBlockType {
  type: 'ratio_header';
  value: string;
}

export interface RatioParagraphBlockType extends AnyBlockType {
  type: 'ratio_paragraph';
  value: string;
}

export interface RatioInsetBlockType extends AnyBlockType {
  type: 'ratio_inset';
  value: string;
}

export interface RatioExerciseBlockType extends AnyBlockType {
  type: 'ratio_exercise';
  value: {
    header: string;
    lines_count: number;
    enumerate?: boolean;
  };
}

export interface RatioExerciseOnelineBlockType extends AnyBlockType {
  type: 'ratio_exercise_oneline';
  value: {
    text: string;
  };
}

export interface RatioMathBlockType extends AnyBlockType {
  type: 'ratio_math';
  value: string;
}

import { ServerPublicEvent } from '../../events/types';
export interface EventsListBlockType extends AnyBlockType {
  type: 'events_list';

  // FIXME - It'd be better to have two different block types:
  // 1) unexpanded "block configuration"
  // 2) expanded "block with async data"
  data?: {
    events: ServerPublicEvent[];
  };
}

export type BlockType =
  | BasicLeadBlockType
  | BasicParagraphBlockType
  | GreyBlockType
  | ColumnsBasicBlockType
  | ColumnsMembershipsBlockType
  | RatioBriefingBlockType
  | RatioParagraphBlockType
  | RatioInsetBlockType
  | RatioHeaderBlockType
  | RatioExerciseBlockType
  | RatioExerciseOnelineBlockType
  | RatioMathBlockType
  | EventsListBlockType;
