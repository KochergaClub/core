import PageHeader from '~/blocks/PageHeader';
import { ParentLinkInHeader } from '~/components';

import { FaqPageFragment } from '../fragments.generated';

interface Props {
  wagtailPage: FaqPageFragment;
}

const FAQPageHeader: React.FC<Props> = ({ wagtailPage }) => {
  const root = '/faq';
  const isRoot = wagtailPage.meta.url === root;

  const top = <ParentLinkInHeader href={root}>FAQ</ParentLinkInHeader>;

  return <PageHeader top={isRoot ? null : top} title={wagtailPage.title} />;
};

export default FAQPageHeader;
