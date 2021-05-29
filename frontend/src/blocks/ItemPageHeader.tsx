import { ParentLinkInHeader } from '~/components';

import { PageHeader } from './PageHeader';

interface Props {
  title: string;
  sectionTitle: string;
  sectionLink: string;
  children?: React.ReactNode;
}

export const ItemPageHeader: React.FC<Props> = ({
  title,
  sectionTitle,
  sectionLink,
  children,
}) => {
  const top = (
    <ParentLinkInHeader href={sectionLink}>{sectionTitle}</ParentLinkInHeader>
  );
  return <PageHeader top={top} bottom={children} title={title} />;
};
