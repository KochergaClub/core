import styled from 'styled-components';

import { PublicEvent } from '../../types';

import EventCard from './EventCard';

const List = styled.div`
  > * + * {
    margin-top: 40px;
  }
`;

interface Props {
  events: PublicEvent[];
}

export default function EventsList({ events }: Props) {
  if (!events.length) {
    return <List>Ни одного события не запланировано.</List>;
  }

  return (
    <List>
      {events.map(event => (
        <EventCard key={event.event_id} event={event} />
      ))}
    </List>
  );
}
