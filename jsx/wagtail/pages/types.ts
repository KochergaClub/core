import { AnyBlockType, BlockType } from '../blocks/types';

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

interface NotebookBlockType extends AnyBlockType {
  type: 'ratio_notebook_section';
  value: number;
}

export interface RatioNotebookPageType extends AnyPageType {
  meta_type: 'ratio.NotebookPage';
  sections: NotebookBlockType[];
}

export interface BlogPostAuthorType {
  id: number;
  name: string;
  description?: string;
  image: {
    meta: {
      download_url: string;
    };
  };
}

export interface BlogPostPageType extends AnyPageType {
  meta_type: 'blog.BlogPostPage';
  body: string;
  authors: BlogPostAuthorType[];
  date: string;
}

export type WagtailPageType =
  | FreeFormPageType
  | RatioSectionIndexPageType
  | RatioSectionPageType
  | RatioNotebookPageType
  | BlogPostPageType;
