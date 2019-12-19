import { ParentLinkInHeader } from '~/components';

import PageHeader from './PageHeader';

interface Props {
  title: string;
  sectionTitle: string;
  sectionLink: string;
  children?: React.ReactNode;
}

export default function ItemPageHeader({
  title,
  sectionTitle,
  sectionLink,
  children,
}: Props) {
  const top = (
    <ParentLinkInHeader href={sectionLink}>{sectionTitle}</ParentLinkInHeader>
  );
  return <PageHeader top={top} bottom={children} title={title} />;
}
