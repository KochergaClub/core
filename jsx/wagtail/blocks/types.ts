export interface AnyBlockType {
  id: string;
}

export interface BasicHeaderBlockType extends AnyBlockType {
  type: 'basic_header';
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

export type BlockType =
  | BasicHeaderBlockType
  | BasicParagraphBlockType
  | GreyBlockType
  | ColumnsBasicBlockType
  | RatioBriefingBlockType
  | RatioParagraphBlockType
  | RatioInsetBlockType
  | RatioHeaderBlockType
  | RatioExerciseBlockType
  | RatioExerciseOnelineBlockType
  | RatioMathBlockType;
