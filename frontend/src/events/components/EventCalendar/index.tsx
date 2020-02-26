import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { utcToZonedTime, zonedTimeToUtc, format } from 'date-fns-tz';
import { addDays, parseISO } from 'date-fns';

import { NextPage } from '~/common/types';
import { timezone } from '~/common/utils';
import { useListeningWebSocket, useAPI, useDispatch } from '~/common/hooks';

import BigCalendarConfigured from './BigCalendarConfigured';
import UILayer from '~/events/components/UILayer';
import CalendarEvent from './CalendarEvent';

import { LocalEventWithMetadata } from '~/events/types';

import { getEventsInRange } from '~/events/api';

import {
  replaceEvents,
  selectEventsWithMetadata,
  patchEvent,
} from '~/events/features/events';
import { startNewUI, startViewUI } from '~/events/features/calendarUI';

const startAccessor = (eventWithMetadata: LocalEventWithMetadata) =>
  utcToZonedTime(eventWithMetadata.event.start, timezone);

const endAccessor = (eventWithMetadata: LocalEventWithMetadata) =>
  utcToZonedTime(eventWithMetadata.event.end, timezone);

const eventPropGetter = (eventWithMetadata: LocalEventWithMetadata) => {
  const classNames: string[] = [];
  const event = eventWithMetadata.event;
  if (event.type === 'public') {
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
  const dispatch = useDispatch();

  const api = useAPI();

  const [range, setRange] = useState(() => ({
    start: parseISO(props.range.start),
    end: parseISO(props.range.end),
  }));

  const fetchEvents = useCallback(async () => {
    const json = await getEventsInRange(api, {
      start: format(range.start, 'yyyy-MM-dd'),
      end: format(range.end, 'yyyy-MM-dd'),
    });

    dispatch(replaceEvents(json));
  }, [api, dispatch, range]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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

      dispatch(startNewUI({ start, end }));
    },
    [dispatch]
  );

  const startViewEvent = useCallback(
    (eventWithMetadata: LocalEventWithMetadata) => {
      dispatch(startViewUI(eventWithMetadata.event.id));
    },
    [dispatch]
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

      await dispatch(
        patchEvent(eventWithMetadata.event.id, {
          start: start.toISOString(),
          end: end.toISOString(),
        })
      );
    },
    [dispatch]
  );

  const getNow = useCallback(() => utcToZonedTime(new Date(), timezone), []);

  const events = useSelector(selectEventsWithMetadata);

  return (
    <>
      <BigCalendarConfigured
        events={events}
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
      <UILayer />
    </>
  );
};

export default EventCalendar;
