import React, { useCallback, useEffect, useState, useReducer } from 'react';

import { utcToZonedTime, zonedTimeToUtc, format } from 'date-fns-tz';
import { addWeeks, subWeeks } from 'date-fns';

import { NextPage } from '~/common/types';
import { timezone } from '~/common/utils';
import Page from '~/components/Page';
import { useListeningWebSocket, useAPI } from '~/common/hooks';
import { selectAPI } from '~/core/selectors';

import Calendar from '~/events/components/Calendar';
import UILayer from '~/events/components/UILayer';
import CalendarEvent from '~/events/components/CalendarEvent';

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
  return {
    className: classNames.join(' '),
  };
};

interface Props {
  events: ServerEvent[];
  range: { start: string; end: string };
  children?: React.ReactNode;
}

const EventsPage: NextPage<Props> = props => {
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

  const onRangeChange = (range: { start: Date; end: Date }) => {
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
    <Page title="Календарь событий" team noFooter>
      <Page.Title>Календарь событий</Page.Title>
      <Page.Main wide>
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
      </Page.Main>
    </Page>
  );
};

EventsPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());

  const range = {
    start: format(subWeeks(new Date(), 3), 'yyyy-MM-dd'),
    end: format(addWeeks(new Date(), 3), 'yyyy-MM-dd'),
  };

  const events = await getEventsInRange(api, range);

  return {
    events,
    range,
  };
};

export default EventsPage;
