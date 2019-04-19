import React, { useCallback, useEffect, useState, useReducer } from 'react';

import moment from 'moment';

import Page from '../components/Page';
import { getCSRFToken, useListeningWebSocket } from '../utils';

import Calendar from './components/Calendar';
import EventModal from './components/EventModal';
import CalendarEvent from './components/CalendarEvent';

import { Event, reducer } from './types';
import { EventDispatch } from './contexts';

const startAccessor = (event: Event) => {
  return new Date(event.start);
};
const endAccessor = (event: Event) => new Date(event.end);

const eventPropGetter = (event: Event) => {
  const style = {};
  if (event.saving) {
    style['backgroundColor'] = '#888';
  }
  return {
    style,
  };
};

declare global {
  interface Window {
    WebSocket: any;
  }
}

interface Props {
  events: Event[];
  range: { start: string; end: string };
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

  useListeningWebSocket('ws/events/', fetchEvents);

  const newEvent = useCallback(({ start, end }: { start: Date; end: Date }) => {
    setEditingStart(start);
    setEditingEnd(end);
    setModalIsOpen(true);
  }, []);

  const resizeEvent = useCallback(
    async ({ event, start, end }: { event: Event; start: Date; end: Date }) => {
      dispatch({
        type: 'PRE_RESIZE',
        payload: { event, start: moment(start), end: moment(end) },
      });

      const response = await fetch(`/api/event/${event.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({
          start,
          end,
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        window.alert(`Error: ${JSON.stringify(body)}`);
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

  const onRangeChange = (range: any) => {
    let start: Date | undefined;
    let end: Date | undefined;

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
    <Page title="Календарь событий" team>
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
          eventPropGetter={eventPropGetter}
          components={{
            event: CalendarEvent,
          }}
        />

        <EventModal
          isOpen={modalIsOpen}
          start={editingStart}
          end={editingEnd}
          setOpen={setModalIsOpen}
        />
      </EventDispatch.Provider>
    </Page>
  );
};
