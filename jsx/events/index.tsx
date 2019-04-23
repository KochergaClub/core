import React, { useCallback, useEffect, useState, useReducer } from 'react';

import moment from 'moment';

import Page from '../components/Page';
import PageTitle from '../components/PageTitle';
import { useListeningWebSocket, apiCall } from '../utils';

import Calendar from './components/Calendar';
import UILayer from './components/UILayer';
import CalendarEvent from './components/CalendarEvent';

import {
  Event,
  ServerEvent,
  LocalEvent,
  getInitialState,
  reducer,
  serverEventToEvent,
} from './types';

import { uiReducer, initialUIState } from './uiTypes';

import { EventDispatch } from './contexts';

const startAccessor = (event: LocalEvent) => {
  return event.start.toDate();
};
const endAccessor = (event: LocalEvent) => event.end.toDate();

const eventPropGetter = (event: LocalEvent) => {
  const style = {};
  if (event.saving) {
    style['backgroundColor'] = '#ddd';
  }
  return {
    style,
  };
};

interface Props {
  events: ServerEvent[];
  range: { start: string; end: string };
}

export default (props: Props) => {
  const [store, dispatch] = useReducer(reducer, props.events, getInitialState);

  const [range, setRange] = useState(() => ({
    start: moment(props.range.start),
    end: moment(props.range.end),
  }));

  const fetchEvents = useCallback(
    async () => {
      const json = (await apiCall(
        `events?from_date=${range.start.format(
          'YYYY-MM-DD'
        )}&to_date=${range.end.format('YYYY-MM-DD')}`,
        'GET'
      )) as ServerEvent[];

      dispatch({
        type: 'REPLACE_ALL',
        payload: { events: json.map(serverEventToEvent) },
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

  const [uiStore, uiDispatch] = useReducer(uiReducer, initialUIState);

  const startNewEvent = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      uiDispatch({
        type: 'START_NEW',
        payload: {
          start: moment(start),
          end: moment(end),
        },
      });
    },
    []
  );

  const startEditEvent = useCallback((event: Event) => {
    uiDispatch({
      type: 'START_EDIT',
      payload: {
        event,
      },
    });
  }, []);

  const startViewEvent = useCallback((event: Event) => {
    uiDispatch({
      type: 'START_VIEW',
      payload: {
        event,
      },
    });
  }, []);

  const resizeEvent = useCallback(
    async ({ event, start, end }: { event: Event; start: Date; end: Date }) => {
      dispatch({
        type: 'PRE_RESIZE',
        payload: { event, start: moment(start), end: moment(end) },
      });

      const json = await apiCall(`event/${event.id}`, 'PATCH', {
        start,
        end,
      });

      dispatch({
        type: 'PATCH',
        payload: { event: serverEventToEvent(json) },
      });
    },
    []
  );

  return (
    <Page title="Календарь событий" team wide>
      <PageTitle>Календарь событий</PageTitle>
      <EventDispatch.Provider value={dispatch}>
        <Calendar
          events={store.events}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          onSelectSlot={startNewEvent}
          onEventResize={resizeEvent}
          onEventDrop={resizeEvent}
          onRangeChange={onRangeChange}
          onSelectEvent={startViewEvent}
          onDoubleClickEvent={startEditEvent}
          eventPropGetter={eventPropGetter}
          components={{
            event: CalendarEvent,
          }}
        />

        <UILayer uiStore={uiStore} uiDispatch={uiDispatch} />
      </EventDispatch.Provider>
    </Page>
  );
};
