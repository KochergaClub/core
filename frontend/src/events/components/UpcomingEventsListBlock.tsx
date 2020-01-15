import { ApolloQueryResults } from '~/components';
import { formatDate } from '~/common/utils';

import { useUpcomingPublicEventsQuery } from '../queries.generated';

import EventsListBlock from './EventsListBlock';

const UpcomingEventsListBlock: React.FC = () => {
  const queryResults = useUpcomingPublicEventsQuery({
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
