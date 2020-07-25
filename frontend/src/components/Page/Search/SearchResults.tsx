import styled from 'styled-components';
import Link from 'next/link';

import { fonts, colors, Label } from '@kocherga/frontkit';

import { WagtailSearchQuery } from './queries.generated';
import { cmsRoute } from '~/cms/routes';

const Item = styled.div`
  padding: 8px 12px;
  font-size: ${fonts.sizes.S};
  &:hover {
    background-color: ${colors.grey[100]};
  }
`;

const LinkA = styled.div`
  color: black;
  text-decoration: none;
`;

const PageResultInternals: React.FC<{
  page: WagtailSearchQuery['wagtailSearch']['results'][0];
}> = ({ page }) => {
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
  page: WagtailSearchQuery['wagtailSearch']['results'][0];
}> = ({ page }) => {
  return (
    <Link {...cmsRoute(page.meta.html_url)} passHref>
      <LinkA>
        <Item>
          <PageResultInternals page={page} />
        </Item>
      </LinkA>
    </Link>
  );
};

const Container = styled.div`
  min-width: 200px;
`;

interface Props {
  results?: WagtailSearchQuery;
}

const SearchResults: React.FC<Props> = ({ results }) => {
  if (!results) {
    return null;
  }

  return (
    <Container>
      {results.wagtailSearch.results.map(page => (
        <PageResult key={page.id} page={page} />
      ))}
    </Container>
  );
};

export default SearchResults;
