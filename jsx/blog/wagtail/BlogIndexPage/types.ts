import { AnyPageType } from '~/wagtail/pages/types';

export interface BlogPostSummary extends AnyPageType {
  date: string;
  summary: string;
}
