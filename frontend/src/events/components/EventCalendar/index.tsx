import { useCallback, useState } from 'react';

import { utcToZonedTime, zonedTimeToUtc, format } from 'date-fns-tz';
import { addDays, parseISO } from 'date-fns';

import { NextPage } from '~/common/types';
import { timezone } from '~/common/utils';
import { useListeningWebSocket } from '~/common/hooks';

import UILayer from '../UILayer';

import BigCalendarConfigured from './BigCalendarConfigured';
import CalendarEvent from './CalendarEvent';

import {
  useEventsInRangeQuery,
  useResizeEventMutation,
} from '../../queries.generated';

import { LocalEventWithMetadata } from '../../types';
import {
  useCalendarUIReducer,
  startNewUI,
  startViewUI,
  CalendarUIContext,
} from '../../reducers/calendarUI';

const startAccessor = (eventWithMetadata: LocalEventWithMetadata) =>
  utcToZonedTime(eventWithMetadata.event.start, timezone);

const endAccessor = (eventWithMetadata: LocalEventWithMetadata) =>
  utcToZonedTime(eventWithMetadata.event.end, timezone);

const eventPropGetter = (eventWithMetadata: LocalEventWithMetadata) => {
  const classNames: string[] = [];
  const event = eventWithMetadata.event;
  if (event.event_type === 'public') {
    classNames.push('rbc-kocherga-event-public');
  }

  if (eventWithMetadata.saving) {
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
  range: { start: string; end: string };
}

const EventCalendar: NextPage<Props> = props => {
  const [resizeMutation] = useResizeEventMutation();

  const [uiState, uiDispatch] = useCalendarUIReducer();

  const [range, setRange] = useState(() => ({
    start: parseISO(props.range.start),
    end: parseISO(props.range.end),
  }));

  const queryResults = useEventsInRangeQuery({
    variables: {
      start: format(range.start, 'yyyy-MM-dd'),
      end: format(range.end, 'yyyy-MM-dd'),
    },
  });

  // FIXME - replace with graphql subscription
  // useListeningWebSocket('ws/events/', () => queryResults.refetch());

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

      uiDispatch(startNewUI({ start, end }));
    },
    [uiDispatch]
  );

  const startViewEvent = useCallback(
    (eventWithMetadata: LocalEventWithMetadata) => {
      uiDispatch(startViewUI(eventWithMetadata.event.id));
    },
    [uiDispatch]
  );

  const resizeEvent = useCallback(
    // Note: start and end are zoned since they come from RBC.
    async ({
      event: eventWithMetadata,
      start: zonedStart,
      end: zonedEnd,
    }: {
      event: LocalEventWithMetadata;
      start: Date | string;
      end: Date | string;
    }) => {
      const { start, end } = {
        start: zonedTimeToUtc(zonedStart, timezone),
        end: zonedTimeToUtc(zonedEnd, timezone),
      };

      await resizeMutation({
        variables: {
          id: eventWithMetadata.event.id,
          start: start.toISOString(),
          end: end.toISOString(),
        },
        optimisticResponse: {
          __typename: 'Mutation' as const,
          result: {
            event: {
              __typename: 'EventsEvent' as any, // FIXME - short-term hack!
              ...eventWithMetadata.event,
              start: start.toISOString(),
              end: end.toISOString(),
            },
          },
        },
      });
    },
    [resizeMutation]
  );

  const getNow = useCallback(() => utcToZonedTime(new Date(), timezone), []);

  const eventsWithMetadata = (queryResults.data?.events.nodes || []).map(
    event => ({
      event,
      saving: false, // FIXME
    })
  );

  return (
    <>
      <BigCalendarConfigured
        events={eventsWithMetadata}
        getNow={getNow}
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
      <CalendarUIContext.Provider
        value={{ dispatch: uiDispatch, state: uiState }}
      >
        <UILayer />
      </CalendarUIContext.Provider>
    </>
  );
};

export default EventCalendar;
