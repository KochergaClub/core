import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react';

import { utcToZonedTime, zonedTimeToUtc, format } from 'date-fns-tz';
import { addWeeks, subWeeks } from 'date-fns';

import { Screen } from '../common/types';
import { API } from '../common/api';
import Page from '../components/Page';
import PageTitle from '../components/PageTitle';
import GlobalContext from '../components/GlobalContext';
import { useListeningWebSocket } from '../common/hooks';

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
  timezone,
} from './types';

import { uiReducer, initialUIState } from './uiTypes';

import { EventDispatch } from './contexts';

const startAccessor = (event: LocalEvent) =>
  utcToZonedTime(event.start, timezone);

const endAccessor = (event: LocalEvent) => utcToZonedTime(event.end, timezone);

const eventPropGetter = (event: LocalEvent) => {
  const style = {};
  if (event.saving) {
    style['backgroundColor'] = '#ddd';
  }
  return {
    style,
  };
};

interface Range {
  start: string; // YYYY-MM-DD format; not Date, because it needs to be serializable
  end: string;
}

const loadEventsInRange = async (api: API, range: Range) => {
  return (await api.call(
    `events?from_date=${range.start}&to_date=${range.end}`,
    'GET'
  )) as ServerEvent[];
};

interface Props {
  events: ServerEvent[];
  range: { start: string; end: string };
  children?: React.ReactNode;
}

const EventsPage = (props: Props) => {
  const [store, dispatch] = useReducer(reducer, props.events, getInitialState);

  const { api } = useContext(GlobalContext);

  const [range, setRange] = useState(() => ({
    start: new Date(props.range.start),
    end: new Date(props.range.end),
  }));

  const fetchEvents = useCallback(
    async () => {
      const json = await loadEventsInRange(api, {
        start: format(range.start, 'yyyy-MM-dd'),
        end: format(range.end, 'yyyy-MM-dd'),
      });

      dispatch({
        type: 'REPLACE_ALL',
        payload: { events: json.map(serverEventToEvent) },
      });
    },
    [api, range]
  );
  useEffect(
    () => {
      fetchEvents();
    },
    [range, fetchEvents]
  );

  useListeningWebSocket('ws/events/', fetchEvents);

  const onRangeChange = (range: any) => {
    let start: Date;
    let end: Date;

    if (Array.isArray(range)) {
      start = range[0];
      end = range[range.length - 1];
    } else {
      start = range.start;
      end = range.end;
    }
    // TODO - set wider range to pre-cache previous and next period, for smoother scrolling
    setRange({ start, end });
  };

  const [uiStore, uiDispatch] = useReducer(uiReducer, initialUIState);

  const startNewEvent = useCallback(
    // Note: start and end are zoned since they come from RBC.
    ({ start: zonedStart, end: zonedEnd }: { start: Date; end: Date }) => {
      const { start, end } = {
        start: zonedTimeToUtc(zonedStart, timezone),
        end: zonedTimeToUtc(zonedEnd, timezone),
      };

      uiDispatch({
        type: 'START_NEW',
        payload: {
          start,
          end,
        },
      });
    },
    []
  );

  const startViewEvent = useCallback((event: Event) => {
    uiDispatch({
      type: 'START_VIEW',
      payload: {
        event,
      },
    });
  }, []);

  const resizeEvent = useCallback(
    // Note: start and end are zoned since they come from RBC.
    async ({
      event,
      start: zonedStart,
      end: zonedEnd,
    }: {
      event: Event;
      start: Date;
      end: Date;
    }) => {
      const { start, end } = {
        start: zonedTimeToUtc(zonedStart, timezone),
        end: zonedTimeToUtc(zonedEnd, timezone),
      };

      dispatch({
        type: 'PRE_RESIZE',
        payload: {
          event,
          start,
          end,
        },
      });

      const json = await api.call(`event/${event.id}`, 'PATCH', {
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
          getNow={() => utcToZonedTime(new Date(), timezone)}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          onSelectSlot={startNewEvent}
          onEventResize={resizeEvent}
          onEventDrop={resizeEvent}
          onRangeChange={onRangeChange}
          onSelectEvent={startViewEvent}
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

const getInitialData = async ({ api }) => {
  const range = {
    start: format(subWeeks(new Date(), 3), 'yyyy-MM-dd'),
    end: format(addWeeks(new Date(), 3), 'yyyy-MM-dd'),
  };

  const events = await loadEventsInRange(api, range);

  return {
    events,
    range,
  };
};

const screen: Screen = {
  component: EventsPage,
  getInitialData,
};

export default screen;
