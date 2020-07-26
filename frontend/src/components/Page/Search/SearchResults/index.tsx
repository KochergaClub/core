import styled from 'styled-components';
import { SearchQuery } from '../queries.generated';

import PageResult from './PageResult';
import EventResult from './EventResult';

const AnyResult: React.FC<{
  item: SearchQuery['search']['results'][0];
}> = ({ item }) => {
  switch (item.__typename) {
    case 'PageSearchItem':
      return <PageResult item={item} />;
    case 'EventSearchItem':
      return <EventResult item={item} />;
    default:
      return null; // shouldn't happen
  }
};

const Container = styled.div`
  min-width: 200px;
`;

interface Props {
  results?: SearchQuery;
}

const SearchResults: React.FC<Props> = ({ results }) => {
  if (!results) {
    return null;
  }

  return (
    <Container>
      {results.search.results.map((item, i) => (
        <AnyResult key={i} item={item} />
      ))}
    </Container>
  );
};

export default SearchResults;
