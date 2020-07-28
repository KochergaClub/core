import styled from 'styled-components';

import { PaddedBlock } from '~/components';

import { Event_SummaryFragment } from '../../queries.generated';

import EventCard from './EventCard';

const List = styled.div`
  > * + * {
    margin-top: 40px;
  }
`;

interface Props {
  events: Event_SummaryFragment[];
}

export default function EventsListBlock({ events }: Props) {
  return (
    <PaddedBlock>
      {events.length ? (
        <List>
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </List>
      ) : (
        <List>Ни одного события не запланировано.</List>
      )}
    </PaddedBlock>
  );
}
