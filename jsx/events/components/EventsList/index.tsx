import React from 'react';

import styled from 'styled-components';

import { PublicEvent } from '../../types';

import EventCard from './EventCard';

const List = styled.div`
  padding: 40px 20px;
  margin: 0 auto;
  max-width: 800px;
`;

interface Props {
  events: PublicEvent[];
  mode?: 'timepad';
}

export default function EventsList({ events, mode }: Props) {
  if (!events.length) {
    return <List>Ни одного события не запланировано.</List>;
  }

  return (
    <List>
      {events.map(event => (
        <EventCard key={event.event_id} event={event} mode={mode} />
      ))}
    </List>
  );
}
