import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';

import { EvenmanEventDocument } from '../queries.generated';
import LoadedEventCard from './LoadedEventCard';

interface Props {
  id: string;
}

const EventCard: React.FC<Props> = ({ id }) => {
  const queryResults = useQuery(EvenmanEventDocument, {
    variables: {
      id,
    },
  });

  return (
    <ApolloQueryResults {...queryResults} size="block">
      {({ data: { event } }) => {
        if (!event) {
          return (
            <div className="text-center text-3xl text-gray-400 mt-20">
              Событие не найдено
            </div>
          );
        }
        return <LoadedEventCard event={event} />;
      }}
    </ApolloQueryResults>
  );
};

export default EventCard;
