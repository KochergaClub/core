import styled from 'styled-components';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { formatDate } from '~/common/utils';

import { useUpcomingPublicEventsQuery } from '../../queries.generated';

import EventCard from './EventCard';

const List = styled.div`
  > * + * {
    margin-top: 40px;
  }
`;

interface Props {
  project_id?: string;
}

export default function EventsListBlock({ project_id }: Props) {
  const queryResults = useUpcomingPublicEventsQuery({
    variables: {
      today: formatDate(new Date(), 'yyyy-MM-dd'),
      project_id,
    },
  });

  return (
    <PaddedBlock>
      <ApolloQueryResults {...queryResults} size="block">
        {({ data }) => {
          const events = data.publicEvents.nodes;

          if (!events.length) {
            return (
              <PaddedBlock>
                <List>Ни одного события не запланировано.</List>
              </PaddedBlock>
            );
          }

          return (
            <List>
              {events.map(event => (
                <EventCard key={event.event_id} event={event} />
              ))}
            </List>
          );
        }}
      </ApolloQueryResults>
    </PaddedBlock>
  );
}
