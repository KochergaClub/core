import React from 'react';

import styled from 'styled-components';

import { PublicEvent } from '~/events/types';

import { EventsListBlockType as Props } from '../types';

import EventCard from './EventCard';

const List = styled.div`
  padding: 40px 20px;
  margin: 0 auto;
  max-width: 800px;
`;

export default function EventsList({ data }: Props) {
  if (!data) {
    throw new Error("Can't render EventsList without data");
  }
  const { events: serverEvents } = data;

  const events = serverEvents.map(serverEvent => ({
    ...serverEvent,
    start: new Date(serverEvent.start),
    end: new Date(serverEvent.end),
  })) as PublicEvent[];

  if (!events.length) {
    return <List>Ни одного события не запланировано.</List>;
  }
  return (
    <List>
      {events.map(event => <EventCard key={event.event_id} event={event} />)}
    </List>
  );
}
