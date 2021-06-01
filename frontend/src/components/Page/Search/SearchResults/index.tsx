import { SearchQuery } from '../queries.generated';
import EventResult from './EventResult';
import PageResult from './PageResult';

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

interface Props {
  results?: SearchQuery;
}

export const SearchResults: React.FC<Props> = ({ results }) => {
  if (!results) {
    return null;
  }

  return (
    <div className="min-w-64">
      {results.search.results.map((item, i) => (
        <AnyResult key={i} item={item} />
      ))}
    </div>
  );
};
