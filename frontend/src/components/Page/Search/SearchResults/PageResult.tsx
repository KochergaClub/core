import { Label } from '@kocherga/frontkit';

import { cmsRoute } from '~/cms/routes';

import { PageSearchItemFragment } from '../queries.generated';
import ResultContainer from './ResultContainer';

const PageResultInternals: React.FC<{
  item: PageSearchItemFragment;
}> = ({ item: { page } }) => {
  switch (page.__typename) {
    case 'ProjectPage':
      return (
        <div>
          <Label>Проект</Label>
          <div>{page.title}</div>
        </div>
      );
    case 'BlogPostPage':
      return (
        <div>
          <Label>Блог</Label>
          <div>{page.title}</div>
        </div>
      );
    case 'FaqPage':
      return (
        <div>
          <Label>FAQ</Label>
          <div>{page.title}</div>
        </div>
      );
    default:
      return <span>{page.title}</span>;
  }
};

const PageResult: React.FC<{
  item: PageSearchItemFragment;
}> = ({ item }) => (
  <ResultContainer route={cmsRoute(item.page.meta.url)}>
    <PageResultInternals item={item} />
  </ResultContainer>
);

export default PageResult;
