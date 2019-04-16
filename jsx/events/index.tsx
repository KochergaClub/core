import React, { useCallback, useEffect, useState, useReducer } from 'react';

import moment from 'moment';

import Page from '../components/Page';

import Calendar from './components/Calendar';
import EventModal from './components/EventModal';

import { Event, EventStore, reducer } from './types';
import { EventDispatch } from './contexts';

const startAccessor = (event: Event) => {
  return new Date(event.start);
};
const endAccessor = (event: Event) => new Date(event.end);

declare global {
  interface Window {
    WebSocket: any;
  }
}

export default (props: { events: EventStore; csrfToken: string }) => {
  const [events, dispatch] = useReducer(reducer, props.events);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingStart, setEditingStart] = useState();
  const [editingEnd, setEditingEnd] = useState();

  useEffect(() => {
    console.log('useEffect');
    if (typeof window === 'undefined' || !window.WebSocket) {
      return;
    }
    const socket = new window.WebSocket(
      `ws://${window.location.host}/ws/events/`
    );
    socket.onmessage = async e => {
      const response = await fetch(
        '/api/events?from_date=2019-04-01&to_date-2019-05-01'
      );
      const json = await response.json();
      dispatch({
        type: 'REPLACE_ALL',
        payload: { events: json },
      });
    };

    return () => socket.close();
  }, []);

  const newEvent = useCallback(({ start, end }: { start: Date; end: Date }) => {
    setEditingStart(start);
    setEditingEnd(end);
    setModalIsOpen(true);
  }, []);

  const resizeEvent = useCallback(
    async ({ event, start, end }: { event: Event; start: Date; end: Date }) => {
      const response = await fetch(`/api/event/${event.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': props.csrfToken,
        },
        body: JSON.stringify({
          start,
          end,
        }),
      });

      if (!response.ok) {
        const json = await response.json(); // FIXME - this line can fail
        window.alert(`Error: ${JSON.stringify(json)}`);
        return;
      }

      const json = await response.json();

      dispatch({
        type: 'RESIZE',
        payload: { event, start: moment(json.start), end: moment(json.end) },
      });
    },
    []
  );

  return (
    <Page title="Календарь событий" team csrfToken={props.csrfToken}>
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

        {modalIsOpen && (
          <EventModal
            isOpen={modalIsOpen}
            start={editingStart}
            end={editingEnd}
            setOpen={setModalIsOpen}
          />
        )}
      </EventDispatch.Provider>
    </Page>
  );
};
