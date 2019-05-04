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

export type BlockType =
  | BasicHeaderBlockType
  | BasicParagraphBlockType
  | GreyBlockType
  | ColumnsBasicBlockType;

export interface AnyPageType {
  id: number;
  meta: any;
  title: string;
}

export interface HomePageType extends AnyPageType {
  body: BlockType[];
}

export type WagtailPageType = HomePageType;
