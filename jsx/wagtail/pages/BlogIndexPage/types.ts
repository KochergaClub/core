import { AnyPageType } from '../types';

export interface BlogPostSummary extends AnyPageType {
  date: string;
  summary: string;
}
