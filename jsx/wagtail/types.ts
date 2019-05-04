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
  };
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
  | RatioExerciseBlockType;

export interface AnyPageType {
  id: number;
  meta: any;

  // This field doesn't come from the server, we fill it ourselves.
  // It's necessary because TypeScript doesn't support nested tagged unions (yet).
  meta_type: any;

  title: string;
}

export interface FreeFormPageType extends AnyPageType {
  body: BlockType[];
  meta_type: 'pages.FreeFormPage';
}

export interface RatioSectionIndexPageType extends AnyPageType {
  meta_type: 'ratio.SectionIndexPage';
}

export interface RatioSectionPageType extends AnyPageType {
  meta_type: 'ratio.SectionPage';
  body: BlockType[];
}

export type WagtailPageType =
  | FreeFormPageType
  | RatioSectionIndexPageType
  | RatioSectionPageType;
