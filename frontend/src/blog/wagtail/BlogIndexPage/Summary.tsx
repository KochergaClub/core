import { AnotherPageSummary } from '~/components';

import { BlogPostPage_SummaryFragment } from '../fragments.generated';

export default function Summary(summary: BlogPostPage_SummaryFragment) {
  return (
    <AnotherPageSummary
      href={`/blog/${summary.meta.slug}`}
      title={summary.title}
      description={summary.summary}
    />
  );
}
