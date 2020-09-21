import { useQuery } from '@apollo/client';

import { formatDate } from '~/common/utils';
import { ApolloQueryResults } from '~/components';

import { UpcomingPublicEventsDocument } from '../queries.generated';
import EventsListBlock from './EventsListBlock';

const UpcomingEventsListBlock: React.FC = () => {
  const queryResults = useQuery(UpcomingPublicEventsDocument, {
    variables: {
      today: formatDate(new Date(), 'yyyy-MM-dd'),
    },
  });

  return (
    <div>
      <ApolloQueryResults {...queryResults}>
        {({ data }) => <EventsListBlock events={data.publicEvents.nodes} />}
      </ApolloQueryResults>
    </div>
  );
};

export default UpcomingEventsListBlock;
