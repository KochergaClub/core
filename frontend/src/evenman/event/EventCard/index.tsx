import { ApolloQueryResults } from '~/components';

import { useEvenmanEventQuery } from '../queries.generated';

import LoadedEventCard from './LoadedEventCard';

interface Props {
  id: string;
}

const EventCard: React.FC<Props> = ({ id }) => {
  const queryResults = useEvenmanEventQuery({
    variables: {
      id,
    },
  });

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { event } }) => {
        if (!event) {
          return <div>NOT FOUND</div>;
        }
        return <LoadedEventCard event={event} />;
      }}
    </ApolloQueryResults>
  );
};

export default EventCard;
