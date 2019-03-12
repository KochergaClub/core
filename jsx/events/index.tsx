import * as React from 'react';

import Page from '../components/Page';

import Calendar from './Calendar';

interface PublicEvent {
  event_id: string;
  title: string;
  room: string;
  start: string;
  end: string;
}

const startAccessor = (event: PublicEvent) => new Date(event.start);
const endAccessor = (event: PublicEvent) => new Date(event.end);

export default ({ events }: { events: PublicEvent[] }) => (
  <Page title="Календарь событий" team>
    <h1>Календарь событий</h1>
    <Calendar
      events={events}
      startAccessor={startAccessor}
      endAccessor={endAccessor}
    />
  </Page>
);
