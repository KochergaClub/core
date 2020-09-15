import { AnotherPageSummary, PaddedBlock } from '~/components';

import { FaqPage_SummaryFragment } from '../fragments.generated';

interface Props {
  subpages: FaqPage_SummaryFragment[];
}

const SubpagesBlock: React.FC<Props> = ({ subpages }) => (
  <PaddedBlock>
    {subpages.map((subpage) => (
      <AnotherPageSummary
        key={subpage.id}
        href={subpage.meta.url}
        title={subpage.title}
        description={subpage.summary}
      />
    ))}
  </PaddedBlock>
);

export default SubpagesBlock;
