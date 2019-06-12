import { BlockType } from '../blocks/types';

export interface AnyPageType {
  id: number;
  meta: {
    type: string;
    slug: string;
  };

  // This field doesn't come from the server, we fill it ourselves.
  // It's necessary because TypeScript doesn't support nested tagged unions (yet).
  meta_type: string;

  title: string;
}

export interface RatioSectionPageType extends AnyPageType {
  meta_type: 'ratio.SectionPage';
  body: BlockType[];
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

export type WagtailPageType = RatioSectionPageType;
