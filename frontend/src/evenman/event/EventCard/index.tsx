import styled from 'styled-components';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';

import { EvenmanEventDocument } from '../queries.generated';
import LoadedEventCard from './LoadedEventCard';

interface Props {
  id: string;
}

const NotFound = styled.div`
  text-align: center;
  font-size: 2em;
  color: #888;
`;

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
          return <NotFound>Событие не найдено</NotFound>;
        }
        return <LoadedEventCard event={event} />;
      }}
    </ApolloQueryResults>
  );
};

export default EventCard;
