import { PaddedBlock, AnotherPageSummary } from '~/components';

import { PageType } from '../wagtail/FAQPage';

interface Props {
  subpages: PageType[];
}

const SubpagesBlock: React.FC<Props> = ({ subpages }) => (
  <PaddedBlock>
    {subpages.map(subpage => (
      <AnotherPageSummary
        key={subpage.id}
        href={new URL(subpage.meta.html_url).pathname}
        title={subpage.title}
        description={subpage.summary}
      />
    ))}
  </PaddedBlock>
);

export default SubpagesBlock;
