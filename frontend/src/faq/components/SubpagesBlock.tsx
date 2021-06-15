import { AnotherPageSummary, PaddedBlock } from '~/components';

import { FaqPage_SummaryFragment } from '../fragments.generated';

interface Props {
  subpages: FaqPage_SummaryFragment[];
}

export const SubpagesBlock: React.FC<Props> = ({ subpages }) => {
  if (!subpages.length) {
    return null;
  }
  return (
    <PaddedBlock>
      <div className="space-y-10">
        {subpages.map((subpage) => (
          <AnotherPageSummary
            key={subpage.id}
            href={subpage.meta.url}
            title={subpage.title}
            description={subpage.summary}
          />
        ))}
      </div>
    </PaddedBlock>
  );
};
