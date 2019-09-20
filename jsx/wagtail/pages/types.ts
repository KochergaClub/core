import { SectionPageType as RatioSectionPageType } from '~/ratio/wagtail/types';

export interface AnyPageType {
  id: number;
  meta: {
    type: string;
    slug: string;
  };

  // This field doesn't come from the server, we fill it in pages/wagtail-any.
  // It's necessary because TypeScript doesn't support nested tagged unions (yet).
  meta_type: string;

  title: string;
}

export type WagtailPageType = RatioSectionPageType; // TODO: list all other types
