import { WagtailPageProps } from '~/wagtail/types';
import { ServerPublicEvent } from '~/events/types';

interface WagtailImage {
  url: string;
  width: string;
  height: string;
}

export interface ProjectPageType extends WagtailPageProps {
  meta_type: 'projects.ProjectPage';
  body: string;
  image: WagtailImage;
  image_thumbnail: WagtailImage;
  summary?: string;
  activity_summary?: string;
  description?: string;
  is_active: boolean;
  upcoming_events?: ServerPublicEvent[];
}
