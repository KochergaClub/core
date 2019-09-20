import { AnyPageType } from '~/wagtail/pages/types';
import { BlockType } from '~/wagtail/blocks/types';

export interface SectionPageType extends AnyPageType {
  meta_type: 'ratio.SectionPage';
  body: BlockType[];
}
