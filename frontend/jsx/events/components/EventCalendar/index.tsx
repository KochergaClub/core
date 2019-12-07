import React from 'react';
import { useCallback, useEffect, useState, useReducer } from 'react';

import { utcToZonedTime, zonedTimeToUtc, format } from 'date-fns-tz';
import { addDays } from 'date-fns';

import { NextPage } from '~/common/types';
import { timezone } from '~/common/utils';
import { useListeningWebSocket, useAPI } from '~/common/hooks';

import BigCalendarConfigured from './BigCalendarConfigured';
import UILayer from '~/events/components/UILayer';
import CalendarEvent from './CalendarEvent';

import {
  Event,
  ServerEvent,
  LocalEvent,
  getInitialState,
  reducer,
  serverEventToEvent,
} from '~/events/types';

import { getEventsInRange, patchEvent } from '~/events/api';

import { uiReducer, initialUIState } from '~/events/uiTypes';

import { EventDispatch } from '~/events/contexts';

const startAccessor = (event: LocalEvent) =>
  utcToZonedTime(event.start, timezone);

const endAccessor = (event: LocalEvent) => utcToZonedTime(event.end, timezone);

const eventPropGetter = (event: LocalEvent) => {
  const classNames: string[] = [];
  if (event.type === 'public') {
    classNames.push('rbc-kocherga-event-public');
  }
  if (event.saving) {
    classNames.push('rbc-kocherga-event-saving');
  }
  if (event.description) {
    classNames.push('rbc-kocherga-event-has-description');
  }

  return {
    className: classNames.join(' '),
  };
};

interface Props {
  events: ServerEvent[];
  range: { start: string; end: string };
}

const EventCalendar: NextPage<Props> = props => {
  const [store, dispatch] = useReducer(reducer, props.events, getInitialState);

  const api = useAPI();

  const [range, setRange] = useState(() => ({
    start: new Date(props.range.start),
    end: new Date(props.range.end),
  }));

  const fetchEvents = useCallback(async () => {
    const json = await getEventsInRange(api, {
      start: format(range.start, 'yyyy-MM-dd'),
      end: format(range.end, 'yyyy-MM-dd'),
    });

    dispatch({
      type: 'REPLACE_ALL',
      payload: { events: json.map(serverEventToEvent) },
    });
  }, [api, range]);

  useEffect(() => {
    fetchEvents();
  }, [range, fetchEvents]);

  useListeningWebSocket('ws/events/', fetchEvents);

  const onRangeChange = (
    range:
      | {
          start: string | Date;
          end: string | Date;
        }
      | Date[]
  ) => {
    let start: Date;
    let end: Date;

    if (range instanceof Array) {
      start = range[0];
      end = range[range.length - 1];
    } else if (
      typeof range.start === 'string' ||
      typeof range.end === 'string'
    ) {
      throw new Error('Unexpected types in range');
    } else {
      start = range.start;
      end = range.end;
    }

    // react-big-calendar sometimes returns the range for which the end is last day's midnight
    end = addDays(end, 1);

    // TODO - set wider range to pre-cache previous and next period, for smoother scrolling
    setRange({ start, end });
  };

  const [uiStore, uiDispatch] = useReducer(uiReducer, initialUIState);

  const startNewEvent = useCallback(
    // Note: start and end are zoned since they come from RBC.
    ({
      start: zonedStart,
      end: zonedEnd,
    }: {
      start: Date | string;
      end: Date | string;
    }) => {
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
      start: Date | string;
      end: Date | string;
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

      const patchedEvent = await patchEvent(api, event, { start, end });

      dispatch({
        type: 'PATCH',
        payload: { event: patchedEvent },
      });
    },
    [api]
  );

  return (
    <EventDispatch.Provider value={dispatch}>
      <BigCalendarConfigured
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
  );
};

export default EventCalendar;