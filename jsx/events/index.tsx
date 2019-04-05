import React, { useCallback, useReducer } from 'react';

import moment from 'moment';

import Page from '../components/Page';

import Calendar from './components/Calendar';

import { PublicEvent, reducer } from './types';
import { EventDispatch } from './contexts';

const startAccessor = (event: PublicEvent) => new Date(event.start);
const endAccessor = (event: PublicEvent) => new Date(event.end);

export default (props: { events: PublicEvent[]; csrfToken: string }) => {
  const [events, dispatch] = useReducer(reducer, props.events);

  const newEvent = useCallback(
    async ({ start, end }: { start: Date; end: Date }) => {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': props.csrfToken,
        },
        body: JSON.stringify({
          start_ts: start.getTime() / 1000,
          end_ts: end.getTime() / 1000,
        }),
      });

      if (!response.ok) {
        const json = await response.json(); // FIXME - this line can fail
        window.alert(`Error: ${JSON.stringify(json)}`);
        return;
      }

      const json = await response.json();
      console.log(json);

      dispatch({
        type: 'CREATE',
        payload: { start: moment(start), end: moment(end) },
      });
    },
    []
  );

  const resizeEvent = useCallback(
    ({ event, start, end }: { event: PublicEvent; start: Date; end: Date }) => {
      dispatch({
        type: 'RESIZE',
        payload: { event, start: moment(start), end: moment(end) },
      });
    },
    []
  );

  return (
    <Page title="Календарь событий" team>
      <h1>Календарь событий</h1>
      <EventDispatch.Provider value={dispatch}>
        <Calendar
          events={events}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          onSelectSlot={newEvent}
          onEventResize={resizeEvent}
          onEventDrop={resizeEvent}
        />
      </EventDispatch.Provider>
    </Page>
  );
};
