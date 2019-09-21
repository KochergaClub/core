import { WagtailPageProps } from '~/wagtail/types';

export interface BlogPostSummary extends WagtailPageProps {
  date: string;
  summary: string;
}
