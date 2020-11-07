import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { ListView, PagedApolloCollection } from '~/components/collections';

import { RatioTicketFragment } from '../../queries.generated';
import { RatioTicketsDocument } from './queries.generated';
import TicketCard from './TicketCard';

const renderItem = (ticket: RatioTicketFragment) => (
  <TicketCard ticket={ticket} />
);

const TicketCollectionBlock: React.FC = () => {
  const queryResults = useQuery(RatioTicketsDocument, {
    variables: {
      first: 20,
    },
  });

  return (
    <PaddedBlock width="wide">
      <ApolloQueryResults {...queryResults} size="block">
        {({ data: { tickets } }) => (
          <PagedApolloCollection
            connection={tickets}
            fetchPage={queryResults.refetch}
            names={{
              plural: 'билеты',
              genitive: 'билет',
            }}
            view={(props) => (
              <ListView {...props} gutter={16} renderItem={renderItem} />
            )}
          />
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default TicketCollectionBlock;
