import React from 'react';

import { PublicEvent } from '~/events/types';

import { EventsListBlockType as Props } from '../types';

import EventsList from '~/events/components/EventsList';

export default function EventsListBlock({ data }: Props) {
  if (!data) {
    throw new Error("Can't render EventsList without data");
  }
  const { events: serverEvents } = data;

  const events = serverEvents.map(serverEvent => ({
    ...serverEvent,
    start: new Date(serverEvent.start),
    end: new Date(serverEvent.end),
  })) as PublicEvent[];

  return <EventsList events={events} />;
}
