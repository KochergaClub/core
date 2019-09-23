import { WagtailPageProps } from '~/wagtail/types';
import { BlockType } from '~/wagtail/blocks/types';

export interface SectionPageType extends WagtailPageProps {
  meta_type: 'ratio.SectionPage';
  body: BlockType[];
}
