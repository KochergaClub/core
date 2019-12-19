import { ParentLinkInHeader } from '~/components';

import PageHeader from '~/blocks/PageHeader';

import { PageType } from '../wagtail/FAQPage';

interface Props {
  wagtailPage: PageType;
}

const FAQPageHeader: React.FC<Props> = ({ wagtailPage }) => {
  const root = '/faq';
  const isRoot = new URL(wagtailPage.meta.html_url).pathname === root;

  let top = <ParentLinkInHeader href={root}>FAQ</ParentLinkInHeader>;

  return <PageHeader top={isRoot ? null : top} title={wagtailPage.title} />;
};

export default FAQPageHeader;
