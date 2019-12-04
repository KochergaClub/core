import { AnotherPageSummary } from '~/components';

import { BlogPostSummary } from './types';

export default function Summary(summary: BlogPostSummary) {
  return (
    <AnotherPageSummary
      href={`/blog/${summary.meta.slug}`}
      title={summary.title}
      description={summary.summary}
    />
  );
}
