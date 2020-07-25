import styled from 'styled-components';
import Link from 'next/link';

import { A, Column } from '@kocherga/frontkit';

import { WagtailSearchQuery } from './queries.generated';
import { cmsRoute } from '~/cms/routes';

const Item = styled.div`
  padding: 4px 8px;
`;

interface Props {
  results?: WagtailSearchQuery;
}

const SearchResults: React.FC<Props> = ({ results }) => {
  if (!results) {
    return null;
  }

  return (
    <Column>
      {results.wagtailSearch.map(page => (
        <Item key={page.id}>
          <Link {...cmsRoute(page.meta.html_url)} passHref>
            <A>{page.title}</A>
          </Link>
        </Item>
      ))}
    </Column>
  );
};

export default SearchResults;
