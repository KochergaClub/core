import React, { useCallback, useEffect, useState, useReducer } from 'react';

import moment from 'moment';

import Page from '../components/Page';

import Calendar from './components/Calendar';
import EventModal from './components/EventModal';

import { Event, reducer } from './types';
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

interface Props {
  events: Event[];
  range: { start: string; end: string };
  csrfToken: string;
}

export default (props: Props) => {
  const [store, dispatch] = useReducer(reducer, {
    events: props.events,
  });

  const [range, setRange] = useState(() => ({
    start: moment(props.range.start),
    end: moment(props.range.end),
  }));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingStart, setEditingStart] = useState();
  const [editingEnd, setEditingEnd] = useState();

  const fetchEvents = useCallback(
    async () => {
      const response = await fetch(
        `/api/events?from_date=${range.start.format(
          'YYYY-MM-DD'
        )}&to_date=${range.end.format('YYYY-MM-DD')}`
      );
      const json = await response.json();
      dispatch({
        type: 'REPLACE_ALL',
        payload: { events: json },
      });
    },
    [range]
  );

  useEffect(
    () => {
      fetchEvents();
    },
    [range, fetchEvents]
  );

  useEffect(
    () => {
      if (typeof window === 'undefined' || !window.WebSocket) {
        return;
      }
      const socketProtocol =
        window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const socket = new window.WebSocket(
        `${socketProtocol}//${window.location.host}/ws/events/`
      );
      socket.onmessage = async e => {
        console.log(e);
        fetchEvents();
      };

      return () => socket.close();
    },
    [fetchEvents]
  );

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

  const onRangeChange = range => {
    let start, end;
    if (Array.isArray(range)) {
      start = range[0];
      end = range[range.length - 1];
    } else {
      start = range.start;
      end = range.end;
    }
    setRange({ start: moment(start), end: moment(end) });
  };

  return (
    <Page title="Календарь событий" team csrfToken={props.csrfToken}>
      <h1>Календарь событий</h1>
      <EventDispatch.Provider value={dispatch}>
        <Calendar
          events={store.events}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          onSelectSlot={newEvent}
          onEventResize={resizeEvent}
          onEventDrop={resizeEvent}
          onRangeChange={onRangeChange}
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
